package investor

import (
	"bsr/services"
	"bsr/services/investor"

	"github.com/gofiber/fiber/v2"
)

type get_query struct {
	Admin string `query:"admin"`
	Limit int    `query:"limit"`
	Page  int    `query:"page"`
}

func (InvestorController) GetInvestors(c *fiber.Ctx) error {
	var query get_query
	err := c.QueryParser(&query)
	if err != nil {
		return c.Status(400).JSON(map[string]string{"message": "Invalid query!"})
	}
	opt := investor.FindQueryOptions{
		Admin: query.Admin,
	}
	page := investor.FindPageNation{
		Limit: query.Limit,
		Page:  query.Page,
	}
	result, err := services.Investor.Find(opt, page)
	if err != nil {
		return err
	}
	return c.Status(200).JSON(result)
}
