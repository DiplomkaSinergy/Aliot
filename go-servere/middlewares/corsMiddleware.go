package middlewares

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CorsMiddleware(r *gin.Engine) {
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("CLIENT_URL")},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "token", "*"},
		AllowCredentials: true,
	}))
}
