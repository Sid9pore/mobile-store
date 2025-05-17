package routes

import (
	"mobile-store-backend/controllers"
	"mobile-store-backend/middleware"
	"mobile-store-backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.Engine) {
	dsn := "host=localhost user=postgres password=postgres dbname=mobile_store port=5432 sslmode=disable"
	db, _ := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	db.AutoMigrate(&models.User{}, &models.Product{})

	r.POST("/signup", controllers.Register(db))
	r.POST("/login", controllers.Login(db))

	r.GET("/products", controllers.GetAllProducts(db))

	admin := r.Group("/admin").Use(middleware.AuthMiddleware("admin"))
	admin.POST("/products", controllers.CreateProduct(db))
	admin.PUT("/products/:id", controllers.UpdateProduct(db))
	admin.DELETE("/products/:id", controllers.DeleteProduct(db))
}
