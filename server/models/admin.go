package models

import (
	"fmt"

	"github.com/google/uuid"
)

type Admin struct {
	ID           uuid.UUID     `gorm:"column:id;type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	Name         string        `gorm:"column:name;" json:"name"`
	Balance      int           `gorm:"column:balance;not null;default:0" json:"balance"`
	Transactions []Transaction `gorm:"foreignKey:AdminID" json:"transactions"` // ← add this
	Transfer     []Transfer    `gorm:"foreignKey:AdminID" json:"transfers"`    // ← add this
	Investors    []Investor    `gorm:"foreignKey:AdminID" json:"investors"`
	Agents       []Agent       `gorm:"foreignKey:AdminID" json:"agents"`
	Items        []Item        `gorm:"-" json:"items"`
	Packages     []Package     `gorm:"-" json:"packages"`
	Buys         []Buy         `gorm:"foreignKey:AdminID" json:"buys"`
}

func (Admin) TableName() string {
	return "admins"
}

func (a Admin) String() string {
	return fmt.Sprintf("Admin(id=%s, name=%s, investors=%d, transactions=(%d))", a.ID, a.Name, len(a.Investors), len(a.Transactions))
}
