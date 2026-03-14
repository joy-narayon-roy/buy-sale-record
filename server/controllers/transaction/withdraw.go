package transaction

import (
	"bsr/services"
	"bsr/services/transaction"
	"bsr/utils"

	"github.com/gofiber/fiber/v2"
)

func (TransactionControllerStruct) Withdraw(c *fiber.Ctx) error {
	var body transaction.DepositInfo
	err := c.BodyParser(&body)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{
			Message: "invalid info!",
			Error:   err.Error(),
		})
	}

	tr, err := services.Transaction.Withdraw(body)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{
			Message: "transaction failed!",
			Error:   err.Error(),
		})
	}
	return c.Status(200).JSON(tr)
}
