package admin

import (
	"bsr/config"
	"bsr/models"
)

type AdminStruct struct{}

func (AdminStruct) Create(name string) (models.Admin, error) {
	ad := models.Admin{Name: name}
	err := config.DB.Save(&ad).Error
	return ad, err
}
