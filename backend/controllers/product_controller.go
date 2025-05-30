package controllers

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/Sid9pore/mobile-store/backend/models"
	"github.com/Sid9pore/mobile-store/backend/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateProduct(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var product models.Product

		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization header"})
			return
		}

		// Parse the token
		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := utils.ValidateJWT(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token", "details": err.Error()})
			return
		}

		// Optional: enforce admin role
		if claims.Role != "admin" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized: Admins only"})
			return
		}

		if err := c.ShouldBindJSON(&product); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
			return
		}

		if err := db.Create(&product).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create product", "details": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "Product created successfully"})
	}
}

func GetAllProducts(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var products []models.Product
		admin := c.Query("admin")

		if admin != "" {
			var user models.User
			if err := db.Where("email = ?", admin).First(&user).Error; err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "Admin user not found"})
				return
			}
			if err := db.Where("created_by_id = ?", user.ID).Find(&products).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve products", "details": err.Error()})
				return
			}
		} else {
			if err := db.Find(&products).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve products", "details": err.Error()})
				return
			}
		}

		c.JSON(http.StatusOK, products)
	}
}

func UpdateProduct(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization header"})
			return
		}

		// Parse the token
		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := utils.ValidateJWT(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token", "details": err.Error()})
			return
		}

		// Optional: enforce admin role
		if claims.Role != "admin" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized: Admins only"})
			return
		}
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
			return
		}

		var product models.Product
		if err := db.First(&product, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
			return
		}

		if err := c.ShouldBindJSON(&product); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
			return
		}

		if err := db.Save(&product).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update product", "details": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Product updated successfully", "product": product})
	}
}

func DeleteProduct(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization header"})
			return
		}

		// Parse the token
		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := utils.ValidateJWT(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token", "details": err.Error()})
			return
		}

		// Optional: enforce admin role
		if claims.Role != "admin" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized: Admins only"})
			return
		}
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
			return
		}

		if err := db.Delete(&models.Product{}, id).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete product", "details": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
	}
}

func GetAdminProducts(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization header"})
			return
		}

		// Parse the token
		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := utils.ValidateJWT(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token", "details": err.Error()})
			return
		}

		// Optional: enforce admin role
		if claims.Role != "admin" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized: Admins only"})
			return
		}
		adminID := c.Param("adminId")
		if adminID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Missing admin ID in request path"})
			return
		}

		var products []models.Product
		if err := db.Where("created_by_id = ?", adminID).Find(&products).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products", "details": err.Error()})
			return
		}

		if len(products) == 0 {
			c.JSON(http.StatusNotFound, gin.H{"message": "No products found for the given admin ID"})
			return
		}

		c.JSON(http.StatusOK, products)
	}
}
