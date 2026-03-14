package routes

import (
	"bsr/controllers"

	"github.com/gofiber/fiber/v2"
)

func UseAdminRoutes(r fiber.Router) {
	ar := r.Group("/admin")
	ar.Get("/", controllers.Admin.GetAdmins)
	ar.Get("/:admin_id", controllers.Admin.GetAdminById)
}
