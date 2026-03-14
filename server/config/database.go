package config

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDB() (string, error) {
	// Load .env
	// if err := godotenv.Load(); err != nil {
	// 	log.Println("No .env file found, using system environment variables")
	// }

	db_name := os.Getenv("DB_NAME")
	db_host := os.Getenv("DB_HOST")
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=require TimeZone=Asia/Dhaka",
		db_host,
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		db_name,
		os.Getenv("DB_PORT"),
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		// Logger: logger.Default.LogMode(logger.Info), // set to Silent in production
		Logger: logger.Default.LogMode(logger.Silent),
	})

	if err != nil {
		return "", err
	}
	return fmt.Sprintf("NAME=%s, HOST=%s", db_name, db_host), nil
}
