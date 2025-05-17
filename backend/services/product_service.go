package services

import (
	"mobile-store/models"

	"gorm.io/gorm"
)

type ProductService struct {
	DB *gorm.DB
}

func (s *ProductService) CreateProduct(product *models.Product) error {
	return s.DB.Create(product).Error
}

func (s *ProductService) GetAllProducts() ([]models.Product, error) {
	var products []models.Product
	err := s.DB.Preload("User").Find(&products).Error
	return products, err
}

func (s *ProductService) GetProductsByAdminID(adminID uint) ([]models.Product, error) {
	var products []models.Product
	if err := s.DB.Where("user_id = ?", adminID).Find(&products).Error; err != nil {
		return nil, err
	}
	return products, nil
}

func (s *ProductService) GetProductsByAdminName(name string) ([]models.Product, error) {
	var products []models.Product
	err := s.DB.Joins("JOIN users ON users.id = products.user_id").
		Where("users.email = ?", name).
		Find(&products).Error
	return products, err
}

func (s *ProductService) UpdateProduct(product *models.Product) error {
	return s.DB.Save(product).Error
}

func (s *ProductService) DeleteProduct(id uint) error {
	return s.DB.Delete(&models.Product{}, id).Error
}

func (s *ProductService) GetProductByID(id uint) (*models.Product, error) {
	var product models.Product
	if err := s.DB.First(&product, id).Error; err != nil {
		return nil, err
	}
	return &product, nil
}
