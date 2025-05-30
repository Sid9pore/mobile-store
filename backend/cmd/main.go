package main

import (
	"fmt"
	"log"

	"github.com/Sid9pore/mobile-store/backend/config"
	"github.com/Sid9pore/mobile-store/backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadConfig()
	r := gin.Default()
	routes.RegisterRoutes(r)
	port := fmt.Sprintf(":%s", config.AppConfig.Server.Port)
	log.Fatal(r.Run(port))
}
