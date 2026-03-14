package packageController

import (
	"bsr/config"
	"bsr/models"
	"bsr/utils"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

type PackageControllerStruct struct{}

func (PackageControllerStruct) GetPackages(c *fiber.Ctx) error {
	var pak []models.Package
	err := config.DB.Preload("PackageItems").Preload("PackageItems.Item").Find(&pak).Error
	if err != nil {
		return c.Status(500).JSON(utils.ErrorJsonRespose{Message: "Faild to find packages!"})
	}
	return c.Status(200).JSON(pak)
}

type create_package_struct struct {
	Name  string `json:"name"`
	Items []int  `json:"items"`
}

func (PackageControllerStruct) CreatePackage(c *fiber.Ctx) error {
	var pkg models.Package
	err := c.BodyParser(&pkg)
	if err != nil {
		fmt.Println(err)
		return c.Status(200).JSON(utils.ErrorJsonRespose{Message: "Faild to parse body"})
	}

	err = config.DB.Save(&pkg).Error
	if err != nil {
		fmt.Println(err)
	}
	return c.Status(200).JSON(pkg)
}
func (PackageControllerStruct) DeletePackage(c *fiber.Ctx) error {
	id := c.Params("id", "0")
	fmt.Println(id)
	config.DB.Where("id = ?", id).Delete(&models.Package{})

	return c.Status(200).JSON(utils.ErrorJsonRespose{Message: "deleted"})
}
