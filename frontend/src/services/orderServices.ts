import type { OrderResponse } from "../types/order";

export interface CreateOrderData {
    full_name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    delivery_area: string;
    payment_method: string;
    items: {
        product_id: number;
        quantity: number;
    }[];
}

export async function createOrder(
    data: CreateOrderData
): Promise<OrderResponse> {
    const response = await fetch(
        "http://127.0.0.1:8000/api/orders",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create order");
    }

    return response.json();
}