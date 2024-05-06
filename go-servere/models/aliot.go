package models

import (
	"encoding/json"
	"time"

	"github.com/golang-jwt/jwt"
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
}

// @ JWT структура для управления Claims токенов
type Claims struct {
	GormModel
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Phone     string `gorm:"unique" json:"phone"`
	Role      string `json:"role"`
	jwt.StandardClaims
}

type User struct {
	GormModel
	Email     string   `gorm:"unique;not null" json:"email"`
	Password  string   `gorm:"not null"`
	FirstName string   `json:"firstName"`
	LastName  string   `json:"lastName"`
	Phone     string   `gorm:"unique"`
	Role      string   `gorm:"default:'USER'" json:"role"`
	Basket    *Basket  `gorm:"foreignKey:UserID"`
	Orders    []*Order `gorm:"foreignKey:UserID"`
}

type Basket struct {
	GormModel
	UserID         uint             `gorm:"not null" json:"userID"`
	User           *User            `gorm:"foreignKey:UserID"`
	BasketProducts []*BasketProduct `gorm:"foreignKey:BasketID"`
}

type Order struct {
	GormModel
	Status    string `gorm:"not null;default:'Не оплачен'" json:"status"`
	Price     int    `gorm:"not null" json:"price"`
	Address   string `gorm:"not null" json:"address"`
	PaymentID string `json:"paymentID"`
	UserID    uint   `gorm:"not null" json:"userID"`

	User          *User           `gorm:"foreignKey:UserID"`
	OrderProducts []*OrderProduct `gorm:"foreignKey:OrderID"`
}

type BasketProduct struct {
	GormModel
	ProductID uint     `gorm:"not null" json:"productID"`
	BasketID  uint     `gorm:"not null" json:"basketID"`
	Quantity  uint     `gorm:"not null" json:"quantity"`
	Product   *Product `gorm:"foreignKey:ProductID"`
	Basket    *Basket  `gorm:"foreignKey:BasketID"`
}

type OrderProduct struct {
	GormModel
	ProductID uint `gorm:"not null" json:"productID"`
	OrderID   uint `gorm:"not null" json:"orderID"`

	Product *Product `gorm:"foreignKey:ProductID"`
	Order   *Order   `gorm:"foreignKey:OrderID"`
}

type Product struct {
	GormModel
	Name                   string  `json:"name"`
	Img                    string  `json:"img"`
	Price                  float64 `json:"price"`
	BreakingCapacityCharID uint    `json:"breakingCapacityCharID"`
	TypeOfMechanismCharID  uint    `json:"TypeOfMechanismCharID"`
	RatedCurrentCharID     uint    `json:"RatedCurrentCharID"`
	RatedVoltageCharID     uint    `json:"RatedVoltageCharID"`
	DegreeProtectionCharID uint    `json:"DegreeProtectionCharID"`
	NumberPolesCharID      uint    `json:"NumberPolesCharID"`
	ShutdownCruveCharID    uint    `json:"ShutdownCruveCharID"`
	DisplayCharID          uint    `json:"DisplayCharID"`
	BrandsCharID           uint    `json:"BrandsCharID"`

	BreakingCapacityChar *BreakingCapacityChar `gorm:"foreignKey:BreakingCapacityCharID"`
	TypeOfMechanismChar  *TypeOfMechanismChar  `gorm:"foreignKey:TypeOfMechanismCharID"`
	RatedCurrentChar     *RatedCurrentChar     `gorm:"foreignKey:RatedCurrentCharID"`
	RatedVoltageChar     *RatedVoltageChar     `gorm:"foreignKey:RatedVoltageCharID"`
	DegreeProtectionChar *DegreeProtectionChar `gorm:"foreignKey:DegreeProtectionCharID"`
	NumberPolesChar      *NumberPolesChar      `gorm:"foreignKey:NumberPolesCharID"`
	ShutdownCruveChar    *ShutdownCruveChar    `gorm:"foreignKey:ShutdownCruveCharID"`
	DisplayChar          *DisplayChar          `gorm:"foreignKey:DisplayCharID"`
	BrandsChar           *BrandsChar           `gorm:"foreignKey:BrandsCharID"`

	BasketProducts []*BasketProduct `gorm:"foreignKey:ProductID"`
	OrderProducts  []*OrderProduct  `gorm:"foreignKey:ProductID"`
}

