package transaction

import (
	"bsr/services"
	"bsr/services/transaction"
	"bsr/utils"

	"github.com/gofiber/fiber/v2"
)

func (TransactionControllerStruct) GetTransactions(c *fiber.Ctx) error {
	var opt transaction.GetTransactionsOptins
	err := c.QueryParser(&opt)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{
			Message: "Invalid query parameters!",
			Error:   err.Error(),
		})
	}

	t, err := services.Transaction.GetTransactions(opt)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{
			Message: "Failed to find transactions!",
			Error:   err.Error(),
		})
	}

	return c.Status(200).JSON(t)
}
