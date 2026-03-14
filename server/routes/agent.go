package routes

import (
	"bsr/controllers"

	"github.com/gofiber/fiber/v2"
)

func UseAgentRoutes(r fiber.Router) {
	ar := r.Group("/agent")
	ar.Post("/", controllers.Agent.Create)
	ar.Get("/", controllers.Agent.GetAgents)
}