type CharacteristicName struct {
	ID                    uint                    `gorm:"primarykey" json:"id"`
	Name                  string                  `gorm:"not null" json:"name"`
	BreakingCapacityChars []*BreakingCapacityChar `gorm:"foreignKey:CharacteristicNameID"`
	TypeOfMechanismChars  []*TypeOfMechanismChar  `gorm:"foreignKey:CharacteristicNameID"`
	RatedCurrentChars     []*RatedCurrentChar     `gorm:"foreignKey:CharacteristicNameID"`
	RatedVoltageChars     []*RatedVoltageChar     `gorm:"foreignKey:CharacteristicNameID"`
	DegreeProtectionChars []*DegreeProtectionChar `gorm:"foreignKey:CharacteristicNameID"`
	NumberPolesChars      []*NumberPolesChar      `gorm:"foreignKey:CharacteristicNameID"`
	ShutdownCruveChars    []*ShutdownCruveChar    `gorm:"foreignKey:CharacteristicNameID"`
	DisplayChars          []*DisplayChar          `gorm:"foreignKey:CharacteristicNameID"`
	BrandsChars           []*BrandsChar           `gorm:"foreignKey:CharacteristicNameID"`
}
type BreakingCapacityChar struct {
	ID                   uint                `gorm:"primarykey" json:"id"`
	Name                 string              `gorm:"not null" json:"name"`
	CharacteristicNameID uint                `gorm:"not null" json:"characteristicNameId"`
	CharacteristicName   *CharacteristicName `gorm:"foreignKey:CharacteristicNameID"`   // json:"characteristicName" (необязательно)
	Products             []*Product          `gorm:"foreignKey:BreakingCapacityCharID"` // json:"products" (необязательно)
}
type TypeOfMechanismChar struct {
	ID                   uint                `gorm:"primarykey" json:"id"`
	Name                 string              `gorm:"not null" json:"name"`
	CharacteristicNameID uint                `gorm:"not null" json:"characteristicNameId"`
	CharacteristicName   *CharacteristicName `gorm:"foreignKey:CharacteristicNameID"`  // json:"characteristicName" (необязательно)
	Products             []*Product          `gorm:"foreignKey:TypeOfMechanismCharID"` // json:"products" (необязательно)
}
type RatedCurrentChar struct {
	ID                   uint                `gorm:"primarykey" json:"id"`
	Name                 string              `gorm:"not null" json:"name"`
	CharacteristicNameID uint                `gorm:"not null" json:"characteristicNameId"`
	CharacteristicName   *CharacteristicName `gorm:"foreignKey:CharacteristicNameID"` // json:"characteristicName" (необязательно)
	Products             []*Product          `gorm:"foreignKey:RatedCurrentCharID"`   // json:"products" (необязательно)
}
type RatedVoltageChar struct {
	ID                   uint                `gorm:"primarykey" json:"id"`
	Name                 string              `gorm:"not null" json:"name"`
	CharacteristicNameID uint                `gorm:"not null" json:"characteristicNameId"`
	CharacteristicName   *CharacteristicName `gorm:"foreignKey:CharacteristicNameID"` // json:"characteristicName" (необязательно)
	Products             []*Product          `gorm:"foreignKey:RatedVoltageCharID"`   // json:"products" (необязательно)
}
type DegreeProtectionChar struct {
	ID                   uint                `gorm:"primarykey" json:"id"`
	Name                 string              `gorm:"not null" json:"name"`
	CharacteristicNameID uint                `gorm:"not null" json:"characteristicNameId"`
	CharacteristicName   *CharacteristicName `gorm:"foreignKey:CharacteristicNameID"`   // json:"characteristicName" (необязательно)
	Products             []*Product          `gorm:"foreignKey:DegreeProtectionCharID"` // json:"products" (необязательно)
}
type NumberPolesChar struct {
	ID                   uint                `gorm:"primarykey" json:"id"`
	Name                 string              `gorm:"not null" json:"name"`
	CharacteristicNameID uint                `gorm:"not null" json:"characteristicNameId"`
	CharacteristicName   *CharacteristicName `gorm:"foreignKey:CharacteristicNameID"` // json:"characteristicName" (необязательно)
	Products             []*Product          `gorm:"foreignKey:NumberPolesCharID"`    // json:"products" (необязательно)
}
type ShutdownCruveChar struct {
	ID                   uint                `gorm:"primarykey" json:"id"`
	Name                 string              `gorm:"not null" json:"name"`
	CharacteristicNameID uint                `gorm:"not null" json:"characteristicNameId"`
	CharacteristicName   *CharacteristicName `gorm:"foreignKey:CharacteristicNameID"` // json:"characteristicName" (необязательно)
	Products             []*Product          `gorm:"foreignKey:ShutdownCruveCharID"`  // json:"products" (необязательно)
}
type DisplayChar struct {
	ID                   uint                `gorm:"primarykey" json:"id"`
	Name                 string              `gorm:"not null" json:"name"`
	CharacteristicNameID uint                `gorm:"not null" json:"characteristicNameId"`
	CharacteristicName   *CharacteristicName `gorm:"foreignKey:CharacteristicNameID"` // json:"characteristicName" (необязательно)
	Products             []*Product          `gorm:"foreignKey:DisplayCharID"`        // json:"products" (необязательно)
}
type BrandsChar struct {
	ID                   uint                `gorm:"primarykey" json:"id"`
	Name                 string              `gorm:"not null" json:"name"`
	CharacteristicNameID uint                `gorm:"not null" json:"characteristicNameId"`
	CharacteristicName   *CharacteristicName `gorm:"foreignKey:CharacteristicNameID"` // json:"characteristicName" (необязательно)
	Products             []*Product          `gorm:"foreignKey:BrandsCharID"`         // json:"products" (необязательно)
}

