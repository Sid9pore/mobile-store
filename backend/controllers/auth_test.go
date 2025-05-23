package controllers_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Sid9pore/mobile-store/backend/controllers"
	"github.com/Sid9pore/mobile-store/backend/models"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database: " + err.Error())
	}
	db.AutoMigrate(&models.User{})
	return db
}

func performRequest(r http.Handler, method, path string, body interface{}) *httptest.ResponseRecorder {
	jsonValue, _ := json.Marshal(body)
	req, _ := http.NewRequest(method, path, bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

func TestRegister_Success(t *testing.T) {
	db := setupTestDB()
	router := gin.Default()
	router.POST("/register", controllers.Register(db))

	user := models.User{
		Email:    "test@example.com",
		Password: "securepassword",
		Role:     "customer",
	}

	w := performRequest(router, "POST", "/register", user)

	assert.Equal(t, http.StatusCreated, w.Code)
	assert.Contains(t, w.Body.String(), "User registered successfully")
}

func TestRegister_InvalidInput(t *testing.T) {
	db := setupTestDB()
	router := gin.Default()
	router.POST("/register", controllers.Register(db))

	invalidJSON := map[string]interface{}{
		"email": 123, // invalid type
	}

	w := performRequest(router, "POST", "/register", invalidJSON)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "Invalid input")
}

func TestLogin_Success(t *testing.T) {
	db := setupTestDB()
	password := "securepassword"

	// Pre-create user
	hashed, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	user := models.User{
		Email:    "test@example.com",
		Password: string(hashed),
		Role:     "customer",
	}
	db.Create(&user)

	router := gin.Default()
	router.POST("/login", controllers.Login(db))

	loginData := models.User{
		Email:    "test@example.com",
		Password: password,
	}

	w := performRequest(router, "POST", "/login", loginData)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "Login successful")
}

func TestLogin_InvalidPassword(t *testing.T) {
	db := setupTestDB()

	hashed, _ := bcrypt.GenerateFromPassword([]byte("correctpassword"), bcrypt.DefaultCost)
	user := models.User{
		Email:    "test@example.com",
		Password: string(hashed),
	}
	db.Create(&user)

	router := gin.Default()
	router.POST("/login", controllers.Login(db))

	loginData := models.User{
		Email:    "test@example.com",
		Password: "wrongpassword",
	}

	w := performRequest(router, "POST", "/login", loginData)

	assert.Equal(t, http.StatusUnauthorized, w.Code)
	assert.Contains(t, w.Body.String(), "Invalid credentials")
}

func TestLogin_UserNotFound(t *testing.T) {
	db := setupTestDB()
	router := gin.Default()
	router.POST("/login", controllers.Login(db))

	loginData := models.User{
		Email:    "notfound@example.com",
		Password: "doesnotmatter",
	}

	w := performRequest(router, "POST", "/login", loginData)

	assert.Equal(t, http.StatusUnauthorized, w.Code)
	assert.Contains(t, w.Body.String(), "Invalid credentials")
}
