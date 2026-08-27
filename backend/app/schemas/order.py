from pydantic import BaseModel, Field
from decimal import Decimal


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

    model_config = {
        "from_attributes": True
    }