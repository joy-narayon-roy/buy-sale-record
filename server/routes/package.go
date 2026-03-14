package routes

import (
	"bsr/controllers"

	"github.com/gofiber/fiber/v2"
)

func UsePackageRoutes(r fiber.Router) {
	pr := r.Group("/package")
	pr.Get("/", controllers.Package.GetPackages)
	pr.Post("/", controllers.Package.CreatePackage)
	pr.Delete("/:id", controllers.Package.DeletePackage)
}
