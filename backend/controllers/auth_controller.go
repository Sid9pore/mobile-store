package controllers

import (
	"net/http"

	"github.com/Sid9pore/mobile-store/backend/models"
	"github.com/Sid9pore/mobile-store/backend/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Register(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		hashed, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
		user.Password = string(hashed)
		db.Create(&user)
		c.JSON(http.StatusCreated, gin.H{"message": "user registered"})
	}
}

func Login(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input models.User
		var user models.User
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Where("email = ?", input.Email).First(&user)
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
			return
		}
		token, _ := utils.GenerateJWT(user.ID, user.Password,user.Role)
		c.JSON(http.StatusOK, gin.H{"token": token})
	}
}
