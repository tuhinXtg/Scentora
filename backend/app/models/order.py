from datetime import datetime
from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)

    full_name: Mapped[str] = mapped_column(String(150))
    phone: Mapped[str] = mapped_column(String(20))
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)

    address: Mapped[str] = mapped_column(Text)
    city: Mapped[str] = mapped_column(String(100))
    delivery_area: Mapped[str] = mapped_column(String(50))

    payment_method: Mapped[str] = mapped_column(String(50))
    status: Mapped[str] = mapped_column(
        String(30),
        default="pending",
    )

    subtotal: Mapped[Decimal] = mapped_column(
        Numeric(10, 2)
    )

    delivery_fee: Mapped[Decimal] = mapped_column(
        Numeric(10, 2)
    )

    total: Mapped[Decimal] = mapped_column(
        Numeric(10, 2)
    )

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow
    )

    items: Mapped[list["OrderItem"]] = relationship(
        back_populates="order",
        cascade="all, delete-orphan",
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(primary_key=True)

    order_id: Mapped[int] = mapped_column(
        ForeignKey("orders.id")
    )

    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id")
    )

    quantity: Mapped[int] = mapped_column()

    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2)
    )

    order: Mapped["Order"] = relationship(
        back_populates="items"
    )