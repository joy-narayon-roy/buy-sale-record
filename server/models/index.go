package models

import (
	"bsr/config"
	"fmt"
)

func AutoMigrate() error {

	config.DB.Exec(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)

	err := config.DB.AutoMigrate(
		&Admin{},
		&Investor{},
		&Transaction{},
		&Agent{},
		&Transfer{},
		&Buy{},
		&BuyItem{},
		&Item{},
		&Package{},
		&PackageItem{},
	)
	if err != nil {
		fmt.Println("Migrate error", err)
	}

	return err
}
