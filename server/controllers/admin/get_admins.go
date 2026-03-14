package admin

import (
	"bsr/services"
	"bsr/services/admin"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type AdminController struct{}

func (AdminController) GetAdmins(c *fiber.Ctx) error {
	opt := admin.GetAdminsOption{}
	admins, err := services.Admin.GetAdmins(opt)
	if err != nil {
		return err
	}
	return c.Status(200).JSON(admins)
}

func (AdminController) GetAdminById(c *fiber.Ctx) error {
	aid := c.Params("admin_id", "")
	if aid == "" {
		return c.Status(404).JSON(map[string]string{"message": "Admin not found"})
	}
	_, err := uuid.Parse(aid)
	if err != nil {
		return c.Status(404).JSON(map[string]string{"message": "Invalid admin id!"})
	}
	opt := admin.GetAdminByIdOption{
		WithInvestors:    true,
		WithAgents:       true,
		WithTransactions: true,
		WithTransfer:     true,
		WithItems:        true,
		WithBuys:         true,
	}
	admin, err := services.Admin.GetAdminById(aid, opt)
	if err != nil {
		return err
	}
	return c.Status(200).JSON(admin)

}
