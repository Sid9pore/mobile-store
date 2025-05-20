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

		// Bind JSON input
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
			return
		}

		// Hash password securely
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}
		user.Password = string(hashedPassword)

		// Insert user into the DB
		if err := db.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user", "details": err.Error()})
			return
		}

		// Success
		c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
	}
}

func Login(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input models.User
		var user models.User

		// Parse input
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
			return
		}

		// Lookup user by email
		if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}

		// Sanity check: prevent comparing against empty or short hashes
		if len(user.Password) < 10 {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Corrupted user password data"})
			return
		}

		// Compare password securely
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}

		// Generate JWT token
		token, err := utils.GenerateJWT(user.ID, user.Password, user.Role)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Token generation failed", "details": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Login successful", "token": token,"role":user.Role})
	}
} 