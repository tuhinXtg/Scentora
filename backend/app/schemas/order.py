from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, Field


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    phone: str = Field(min_length=5, max_length=20)
    email: str | None = None
    address: str = Field(min_length=5)
    city: str = Field(min_length=2, max_length=100)
    delivery_area: str = Field(min_length=2, max_length=50)
    payment_method: str = Field(min_length=2, max_length=50)

    items: list[OrderItemCreate] = Field(min_length=1)


class OrderProductResponse(BaseModel):
    id: int
    name: str
    image_url: str | None

    model_config = {
        "from_attributes": True
    }


class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    product: OrderProductResponse
    quantity: int
    unit_price: Decimal

    model_config = {
        "from_attributes": True
    }

class OrderResponse(BaseModel):
    id: int
    full_name: str
    phone: str
    email: str | None
    address: str
    city: str
    delivery_area: str
    payment_method: str
    status: str
    subtotal: Decimal
    delivery_fee: Decimal
    total: Decimal
    created_at: datetime
    items: list[OrderItemResponse]

    model_config = {
        "from_attributes": True
    }