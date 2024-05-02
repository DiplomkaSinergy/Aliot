package routes

import (
	"aliot/handlers"
	"aliot/handlers/auth"
	"aliot/middlewares"
	_ "aliot/pkg/vars"

	docs "aliot/docs"

	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @ Функция для настройки роутинга
func SetupRouter(a *auth.AuthHandler, u *handlers.UserHandler) *gin.Engine {
	r := gin.Default()

	middlewares.CorsMiddleware(r)

	docs.SwaggerInfo.BasePath = "/"

	user := r.Group("/api/user")
	{
		//? Auth
		user.GET("/user/auth", handlers.CheckHandler)
		user.POST("/signup", a.Register)
		user.POST("/login", a.Login)
		user.GET("/logout", a.Logout)
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
	authGroup := r.Group("/auth")
	{
		// authGroup.Use(middlewares.AuthMiddleware())
		// authGroup.Use(isAdmin())
		authGroup.GET("/dashboard", u.Dashboard)
	}

	// @Swagger Docs
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	return r
}
