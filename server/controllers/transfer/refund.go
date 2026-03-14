package transfer

import (
	"bsr/models"
	"bsr/services"
	"bsr/services/transfer"
	"bsr/utils"

	"github.com/gofiber/fiber/v2"
)

func (TransferController) Refund(c *fiber.Ctx) error {
	var data transfer.RefundInfoType
	err := c.BodyParser(&data)
	data.Type = string(models.TransferTypeRefund)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "invalid info for transfer"})
	}
	tf, err := services.Transfer.Refund(data)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: err.Error()})
	}
	return c.Status(200).JSON(tf)
}
