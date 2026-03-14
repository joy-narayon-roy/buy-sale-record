package admin

import (
	"bsr/config"
	"bsr/models"
)

type GetAdminByIdOption struct {
	WithInvestors    bool
	WithTransactions bool
	WithAgents       bool
	WithTransfer     bool
	WithItems        bool
	WithBuys         bool
}

func (AdminStruct) GetAdminById(id string, opt GetAdminByIdOption) (*models.Admin, error) {
	query := config.DB

	if opt.WithTransactions {
		query = query.Preload("Transactions")
	}

	if opt.WithInvestors {
		query = query.Preload("Investors")
	}
	if opt.WithAgents {
		query = query.Preload("Agents")
	}
	if opt.WithTransfer {
		query = query.Preload("Transfer")
	}
	if opt.WithBuys {
		query = query.Preload("Buys")
		query = query.Preload("Buys.BuyItems")
	}

	query = query.Where("id = ?", id)

	var admin models.Admin
	err := query.First(&admin).Error
	if err != nil {
		return nil, err
	}

	if opt.WithItems {
		config.DB.Find(&admin.Items)
		config.DB.Preload("PackageItems").Find(&admin.Packages)
	}

	return &admin, nil
}
