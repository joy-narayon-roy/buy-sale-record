package buy

import (
	"bsr/config"
	"bsr/models"
	"fmt"
)

type BuyGetBuys struct {
	Limit   int     `quary:"limit"`
	Page    int     `quary:"page"`
	AdminId *string `quary:"admin_id"`
	AgentId *string `quary:"agent_id"`
}
type BuyGetBuysReturn struct {
	Total int64        `json:"total"`
	Page  int          `json:"page"`
	Buys  []models.Buy `json:"buys"`
}

func (BuyStruct) GetBuys(opt BuyGetBuys) (*BuyGetBuysReturn, error) {
	if opt.Limit == 0 {
		opt.Limit = 1
	}
	if opt.Page <= 0 {
		opt.Page = 1
	}

	offset := opt.Limit * (opt.Page - 1)
	fmt.Println(offset)

	query := config.DB.Model(&models.Buy{}).Limit(opt.Limit).Offset(offset)

	if opt.AdminId != nil {
		query.Where("admin_id  = ?", opt.AdminId)
	}
	if opt.AgentId != nil {
		query.Where("admin_id  = ?", opt.AgentId)
	}

	query = query.Preload("BuyItems")
	query = query.Preload("BuyItems.Item")

	var r BuyGetBuysReturn
	err := query.Find(&r.Buys).Error
	query.Count(&r.Total)
	if err != nil {
		return nil, err
	}
	r.Page = opt.Page
	return &r, nil
}
