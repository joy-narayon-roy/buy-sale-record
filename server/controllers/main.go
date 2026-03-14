package controllers

import (
	"bsr/controllers/admin"
	"bsr/controllers/agent"
	"bsr/controllers/buy"
	"bsr/controllers/investor"
	"bsr/controllers/item"
	packageController "bsr/controllers/package"
	"bsr/controllers/transaction"
	"bsr/controllers/transfer"

	"github.com/gofiber/fiber/v2"
)

var (
	Admin       = admin.AdminController{}
	Transaction = transaction.TransactionControllerStruct{}
	Investor    = investor.InvestorController{}
	Agent       = agent.AgentController{}
	Transfer    = transfer.TransferController{}
	Item        = item.ItemController{}
	Package     = packageController.PackageControllerStruct{}
	Buy         = buy.BuyControllerStruct{}
)

func DefaultControllers(ctx *fiber.Ctx) error {
	return ctx.Status(200).JSON(map[string]string{
		"message": "Good",
	})
}

func HealthController(ctx *fiber.Ctx) error {
	return ctx.Status(200).JSON(map[string]string{
		"message": "Good!",
	})
}
func CommingSoonController(ctx *fiber.Ctx) error {
	return ctx.Status(200).JSON(map[string]string{
		"message": "Comming soon!",
	})
}
func ServiceStopedController(ctx *fiber.Ctx) error {
	return ctx.Status(200).JSON(map[string]string{
		"message": "Service stoped!",
	})
}
func NotFoundController(ctx *fiber.Ctx) error {
	return ctx.Status(200).SendFile("./public/index.html")
}
