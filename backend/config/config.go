package config

import (
	"log"
	"os"

	"gopkg.in/yaml.v2"
)

type Config struct {
	DB struct {
		Host     string `yaml:"host"`
		Port     string `yaml:"port"`
		User     string `yaml:"user"`
		Password string `yaml:"password"`
		Name     string `yaml:"name"`
	} `yaml:"db"`
	JWT struct {
		Secret string `yaml:"secret"`
	} `yaml:"jwt"`
	Server struct {
		Port string `yaml:"port"`
	} `yaml:"server"`
}

var AppConfig Config

func LoadConfig() {
	f, err := os.ReadFile("config/config.yaml")
	if err != nil {
		log.Fatalf("Failed to read config: %v", err)
	}
	yaml.Unmarshal(f, &AppConfig)
}