// // Информация о продуктах
// type Product struct {
// 	GormModel
// 	Name                   string                `gorm:"not null" json:"name"`
// 	Price                  int                   `gorm:"not null" json:"price"`
// 	Rating                 int                   `gorm:"default:0" json:"rating"`
// 	Img                    string                `gorm:"unique;not null" json:"img"`
// 	Ratings                []*Rating             `gorm:"foreignKey:ProductID"`
// 	BasketProducts         []*BasketProduct      `gorm:"foreignKey:ProductID"`
// 	ProductInfos           []*ProductInfo        `gorm:"foreignKey:ProductID"`
// 	OrderProducts          []*OrderProduct       `gorm:"foreignKey:ProductID"`
// 	BreakingCapacityCharID uint                  `json:"breakingCapacityCharID"`
// 	BreakingCapacityChar   *BreakingCapacityChar `gorm:"foreignKey:BreakingCapacityCharID"`
// 	TypeOfMechanismCharID  uint                  `json:"typeOfMechanismCharID"`
// 	TypeOfMechanismChar    *TypeOfMechanismChar  `gorm:"foreignKey:TypeOfMechanismCharID"`
// 	RatedCurrentCharID     uint                  `json:"ratedCurrentCharID"`
// 	RatedCurrentChar       *RatedCurrentChar     `gorm:"foreignKey:RatedCurrentCharID"`
// 	RatedVoltageCharID     uint                  `json:"ratedVoltageCharID"`
// 	RatedVoltageChar       *RatedVoltageChar     `gorm:"foreignKey:RatedVoltageCharID"`
// 	DegreeProtectionCharID uint                  `json:"degreeProtectionCharID"`
// 	DegreeProtectionChar   *DegreeProtectionChar `gorm:"foreignKey:DegreeProtectionCharID"`
// 	NumberPolesCharID      uint                  `json:"numberPolesCharID"`
// 	NumberPolesChar        *NumberPolesChar      `gorm:"foreignKey:NumberPolesCharID"`
// 	ShutdownCruveCharID    uint                  `json:"shutdownCruveCharID"`
// 	ShutdownCruveChar      *ShutdownCruveChar    `gorm:"foreignKey:ShutdownCruveCharID"`
// 	DisplayCharID          uint                  `json:"displayCharID"`
// 	DisplayChar            *DisplayChar          `gorm:"foreignKey:DisplayCharID"`
// 	BrandsCharID           uint                  `json:"brandsCharID"`
// 	BrandsChar             *BrandsChar           `gorm:"foreignKey:BrandsCharID"`
// }

// // Дополнительная информация о продуктах
// type ProductInfo struct {
// 	GormModel
// 	Title       string   `gorm:"not null" json:"title"`
// 	Description string   `gorm:"not null" json:"description"`
// 	ProductID   uint     `json:"productID"`
// 	Product     *Product `gorm:"foreignKey:ProductID"`
// }

// // Характеристическая модель с правильно определенными внешними ключами
// type CharacteristicName struct {
// 	ID                    uint                    `gorm:"primarykey" json:"id"`
// 	Name                  string                  `gorm:"not null" json:"name"`
// 	BreakingCapacityChars []*BreakingCapacityChar `gorm:"foreignKey:CharacteristicNameID;references:ID"`
// 	TypeOfMechanismChars  []*TypeOfMechanismChar  `gorm:"foreignKey:CharacteristicNameID;references:ID"`
// 	RatedCurrentChars     []*RatedCurrentChar     `gorm:"foreignKey:CharacteristicNameID;references:ID"`
// 	RatedVoltageChars     []*RatedVoltageChar     `gorm:"foreignKey:CharacteristicNameID;references:ID"`
// 	DegreeProtectionChars []*DegreeProtectionChar `gorm:"foreignKey:CharacteristicNameID;references:ID"`
// 	NumberPolesChars      []*NumberPolesChar      `gorm:"foreignKey:CharacteristicNameID;references:ID"`
// 	ShutdownCruveChars    []*ShutdownCruveChar    `gorm:"foreignKey:CharacteristicNameID;references:ID"`
// 	DisplayChars          []*DisplayChar          `gorm:"foreignKey:CharacteristicNameID;references:ID"`
// 	BrandsChars           []*BrandsChar           `gorm:"foreignKey:CharacteristicNameID;references:ID"`
// }

// type BrandsChar struct {
// 	CharacteristicID uint           // это поле будет использоваться для хранения внешнего ключа
// 	Characteristic   Characteristic `gorm:"foreignKey:CharacteristicID"`
// }
