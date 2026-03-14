package transfer

import (
	"bsr/models"
	"bsr/services"
	"bsr/services/transfer"
	"bsr/utils"

	"github.com/gofiber/fiber/v2"
)

func (TransferController) Fund(c *fiber.Ctx) error {
	var data transfer.FundInfoType
	err := c.BodyParser(&data)
	data.Type = string(models.TransferTypeFund)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "invalid info for transfer"})
	}
	tf, err := services.Transfer.Fund(data)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: err.Error()})
	}
	return c.Status(200).JSON(tf)
}
