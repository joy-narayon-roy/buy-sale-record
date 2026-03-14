package main

import (
	"bsr/config"
	"bsr/models"
	"bsr/routes"
	"bsr/utils"
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load("./.env")
	if err != nil {
		fmt.Println("\aFailed to load .env!")
		return
	}
	db_info, err := config.ConnectDB()
	if err != nil {
		fmt.Println("\aFailed to connect DB!")
		fmt.Println(err)
		return
	}

	fmt.Println("DB connected (" + db_info + ").")
	models.AutoMigrate()

	fiber_config := fiber.Config{
		AppName:      "Buy Sales Record",
		ErrorHandler: utils.GlobalErrorHandler,
	}
	app := fiber.New(fiber_config)

	app.Static("/", "./public")

	app.Use(logger.New(logger.Config{
		Format:     "${time} - ${method} - ${status} ${path} - ${latency}\n",
		TimeFormat: "15:04:05 PM",
	}))
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173, http://192.164.1.4:5173",
	}))

	routes.UseRoutes(app)

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}
	app.Listen(":" + PORT)

	// fmt.Println("Creating admin")
	// admin, err := services.Admin.Create("Test Admin")
	// if err != nil {
	// 	fmt.Println("Faild to create admin", err)
	// 	return
	// }
	// fmt.Println(admin)

}
