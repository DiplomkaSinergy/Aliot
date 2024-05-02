package models

import (
	"encoding/json"
	"time"

	"github.com/golang-jwt/jwt"
	"gorm.io/gorm"
)

func (u *User) MarshalJSON() ([]byte, error) {
	id := u.GormModel.ID

	data := map[string]interface{}{
		"id":        id,
		"Email":     u.Email,
		"FirstName": u.FirstName,
		"LastName":  u.LastName,
		"Role":      u.Role,
	}

	return json.Marshal(data)
}

type GormModel struct {
	ID        uint `gorm:"primarykey" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

// @ JWT структура для управления Claims токенов
type Claims struct {
	GormModel
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Role      string `json:"role"`
	jwt.StandardClaims
}

// Основная структура пользователя
type User struct {
	GormModel
	Email     string    `gorm:"unique;not null" json:"email"`
	Password  string    `gorm:"not null" json:"password"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Phone     string    `gorm:"unique" json:"phone"`
	Role      string    `gorm:"default:'USER'" json:"role"`
	Basket    *Basket   `gorm:"foreignKey:UserID"`
	Ratings   []*Rating `gorm:"foreignKey:UserID"`
	Orders    []*Order  `gorm:"foreignKey:UserID"`
}

// Корзина покупателя
type Basket struct {
	GormModel
	UserID         uint             `json:"userID"`
	User           *User            `gorm:"foreignKey:UserID"`
	BasketProducts []*BasketProduct `gorm:"foreignKey:BasketID"`
}

// Продукты в корзине
type BasketProduct struct {
	GormModel
	Quantity  int      `gorm:"not null" json:"quantity"`
	BasketID  uint     `json:"basketID"`
	Basket    *Basket  `gorm:"foreignKey:BasketID"`
	ProductID uint     `json:"productID"`
	Product   *Product `gorm:"foreignKey:ProductID"`
}

// Информация о продуктах
type Product struct {
	GormModel
	Name                   string                `gorm:"not null" json:"name"`
	Price                  int                   `gorm:"not null" json:"price"`
	Rating                 int                   `gorm:"default:0" json:"rating"`
	Img                    string                `gorm:"unique;not null" json:"img"`
	Ratings                []*Rating             `gorm:"foreignKey:ProductID"`
	BasketProducts         []*BasketProduct      `gorm:"foreignKey:ProductID"`
	ProductInfos           []*ProductInfo        `gorm:"foreignKey:ProductID"`
	OrderProducts          []*OrderProduct       `gorm:"foreignKey:ProductID"`
	BreakingCapacityCharID uint                  `json:"breakingCapacityCharID"`
	BreakingCapacityChar   *BreakingCapacityChar `gorm:"foreignKey:BreakingCapacityCharID"`
	TypeOfMechanismCharID  uint                  `json:"typeOfMechanismCharID"`
	TypeOfMechanismChar    *TypeOfMechanismChar  `gorm:"foreignKey:TypeOfMechanismCharID"`
	RatedCurrentCharID     uint                  `json:"ratedCurrentCharID"`
	RatedCurrentChar       *RatedCurrentChar     `gorm:"foreignKey:RatedCurrentCharID"`
	RatedVoltageCharID     uint                  `json:"ratedVoltageCharID"`
	RatedVoltageChar       *RatedVoltageChar     `gorm:"foreignKey:RatedVoltageCharID"`
	DegreeProtectionCharID uint                  `json:"degreeProtectionCharID"`
	DegreeProtectionChar   *DegreeProtectionChar `gorm:"foreignKey:DegreeProtectionCharID"`
	NumberPolesCharID      uint                  `json:"numberPolesCharID"`
	NumberPolesChar        *NumberPolesChar      `gorm:"foreignKey:NumberPolesCharID"`
	ShutdownCruveCharID    uint                  `json:"shutdownCruveCharID"`
	ShutdownCruveChar      *ShutdownCruveChar    `gorm:"foreignKey:ShutdownCruveCharID"`
	DisplayCharID          uint                  `json:"displayCharID"`
	DisplayChar            *DisplayChar          `gorm:"foreignKey:DisplayCharID"`
	BrandsCharID           uint                  `json:"brandsCharID"`
	BrandsChar             *BrandsChar           `gorm:"foreignKey:BrandsCharID"`
}

