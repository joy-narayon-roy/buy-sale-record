package item

import (
	"bsr/config"
	"bsr/models"
	"bsr/utils"
	"errors"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type ItemController struct{}

func (ItemController) GetItem(c *fiber.Ctx) error {
	var itms []models.Item
	err := config.DB.Model(models.Item{}).Find(&itms).Error
	if err != nil {
		return err
	}
	return c.Status(200).JSON(itms)
}

func (ItemController) GetItemById(c *fiber.Ctx) error {
	return c.Status(200).JSON(utils.ErrorJsonRespose{Message: "Get Item by id"})
}

func (ItemController) CreateItem(c *fiber.Ctx) error {
	var itm models.Item
	err := c.BodyParser(&itm)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "invalid item info "})
	}
	if itm.Name == "" || itm.Price == 0 || itm.Quantity == 0 || itm.Unit == "" {
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "invalid item info "})

	}
	err = config.DB.Save(&itm).Error
	if err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return c.Status(409).JSON(utils.ErrorJsonRespose{
				Message: "'" + itm.Name + "' already exists!",
			})
		}

		fmt.Println(err)
		return c.Status(500).JSON(utils.ErrorJsonRespose{
			Message: "Failed to save item",
		})
	}
	return c.Status(200).JSON(itm)
}

func (ItemController) UpdateItem(c *fiber.Ctx) error {
	id := c.Params("id", "")

	var current_item models.Item
	var item models.Item
	err := c.BodyParser(&item)
	if err != nil {
		return fmt.Errorf("failed to parse body")
	}

	err = config.DB.Model(&models.Item{}).Where("id = ?", id).First(&current_item).Error
	if err != nil {
		return err
	}

	updated := false
	if item.Name != "" && current_item.Name != item.Name {
		updated = true
		current_item.Name = item.Name
	}

	if item.Img != "" && current_item.Img != item.Img {
		updated = true
		current_item.Img = item.Img
	}

	if item.Price != 0 && current_item.Price != item.Price {
		updated = true
		current_item.Price = item.Price
	}

	if item.Quantity != 0 && current_item.Quantity != item.Quantity {
		updated = true
		current_item.Quantity = item.Quantity
	}

	if item.Unit != "" && current_item.Unit != item.Unit {
		updated = true
		current_item.Unit = item.Unit
	}

	if updated {
		err = config.DB.Save(&current_item).Error
		if err != nil {
			return c.Status(200).JSON(utils.ErrorJsonRespose{Message: "failed to update id"})
		}
	}

	return c.Status(200).JSON(current_item)
}

func (ItemController) DeleteItem(c *fiber.Ctx) error {
	id := c.Params("id", "")

	err := config.DB.Where("id = ?", id).Delete(&models.Item{}).Error
	if err != nil {
		return err
	}

	return c.Status(200).JSON(utils.ErrorJsonRespose{Message: "deleted"})
}
