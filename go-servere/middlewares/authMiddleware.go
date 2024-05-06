package middlewares

import (
	"aliot/models"
	"aliot/pkg/vars"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

// func AuthMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, token")

// 		tokenString, err := c.Cookie("token")
// 		if err != nil || tokenString == "" {
// 			logger.Error("No token found")
// 			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
// 			return
// 		}

// 		token, err := jwt.ParseWithClaims(tokenString, &models.Claims{}, func(token *jwt.Token) (interface{}, error) {
// 			return []byte(os.Getenv("JWT_SECRET")), nil
// 		})

// 		if err != nil {
// 			fmt.Println("Invalid token:", err)
// 			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
// 			return
// 		}

// 		claims, ok := token.Claims.(*models.Claims)
// 		if !ok || !token.Valid {
// 			fmt.Println("Invalid or expired token")
// 			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
// 			return
// 		}

// 		// Print user details for debugging
// 		// fmt.Printf("User ID: %d, Username: %s, Role: %s\n", claims.ID, claims.Username, claims.Role)

// 		// Set user claims in the context
// 		c.Set("user", claims)
// 	}
// }

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "OPTIONS" {
			c.Next()
			return
		}

		fmt.Printf("Failed auth middlware")

		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Не авторизован"})
			c.Abort()
			return
		}

		tokenArr := strings.Split(tokenString, " ")
		if len(tokenArr) != 2 || tokenArr[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Не авторизован"})
			c.Abort()
			return
		}

		token, err := jwt.Parse(tokenArr[1], func(token *jwt.Token) (interface{}, error) {
			// Проверка подписи токена с использованием секретного ключа
			return []byte(vars.JWT_SECRET), nil
		})
		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Не авторизован"})
			c.Abort()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Не авторизован"})
			c.Abort()
			return
		}

		email := claims["email"].(string)
		firstName := claims["firstName"].(string)
		lastName := claims["lastName"].(string)
		role := claims["role"].(string)

		// Создание объекта models.User
		user := models.User{
			Email:     email,
			FirstName: firstName,
			LastName:  lastName,
			Role:      role,
		}

		c.Set("user", user)
		c.Next()
	}
}
