package admin

import (
	"bsr/config"
	"bsr/models"
)

type GetAdminsOption struct {
}

func (AdminStruct) GetAdmins(opt GetAdminsOption) ([]models.Admin, error) {
	var admins []models.Admin
	query := config.DB.Model(&models.Admin{})

	err := query.Find(&admins).Error
	if err != nil {
		return nil, err
	}
	return admins, nil
}
