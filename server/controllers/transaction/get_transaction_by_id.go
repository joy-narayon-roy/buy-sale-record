package transaction

import (
	"bsr/utils"

	"github.com/gofiber/fiber/v2"
)

func (TransactionControllerStruct) GetTransactionById(c *fiber.Ctx) error {
	return c.Status(200).JSON(utils.ErrorJsonRespose{
		Message: "Comming soon!",
	})
}
