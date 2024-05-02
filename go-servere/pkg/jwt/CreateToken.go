package jwt

import (
	"aliot/models"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"gorm.io/gorm"
)

// CreateToken создает JWT токен для пользователя
func CreateToken(user models.User) (string, error) {
	// Создание структуры claims, основанной на данных пользователя и стандартных JWT claims
	claims := &models.Claims{
		Model:     gorm.Model{ID: user.ID}, // Используем ID пользователя из gorm.Model
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Role:      user.Role,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24 * 7).Unix(), // Устанавливаем время истечения токена
		},
	}

	// Создание нового JWT токена с указанными claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Подписывание токена с использованием секретного ключа, хранящегося в переменных окружения
	signedToken, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err // В случае ошибки возвращаем пустую строку и ошибку
	}

	return signedToken, nil
}
