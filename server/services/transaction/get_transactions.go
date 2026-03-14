package transaction

import (
	"bsr/config"
	"bsr/models"
)

type GetTransactionsOptins struct {
	Limit     int  `query:"limit" json:"limit"`
	Page      int  `query:"page" json:"page"`
	WithAdmin bool `query:"with_admin" json:"with_admin"`
}
type GetTransactionsReturn struct {
	Total       int64                `json:"total"`
	Page        int                  `json:"page"`
	Transaction []models.Transaction `json:"transaction"`
}

func (TransactionStruct) GetTransactions(opt GetTransactionsOptins) (*GetTransactionsReturn, error) {
	if opt.Limit <= 0 {
		opt.Limit = 10
	}
	if opt.Page <= 0 {
		opt.Page = 1
	}

	offset := (opt.Page - 1) * opt.Limit
	q := config.DB.Model(&models.Transaction{})
	q = q.Limit(opt.Limit)
	q = q.Offset(offset)

	if opt.WithAdmin {
		q = q.Preload("Admin")
	}

	var result GetTransactionsReturn
	err := q.Find(&result.Transaction).Error
	if err != nil {
		return nil, err
	}
	err = q.Count(&result.Total).Error
	if err != nil {
		return nil, err
	}
	result.Page = opt.Page
	return &result, nil
}
