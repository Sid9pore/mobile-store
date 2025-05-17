package utils

import (
	"mobile-store-backend/config"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func GenerateJWT(id uint, role string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":   id,
		"role": role,
		"exp":  time.Now().Add(time.Hour * 72).Unix(),
	})
	return token.SignedString([]byte(config.AppConfig.JWT.Secret))
}
