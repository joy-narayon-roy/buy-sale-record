package investor

import (
	"bsr/services"
	"bsr/services/investor"
	"bsr/utils"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func (InvestorController) Withdraw(c *fiber.Ctx) error {

	iid := c.Locals("investor_id").(string)
	var data FormData
	err := c.BodyParser(&data)
	if err != nil {
		fmt.Println(err)
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "Invalid form infomation!"})
	}

	body := investor.WithdrawInfo{
		InvestorID: iid,
		Amount:     data.Amount,
		Date:       data.CreaetdAt,
	}
	deposit_trans, err := services.Investor.Withdraw(body)
	if err != nil {
		log.Println("Deposit faild :", err)
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: err.Error()})
	}
	return c.Status(200).JSON(deposit_trans)
}
