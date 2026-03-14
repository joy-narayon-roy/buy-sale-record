package agent

import (
	"bsr/config"
	"bsr/models"

	"github.com/google/uuid"
)

type AgentStruct struct{}

func (AgentStruct) Create(name string, admin_id string) (*models.Agent, error) {

	admin_uuid, err := uuid.Parse(admin_id)
	if err != nil {
		return nil, err
	}
	agent := models.Agent{
		Name:    name,
		AdminID: admin_uuid,
	}
	err = config.DB.Save(&agent).Error
	if err != nil {
		return nil, err
	}
	return &agent, nil
}
