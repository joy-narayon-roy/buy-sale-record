package models

// ──────────────────────────────────────────────
type Item struct {
	ID           int           `gorm:"column:id;primaryKey;autoIncrement" json:"id"`
	Name         string        `gorm:"column:name;not null;unique" json:"name"`
	Img          string        `gorm:"column:img;not null" json:"img"`
	Price        int           `gorm:"column:price;not null" json:"price"`
	Quantity     uint          `gorm:"column:quantity;not null" json:"quantity"`
	Unit         string        `gorm:"column:unit;not null" json:"unit"`
	PackageItems []PackageItem `gorm:"foreignKey:ItemID" json:"-"`
	BuyItems     []BuyItem     `gorm:"foreignKey:ItemID" json:"buy_items"`
}

func (Item) TableName() string {
	return "item"
}
