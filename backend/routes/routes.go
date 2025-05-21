package routes

import (
	"time"

	"github.com/Sid9pore/mobile-store/backend/controllers"
	"github.com/Sid9pore/mobile-store/backend/models"
	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.Engine) {

	// Enable CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	dsn := "host=localhost user=admin password=myNewP@ssw0rd dbname=mobileAppStore port=8084 sslmode=disable"
	db, _ := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	db.AutoMigrate(&models.User{}, &models.Product{})

	r.POST("/signup", controllers.Register(db))
	r.POST("/login", controllers.Login(db))

	r.GET("/products", controllers.GetAllProducts(db))

	admin := r.Group("/admin")
	{
		admin.GET("/products/:adminId", controllers.GetAdminProducts(db))
		admin.POST("/products", controllers.CreateProduct(db))
		admin.PUT("/products/:id", controllers.UpdateProduct(db))
		admin.DELETE("/products/:id", controllers.DeleteProduct(db))
	}
}
