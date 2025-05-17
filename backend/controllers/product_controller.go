package controllers

import (
	"mobile-store-backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateProduct(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var product models.Product
		if err := c.ShouldBindJSON(&product); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		uid := c.GetUint("user_id")
		product.CreatedByID = uid
		db.Create(&product)
		c.JSON(http.StatusCreated, product)
	}
}

func GetAllProducts(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var products []models.Product
		admin := c.Query("admin")
		if admin != "" {
			var user models.User
			db.Where("email = ?", admin).First(&user)
			db.Where("created_by_id = ?", user.ID).Find(&products)
		} else {
			db.Find(&products)
		}
		c.JSON(http.StatusOK, products)
	}
}

func UpdateProduct(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		var product models.Product
		if err := db.First(&product, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
			return
		}
		c.ShouldBindJSON(&product)
		db.Save(&product)
		c.JSON(http.StatusOK, product)
	}
}

func DeleteProduct(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		db.Delete(&models.Product{}, id)
		c.Status(http.StatusNoContent)
	}
}
