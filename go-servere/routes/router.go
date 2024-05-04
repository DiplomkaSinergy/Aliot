package routes

import (
	"aliot/handlers"
	"aliot/handlers/auth"
	"aliot/middlewares"
	_ "aliot/pkg/vars"

	"github.com/gin-gonic/gin"
)

// @ Функция для настройки роутинга
func SetupRouter(a *auth.AuthHandler, u *handlers.UserHandler) *gin.Engine {
	r := gin.Default()

	middlewares.CorsMiddleware(r)

	user := r.Group("/api/user")
	{
		//? Auth
		user.GET("/check-auth", middlewares.AuthMiddleware(), a.Checkauth)
		user.POST("/registration", a.Register)
		user.POST("/login", a.Login)
	}

	api := r.Group("/api")
	{
		//? Users
		api.GET("/users", u.GetAllUsers)
		api.GET("/users/:id", u.GetUser)
		api.DELETE("/users/:id", u.DeleteUser)
		// api.PUT("/users/update/:id", u.UpdateUser)
		api.PUT("/users/update-role/:id", u.UpdateUserRole)
		//? Password reset
		api.POST("/forgot-password", u.ForgotPassword)
		api.POST("/reset-password", u.ResetPassword)
	}

	//@ Группа маршрутов, требующих авторизации и определенной роли
	// authGroup := r.Group("/auth")
	// {
	// 	// authGroup.Use(middlewares.AuthMiddleware())
	// 	// authGroup.Use(isAdmin())
	// 	authGroup.GET("/dashboard", u.Dashboard)
	// }
	return r
}
