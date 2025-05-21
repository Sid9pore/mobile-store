package models

type Product struct {
	ID             uint    `gorm:"primaryKey" json:"id"`
	Name           string  `json:"name"`
	Description    string  `json:"description"`
	Brand          string  `json:"brand"`
	ModelNumber    string  `json:"model_number"`
	Specifications string  `json:"specifications"`
	Warranty       string  `json:"warranty"`
	StockQuantity  int     `json:"stock_quantity"`
	Rating         float64 `json:"rating"`
	Price          float64 `json:"price"`
	ImageData      []byte  `json:"image_data" gorm:"type:bytea"`
	CreatedByID    uint    `json:"created_by_id"`
}
