package investor

import (
	"bsr/services"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type formdata struct {
	Admin string `json:"admin"`
	Name  string `json:"name"`
}

func (f formdata) IsValid() error {
	if f.Admin == "" {
		return fmt.Errorf("admin is required")
	}
	_, err := uuid.Parse(f.Admin)
	if err != nil {
		return fmt.Errorf("invalid admin")
	}
	if f.Name == "" {
		return fmt.Errorf("name is required")
	}
	return nil
}

func (InvestorController) Create(c *fiber.Ctx) error {
	var data formdata
	err := c.BodyParser(&data)
	if err != nil {
		return c.Status(400).JSON(map[string]string{"message": "Invalid info!"})
	}

	err = data.IsValid()
	if err != nil {
		return c.Status(400).JSON(map[string]string{"message": err.Error()})
	}

	inv, err := services.Investor.Create(data.Admin, data.Name)
	if err != nil {
		return c.Status(400).JSON(map[string]string{"message": "Failed to create investor"})
	}
	return c.Status(200).JSON(inv)
}
