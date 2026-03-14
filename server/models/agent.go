package models

import (
	"fmt"

	"github.com/google/uuid"
)

type Agent struct {
	ID       uuid.UUID  `gorm:"column:id;type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	Name     string     `gorm:"column:name;not null" json:"name"`
	Balance  float64    `gorm:"column:balance;default:0" json:"balance"`
	AdminID  uuid.UUID  `gorm:"column:admin_id;type:uuid;index" json:"admin_id"`
	Admin    *Admin     `gorm:"foreignKey:AdminID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"admin"`
	Transfer []Transfer `gorm:"foreignKey:AgentID" json:"transfers"`
	Buys     []Buy      `gorm:"foreignKey:AgentID"`
}

func (Agent) TableName() string {
	return "agent"
}

func (a Agent) String() string {
	smnt := ""
	smnt += fmt.Sprintf("Agent(id='%s', name='%s', balance=%f, admin_id=%s", a.ID, a.Name, a.Balance, a.AdminID)
	if a.Admin != nil {
		smnt += fmt.Sprintf(", admin='<Admin(%s)>'", a.Admin.Name)
	}
	smnt += ")"
	return smnt
}
