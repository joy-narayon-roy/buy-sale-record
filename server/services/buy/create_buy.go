package buy

import (
	"bsr/config"
	"bsr/models"
	"errors"
	"time"

	"github.com/google/uuid"
)

type BuyItem struct {
	ItemID   int     `json:"item_id"`
	Quantity float64 `json:"quantity"`
}

type BuyCreateBody struct {
	AdminID   string    `json:"admin_id"`
	AgentID   string    `json:"agent_id"`
	CreatedAt string    `json:"created_at"`
	Items     []BuyItem `json:"item_ids"`
}

func (bs BuyStruct) Create(body BuyCreateBody) (*models.Buy, error) {
	admin_id, err := uuid.Parse(body.AdminID)
	if err != nil {
		return nil, errors.New("Invalid admin id!")
	}

	agent_id, err := uuid.Parse(body.AgentID)
	if err != nil {
		return nil, errors.New("Invalid agent id!")
	}

	var exists_agent models.Agent
	err = config.DB.Where("id = ? and admin_id = ?", agent_id, admin_id).First(&exists_agent).Error
	if err != nil {
		return nil, errors.New("Failed to get agent")
	}

	if exists_agent.AdminID != admin_id {
		return nil, errors.New("Invalid agent info")
	}

	// stop if balance is 0
	if exists_agent.Balance == 0 {
		return nil, errors.New("agent balance is zero")
	}

	item_ids := []int{}
	itemId_quantity := map[int]float64{}

	for _, v := range body.Items {
		itemId_quantity[v.ItemID] = v.Quantity
		item_ids = append(item_ids, v.ItemID)
	}

	var itms []models.Item
	config.DB.Where("id in ?", item_ids).Find(&itms)

	if len(itms) == 0 {
		return nil, errors.New("items not found")
	}

	buy := models.Buy{
		AdminID: admin_id,
		AgentID: agent_id,
	}

	if bs.Allow_update_time && body.CreatedAt != "" {
		ca, err := time.Parse("2006-01-02T15:04", body.CreatedAt)

		if err == nil {
			buy.CreatedAt = ca
		}
	}

	for _, itm := range itms {
		buy.BuyItems = append(buy.BuyItems, models.BuyItem{
			Item:     &itm,
			Quantity: itemId_quantity[itm.ID],
		})
		buy.TotalCost += itemId_quantity[itm.ID] * float64(itm.Price)
	}

	// check balance < total cost
	if exists_agent.Balance < buy.TotalCost {
		return nil, errors.New("insufficient balance")
	}

	// start transaction
	tx := config.DB.Begin()
	if tx.Error != nil {
		return nil, tx.Error
	}

	// update balance
	exists_agent.Balance -= buy.TotalCost
	if err := tx.Save(&exists_agent).Error; err != nil {
		tx.Rollback()
		return nil, errors.New("failed to update agent balance")
	}

	// save buy
	if err := tx.Save(&buy).Error; err != nil {
		tx.Rollback()
		return nil, errors.New("failed to create buy, " + err.Error())
	}

	// commit
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return nil, errors.New("transaction commit failed")
	}

	return &buy, nil
}
