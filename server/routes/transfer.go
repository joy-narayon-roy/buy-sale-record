package routes

import (
	"bsr/controllers"

	"github.com/gofiber/fiber/v2"
)

func UseTransferRoutes(r fiber.Router) {
	tfrRouter := r.Group("/transfer")
	tfrRouter.Get("/", controllers.Transfer.GetTransfer)
	tfrRouter.Post("/fund", controllers.Transfer.Fund)
	tfrRouter.Post("/refund", controllers.Transfer.Refund)
}
