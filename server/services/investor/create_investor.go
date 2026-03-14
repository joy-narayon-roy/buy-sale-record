package investor

import (
	"bsr/config"
	"bsr/models"

	"github.com/google/uuid"
)

// TODO: allow update date
const allow_update_date = true

type InvestorStruct struct {
}

func (InvestorStruct) Create(admin string, name string) (models.Investor, error) {
	admin_uuid, err := uuid.Parse(admin)
	inv := models.Investor{
		AdminID: admin_uuid,
		Name:    name,
	}
	if err != nil {
		return inv, err
	}

	err = config.DB.Save(&inv).Error
	if err != nil {
		return inv, err
	}
	return inv, nil
}

type FindPageNation struct {
	Limit int `json:"limit" query:"limit"`
	Page  int `json:"page" query:"page"`
}
type FindQueryOptions struct {
	Admin     string `json:"admin"`
	WithAdmin bool   `json:"with_admin" query:"with_admin"`
}
type FindReturnType struct {
	Total     int64             `json:"total"`
	Limit     int               `json:"limit"`
	Page      int               `json:"page"`
	Investors []models.Investor `json:"investors"`
}

func (InvestorStruct) Find(opt FindQueryOptions, page FindPageNation) (FindReturnType, error) {
	if page.Page <= 0 {
		page.Page = 1
	}
	if page.Limit <= 0 {
		page.Limit = 10
	}
	query := config.DB.Model(&models.Investor{})
	if opt.WithAdmin {
		query.Preload("Admin")
	}
	query.Limit(page.Limit)
	query.Offset((page.Page - 1) * page.Limit)

	if opt.Admin != "" {
		query.Where("admin_id = ?", opt.Admin)
	}

	result := FindReturnType{
		Limit: page.Limit,
		Page:  page.Page,
	}

	err := query.Find(&result.Investors).Count(&result.Total).Error
	if err != nil {
		return result, err
	}
	return result, nil
}
