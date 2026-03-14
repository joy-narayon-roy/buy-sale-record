package utils

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

type ErrorJsonRespose struct {
	Message string `json:"message"`
	Error   string `json:"error"`
}

func GlobalErrorHandler(c *fiber.Ctx, err error) error {
	log.Println(err)
	return c.Status(500).JSON(ErrorJsonRespose{Message: "Something wrong!"})
}
