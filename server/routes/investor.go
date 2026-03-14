package routes

import (
	"bsr/controllers"
	"bsr/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func investorProtected(c *fiber.Ctx) error {
	iid := c.Params("investor_id", "")
	_, err := uuid.Parse(iid)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "invalid investor id"})
	}

	c.Locals("investor_id", iid)
	return c.Next()
}

func UseInvestoRoutes(r fiber.Router) {
	ir := r.Group("/investor")
	ir.Get("/", controllers.Investor.GetInvestors)
	ir.Post("/", controllers.Investor.Create)

	individual_investor_group := ir.Group("/:investor_id", investorProtected)
	// individual_investor_group.Post("/deposit", controllers.Investor.Deposit)
	// individual_investor_group.Post("/withdraw", controllers.Investor.Withdraw)
	individual_investor_group.Post("*", controllers.ServiceStopedController)
}
