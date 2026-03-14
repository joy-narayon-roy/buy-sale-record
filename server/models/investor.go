package models

import (
	"fmt"

	"github.com/google/uuid"
)

type Investor struct {
	ID           uuid.UUID     `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	Status       Status        `gorm:"type:varchar(20);not null;default:'active';index" json:"status"`
	Name         string        `gorm:"default:''" json:"name"`
	Balance      int           `gorm:"column:balance;not null;default:0" json:"balance"`
	AdminID      uuid.UUID     `gorm:"type:uuid;index" json:"admin_id"` // Foreign Key column
	Admin        *Admin        `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:AdminID" json:"admin"`
	Transactions []Transaction `gorm:"foreignKey:InvestorID" json:"transactions"` // ← add this
}

func (Investor) TableName() string {
	return "investors"
}

func (i Investor) String() string {
	str := fmt.Sprintf("Investor(id=%s, name='%s', status='%s', admin_id='%s', transactions=%d", i.ID, i.Name, i.Status, i.AdminID, len(i.Transactions))
	var id uuid.UUID
	if i.Admin.ID != id {
		str += fmt.Sprintf(", admin=Admin(%s)", i.Admin.Name)
	}
	str += ")"
	return str
}
