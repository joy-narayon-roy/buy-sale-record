package services

import (
	"bsr/config"
	"bsr/models"
	"bsr/services"
	"fmt"
	"testing"

	"github.com/joho/godotenv"
)

func TestCreateAgent(t *testing.T) {
	err := godotenv.Load("../../.env")
	if err != nil {
		fmt.Printf("err: %v\n", err)
		t.Error(err)
		return
	}
	config.ConnectDB()
	models.AutoMigrate()
	fmt.Println("Create Agent")
	admin_id := "45a7d352-6340-4e7c-b62d-a26f665ad496"
	agent, err := services.Agent.Create("AGENT 1", admin_id)
	if err != nil {
		t.Fatal("ERROR :", err)
	}
	fmt.Println(agent)
}
