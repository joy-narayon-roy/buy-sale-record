package services_test

import (
	"bsr/config"
	"bsr/services"
	"bsr/services/admin"
	"fmt"
	"testing"

	"github.com/joho/godotenv"
)

func TestCreateAdmin(t *testing.T) {
	err := godotenv.Load("../../.env")
	if err != nil {
		fmt.Printf("err: %v\n", err)
		t.Error(err)
		return
	}
	config.ConnectDB()
	admin, err := services.Admin.Create("Test Admin 2")
	if err != nil {
		t.Errorf("Failed to save!\nERROR:%v", err)
		return
	} else {
		fmt.Println("Admin saved!", admin)
	}
}

func TestGetAdmins(t *testing.T) {
	err := godotenv.Load("../../.env")
	if err != nil {
		fmt.Printf("err: %v\n", err)
		t.Error(err)
		return
	}
	config.ConnectDB()

	fmt.Println("Get all admin")
	opt := admin.GetAdminsOption{}
	admins, err := services.Admin.GetAdmins(opt)
	if err != nil {
		t.Errorf("Failed to get admins!\nERROR: %v", err)
		return
	} else {
		fmt.Println("Admins: ", len(admins), "\n\t", admins)
	}
}
func TestGetAdminById(t *testing.T) {
	err := godotenv.Load("../../.env")
	if err != nil {
		fmt.Printf("err: %v\n", err)
		t.Error(err)
		return
	}
	config.ConnectDB()

	fmt.Println("Get all admin")
	admin_id := "45a7d352-6340-4e7c-b62d-a26f665ad496"
	opt := admin.GetAdminByIdOption{
		WithTransactions: true,
		WithInvestors:    true,
	}
	admin, err := services.Admin.GetAdminById(admin_id, opt)
	if err != nil {
		t.Errorf("Failed to get admins!\nERROR: %v", err)
		return
	} else {
		fmt.Println("Admin: ", admin)
	}
}
