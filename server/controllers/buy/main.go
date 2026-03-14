package buy

import (
	"bsr/services"
	"bsr/services/buy"
	"bsr/utils"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

type BuyControllerStruct struct{}

func (BuyControllerStruct) GetBuy(c *fiber.Ctx) error {
	var opt buy.BuyGetBuys
	err := c.QueryParser(&opt)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "faild to parse query"})
	}
	fmt.Println(opt)
	buys, err := services.Buy.GetBuys(opt)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "faild to find buys"})
	}
	return c.Status(200).JSON(buys)
}

func (BuyControllerStruct) CreateBuy(c *fiber.Ctx) error {
	var body buy.BuyCreateBody
	err := c.BodyParser(&body)
	if err != nil {
		fmt.Println("Failed to create buy :", err)
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "Invalid info"})
	}
	buy, err := services.Buy.Create(body)
	if err != nil {
		fmt.Println("Failed to create buy :", err)
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: err.Error()})
	}
	return c.Status(200).JSON(buy)
}
