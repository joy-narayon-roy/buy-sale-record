package services

import (
	"bsr/config"
	"bsr/services"
	"bsr/services/investor"
	"encoding/json"
	"fmt"
	"testing"

	"github.com/joho/godotenv"
)

func TestCreateInvestor(t *testing.T) {
	err := godotenv.Load("../../.env")
	if err != nil {
		fmt.Printf("err: %v\n", err)
		t.Error(err)
		return
	}
	config.ConnectDB()

	fmt.Println("Create Investor")
	inv, err := services.Investor.Create("45a7d352-6340-4e7c-b62d-a26f665ad496", "Investor")
	if err != nil {
		t.Errorf("Failed to save Investor!\nERROR: %v", err)
	} else {
		fmt.Println("Investor saved.\n", inv)
	}
}

func TestGetInvestor(t *testing.T) {
	err := godotenv.Load("../../.env")
	if err != nil {
		fmt.Printf("err: %v\n", err)
		t.Error(err)
		return
	}
	config.ConnectDB()

	fmt.Println("Find Investor")
	result, err := services.Investor.Find(investor.FindQueryOptions{
		WithAdmin: true,
	}, investor.FindPageNation{})
	if err != nil {
		t.Errorf("ERROR : %v", err)
		return
	}
	fmt.Println("Total investors", len(result.Investors))
	for _, i := range result.Investors {
		fmt.Println(i)
	}
}

func TestGetInvestorById(t *testing.T) {
	err := godotenv.Load("../../.env")
	if err != nil {
		fmt.Printf("err: %v\n", err)
		t.Error(err)
		return
	}
	config.ConnectDB()
	fmt.Println("Find Investor By Id")
	valid_investor_id := "4c1e1c3d-8978-4387-8748-bbdfb5fed24a"
	opt := investor.GetInvestorByIdOpt{
		WithAdmin:        true,
		WithTransactions: true,
	}
	inv, err := services.Investor.GetInvestorById(valid_investor_id, opt)
	if err != nil {
		t.Fatal("ERROR :", err)
	}
	res, _ := json.MarshalIndent(inv, "", "  ")
	fmt.Println(string(res))

}

func TestInvestorDeposit(t *testing.T) {
	err := godotenv.Load("../../.env")
	if err != nil {
		fmt.Printf("err: %v\n", err)
		t.Error(err)
		return
	}
	config.ConnectDB()
	fmt.Println("Investor Deposit")
	investor_id := "e3645ef1-da92-4410-8ea8-99cd95975cef"
	tr, err := services.Investor.Deposit(investor.DepositInfo{
		InvestorID: investor_id,
		Amount:     5000,
	})

	if err != nil {
		t.Errorf("ERROR : %v", err)
		return
	}
	fmt.Println("Transaction :", tr)
}
func TestInvestorWithdraw(t *testing.T) {
	err := godotenv.Load("../../.env")
	if err != nil {
		fmt.Printf("err: %v\n", err)
		t.Error(err)
		return
	}
	config.ConnectDB()
	fmt.Println("Investor Withdraw")
	investor_id := "4c1e1c3d-8978-4387-8748-bbdfb5fed24a"
	tr, err := services.Investor.Withdraw(investor.TransactionInfoStruct{
		InvestorID: investor_id,
		Amount:     5000,
	})

	if err != nil {
		t.Errorf("ERROR : %v", err)
		return
	}
	fmt.Println("Transaction :", tr)
}
