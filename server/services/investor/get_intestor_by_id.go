package investor

import (
	"bsr/config"
	"bsr/models"
)

type GetInvestorByIdOpt struct {
	WithTransactions bool
	WithAdmin        bool
}

func (InvestorStruct) GetInvestorById(id string, opt GetInvestorByIdOpt) (*models.Investor, error) {

	query := config.DB

	if opt.WithTransactions {
		query = query.Preload("Transactions")
	}

	if opt.WithAdmin {
		query = query.Preload("Admin")
	}

	query = query.Where("id = ?", id)

	var admin models.Investor
	err := query.First(&admin).Error
	if err != nil {
		return nil, err
	}

	return &admin, nil

}
