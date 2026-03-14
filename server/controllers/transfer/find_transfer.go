package transfer

import (
	"bsr/utils"

	"github.com/gofiber/fiber/v2"
)

func (TransferController) GetTransfer(c *fiber.Ctx) error {
	return c.Status(200).JSON(utils.ErrorJsonRespose{})
}
