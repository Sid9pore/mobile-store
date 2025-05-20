package routes

import (
	"github.com/Sid9pore/mobile-store/backend/controllers"
	"github.com/Sid9pore/mobile-store/backend/middleware"
	"github.com/Sid9pore/mobile-store/backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.Engine) {
	dsn := "host=localhost user=admin password=myNewP@ssw0rd dbname=mobileAppStore port=8084 sslmode=disable"
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
