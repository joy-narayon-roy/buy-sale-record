package services

import (
	"bsr/config"
	"bsr/services"
	"bsr/services/transfer"
	"fmt"
	"testing"

	"github.com/joho/godotenv"
)

func TestFund(t *testing.T) {
	err := godotenv.Load("../../.env")
	if err != nil {
		fmt.Printf("err: %v\n", err)
		t.Error(err)
		return
	}
	config.ConnectDB()

	valid_admin := "45a7d352-6340-4e7c-b62d-a26f665ad496"
	valid_agent := "beceabda-ffce-4468-a338-9768ce503f73"
	fmt.Println("Create Fund")
	inv, err := services.Transfer.Fund(transfer.FundInfoType{
		AdminID: valid_admin,
		AgentID: valid_agent,
	})
	if err != nil {
		t.Errorf("Failed create fund!\nERROR: %v", err)
	} else {
		fmt.Println("Funding done.\n", inv)
	}
}
