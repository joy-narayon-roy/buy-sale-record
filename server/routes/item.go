package routes

import (
	"bsr/controllers"

	"github.com/gofiber/fiber/v2"
)

func UseItemRoutes(r fiber.Router) {
	ir := r.Group("/item")
	ir.Get("/", controllers.Item.GetItem)
	ir.Get("/:id", controllers.Item.GetItemById)
	ir.Post("/", controllers.Item.CreateItem)
	ir.Patch("/:id", controllers.Item.UpdateItem)
	ir.Delete("/:id", controllers.Item.DeleteItem)
}
