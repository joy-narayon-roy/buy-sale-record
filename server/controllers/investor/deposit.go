package investor

import (
	"bsr/services"
	"bsr/services/investor"
	"bsr/utils"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type FormData struct {
	Amount    uint   `json:"amount"`
	CreaetdAt string `json:"created_at"`
}

func (InvestorController) Deposit(c *fiber.Ctx) error {
	iid := c.Locals("investor_id").(string)
	var data FormData
	err := c.BodyParser(&data)
	if err != nil {
		fmt.Println(err)
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "Invalid form infomation!"})
	}

	body := investor.DepositInfo{
		InvestorID: iid,
		Amount:     data.Amount,
		Date:       data.CreaetdAt,
	}

	// deposit_trans, err := services.Investor.Deposit(iid, data.Amount)
	deposit_trans, err := services.Investor.Deposit(body)
	if err != nil {
		log.Println("Deposit faild :", err)
		return c.Status(500).JSON(utils.ErrorJsonRespose{Message: "Deposit failed!"})
	}
	return c.Status(200).JSON(deposit_trans)
}
