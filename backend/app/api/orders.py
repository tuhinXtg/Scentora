from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderResponse


router = APIRouter(
    prefix="/api/orders",
    tags=["Orders"],
)

@router.post(
    "",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
):
    subtotal = Decimal("0.00")

    order_items = []

    for item_data in order_data.items:
        product = db.get(Product, item_data.product_id)

        if product is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product {item_data.product_id} not found",
            )

        if item_data.quantity > product.stock:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Not enough stock for {product.name}",
            )
        # removing stocks after placing order
        product.stock -= item_data.quantity   

        item_total = product.price * item_data.quantity
        subtotal += item_total

        order_item = OrderItem(
            product_id=product.id,
            quantity=item_data.quantity,
            unit_price=product.price,
        )

        order_items.append(order_item)

    delivery_fee = Decimal("80.00")
    total = subtotal + delivery_fee

    order = Order(
        full_name=order_data.full_name,
        phone=order_data.phone,
        email=order_data.email,
        address=order_data.address,
        city=order_data.city,
        delivery_area=order_data.delivery_area,
        payment_method=order_data.payment_method,
        status="pending",
        subtotal=subtotal,
        delivery_fee=delivery_fee,
        total=total,
    )

    order.items = order_items

    db.add(order)
    db.commit()
    db.refresh(order)

    return order