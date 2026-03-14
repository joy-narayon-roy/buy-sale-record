package routes

import (
	"bsr/controllers"

	"github.com/gofiber/fiber/v2"
)

func UseTransactionRoutes(r fiber.Router) {
	ar := r.Group("/transaction")
	ar.Get("/", controllers.Transaction.GetTransactions)
	ar.Get("/:id", controllers.Transaction.GetTransactionById)
	ar.Post("/deposit", controllers.Transaction.Deposit)
	ar.Post("/withdraw", controllers.Transaction.Withdraw)
}