// Рейтинги продуктов
type Rating struct {
	GormModel
	Rate      string   `gorm:"not null" json:"rate"`
	UserID    uint     `json:"userID"`
	User      *User    `gorm:"foreignKey:UserID"`
	ProductID uint     `json:"productID"`
	Product   *Product `gorm:"foreignKey:ProductID"`
}

// Дополнительная информация о продуктах
type ProductInfo struct {
	GormModel
	Title       string   `gorm:"not null" json:"title"`
	Description string   `gorm:"not null" json:"description"`
	ProductID   uint     `json:"productID"`
	Product     *Product `gorm:"foreignKey:ProductID"`
}

// Заказы пользователей
type Order struct {
	GormModel
	Price         int             `gorm:"not null" json:"price"`
	Status        string          `gorm:"not null;default:'Не оплачен'" json:"status"`
	Address       string          `gorm:"not null" json:"address"`
	PaymentID     string          `json:"paymentID"`
	UserID        uint            `json:"userID"`
	User          *User           `gorm:"foreignKey:UserID"`
	OrderProducts []*OrderProduct `gorm:"foreignKey:OrderID"`
}

// Продукты в заказах
type OrderProduct struct {
	GormModel
	Quantity  int      `gorm:"not null" json:"quantity"`
	OrderID   uint     `json:"orderID"`
	Order     *Order   `gorm:"foreignKey:OrderID"`
	ProductID uint     `json:"productID"`
	Product   *Product `gorm:"foreignKey:ProductID"`
}

// Характеристическая модель с правильно определенными внешними ключами
type CharacteristicName struct {
	GormModel
	Name                  string                  `gorm:"not null" json:"name"`
	BreakingCapacityChars []*BreakingCapacityChar `gorm:"foreignKey:CharacteristicNameID;references:ID"`
	TypeOfMechanismChars  []*TypeOfMechanismChar  `gorm:"foreignKey:CharacteristicNameID;references:ID"`
	RatedCurrentChars     []*RatedCurrentChar     `gorm:"foreignKey:CharacteristicNameID;references:ID"`
	RatedVoltageChars     []*RatedVoltageChar     `gorm:"foreignKey:CharacteristicNameID;references:ID"`
	DegreeProtectionChars []*DegreeProtectionChar `gorm:"foreignKey:CharacteristicNameID;references:ID"`
	NumberPolesChars      []*NumberPolesChar      `gorm:"foreignKey:CharacteristicNameID;references:ID"`
	ShutdownCruveChars    []*ShutdownCruveChar    `gorm:"foreignKey:CharacteristicNameID;references:ID"`
	DisplayChars          []*DisplayChar          `gorm:"foreignKey:CharacteristicNameID;references:ID"`
	BrandsChars           []*BrandsChar           `gorm:"foreignKey:CharacteristicNameID;references:ID"`
}

type Characteristic struct {
	GormModel
	Name                 string `gorm:"not null" json:"name"`
	CharacteristicNameID uint   `json:"characteristicNameID"`
}

type BreakingCapacityChar struct {
	Characteristic
}

type TypeOfMechanismChar struct {
	Characteristic
}

type RatedCurrentChar struct {
	Characteristic
}

type RatedVoltageChar struct {
	Characteristic
}

type DegreeProtectionChar struct {
	Characteristic
}

type NumberPolesChar struct {
	Characteristic
}

type ShutdownCruveChar struct {
	Characteristic
}

type DisplayChar struct {
	Characteristic
}

type BrandsChar struct {
	Characteristic
}
