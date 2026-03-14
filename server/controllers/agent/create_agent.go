package agent

import (
	"bsr/services"
	"bsr/utils"

	"github.com/gofiber/fiber/v2"
)

type AgentController struct{}

func (AgentController) Create(c *fiber.Ctx) error {
	type AgentBody struct {
		Name    string `json:"name"`
		AdminId string `json:"admin_id"`
	}
	var agentInfo AgentBody
	err := c.BodyParser(&agentInfo)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "invalid form data!"})
	}
	agent, err := services.Agent.Create(agentInfo.Name, agentInfo.AdminId)
	if err != nil {
		return c.Status(400).JSON(utils.ErrorJsonRespose{Message: "failed to create agemt!"})
	}
	return c.Status(200).JSON(agent)
}

func (AgentController) GetAgents(c *fiber.Ctx) error {
	return c.Status(200).JSON(map[string]string{})
}
