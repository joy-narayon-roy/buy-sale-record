package routes

import (
	"bsr/controllers"

	"github.com/gofiber/fiber/v2"
)

func UseRoutes(app *fiber.App) {
	router := app.Group("/")
	api := router.Group("/api")
	UseAdminRoutes(api)
	UseAgentRoutes(api)
	UseInvestoRoutes(api)
	UseTransactionRoutes(api)
	UseTransferRoutes(api)
	UseItemRoutes(api)
	UsePackageRoutes(api)
	UseBuyRoutes(api)
	api.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(map[string]string{"message": "Welcome to API!"})
	})
	router.Get("/health", controllers.DefaultControllers)
	router.Get("/favicon.ico", func(c *fiber.Ctx) error {
		return c.SendStatus(200)
	})
	app.Get("*", controllers.NotFoundController)
}
