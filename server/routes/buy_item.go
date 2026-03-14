package routes

import (
	"bsr/controllers"

	"github.com/gofiber/fiber/v2"
)

func UseBuyRoutes(r fiber.Router) {
	br := r.Group("/buy")
	br.Get("/", controllers.Buy.GetBuy)
	br.Post("/", controllers.Buy.CreateBuy)
}
