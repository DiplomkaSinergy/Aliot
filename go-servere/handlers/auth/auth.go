package auth

import (
	"aliot/models"
	password "aliot/pkg/Password"

	cjwt "aliot/pkg/jwt"
	"aliot/pkg/vars"
	"errors"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/Avdushin/gogger/logger"
	"github.com/golang-jwt/jwt"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthHandler struct {
	DB *gorm.DB
}

// @Summary Регистрация пользователя
// @Description Регистрирует пользователя с ролью по-умолчанию (user)
// @Tags auth
// @Accept json
// @Produce json
// @Request json
// @Param request body swagger.AuthRequest true "Данные для входа"
// @Success 201 {string} string "Пользователь успешно зарегистрирован"
// @Failure 400 {string} string "Ошибка при регистрации пользователя"
// @Router /api/signup [POST]
func (u *AuthHandler) Register(c *gin.Context) {
	var user models.User
	fmt.Printf("Received user data: %+v\n", user)
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ошибка при регистрации пользователя"})
		return
	}

	if user.Email == "" || user.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email or password"})
		return
	}

	var existingUser models.User
	if err := u.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		logger.Warning("User with email %s already exists\n", user.Email)
		c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
		return
	} else if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		logger.Error("Failed to check email existence: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check email existence"})
		return
	}

	// Хеширование пароля
	hashedPassword, err := password.HashPassword(user.Password)
	if err != nil {
		// Log password hashing error
		fmt.Printf("Failed to hash password: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user.Password = hashedPassword
	user.Role = string(models.SimpleUser)
	// user.LastName =
	// Присвоение роли по умолчанию, если не указана
	if user.Role == "" {
		user.Role = string(models.SimpleUser)
	}

	// Создание пользователя
	u.DB.Create(&user)

	basket := models.Basket{UserID: user.ID}
	if err := u.DB.Create(&basket).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create basket"})
		return
	}

	// Создание токена
	token, err := cjwt.CreateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Log successful registration
	fmt.Printf("User successfully registered: %+v\n", user)
	c.JSON(http.StatusCreated, gin.H{
		"message": "Пользователь успешно зарегистрирован",
		"token":   token,
	})
}

// @Summary Авторизация пользователя
// @Description Авторизация пользователя и выдача JWT токена с использованием Cookie
// @Tags auth
// @Accept json
// @Produce json
// @Request json
// @Param request body swagger.AuthRequest true "Данные для входа"
// @Success 200 {object} swagger.SuccessResponse "Успешная авторизация"
// @Failure 400 {string} string "Ошибка авторизации пользователя"
// @Router /api/login [POST]
func (u *AuthHandler) Login(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ошибка авторизации пользователя"})
		return
	}

	// Поиск пользователя по email
	var dbUser models.User
	if err := u.DB.Where("email = ?", user.Email).First(&dbUser).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query user"})
		return
	}

	// Проверка пароля
	if err := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error":    "Invalid credentials",
			"dbpass":   []byte(dbUser.Password),
			"password": []byte(user.Password)})
		return
	}

	// Создание токена
	token, err := cjwt.CreateToken(dbUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Успешная авторизация",
		"token":   token,
	})
}

// @Summary Выход пользователя (Logout)
// @Description Завершение сеанса пользователя и удаление JWT токена из Cookie
// @Tags auth
// @Produce json
// @Success 200 {string} string "Успешный выход"
// @Router /api/logout [GET]
// func (u *AuthHandler) Logout(c *gin.Context) {
// 	c.SetCookie("token", "", -1, "/", "", false, false)
// 	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
// }

func (u *AuthHandler) Checkauth(c *gin.Context) {

	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token not found"})
		return
	}

	// Remove the "Bearer " prefix if present
	tokenString = strings.ReplaceAll(tokenString, "Bearer ", "")

	// Parse the token
	token, err := jwt.ParseWithClaims(tokenString, &models.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	claims, ok := token.Claims.(*models.Claims)
	if !ok || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
		return
	}

	// Set user claims in the context
	c.Set("user", *claims)

	// Respond with the token
	c.JSON(http.StatusOK, gin.H{"token": tokenString})

	// user, exists := c.Get("user")
	// if !exists {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось получить данные пользователя"})
	// 	return
	// }

	// fmt.Printf("   USER:    ", user)
	// // Преобразуем данные пользователя в объект models.User
	// userData, ok := user.(models.User)
	// if !ok {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось проанализировать данные пользователя"})
	// 	return
	// }

	// // Генерируем JWT токен на основе данных пользователя
	// token, err := jwt.CreateToken(userData)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось сгенерировать токен"})
	// 	return
	// }

	// // Возвращаем токен в формате JSON
	// c.JSON(http.StatusOK, gin.H{"token": token})
}

func CreateAdmin(db *gorm.DB) {
	// Проверка наличия пользователя с ролью администратора
	var adminUser models.User
	result := db.Where("role = ?", string(models.Admin)).First(&adminUser)
	if result.Error == nil {
		logger.Info("🕵️  Admin user already exists.")
		return
	}

	// Хешируем пароль
	hashedPassword, err := password.HashPassword(vars.ADMIN_PASS)
	if err != nil {
		logger.Error("Failed to hash admin password:", err)
		return
	}

	// Создаём администратора
	newAdmin := models.User{

		Email:    vars.ADMIN_EMAIL,
		Role:     string(models.Admin),
		Password: hashedPassword,
	}

	if err := db.Create(&newAdmin).Error; err != nil {
		logger.Error("🔪🕵️  Failed to create admin user:", err)
		return
	}

	logger.Debug("🕵️  Admin user created successfully...")
}
