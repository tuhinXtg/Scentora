export interface OrderProduct {
    id: number;
    name: string;
    image_url: string | null;
}

export interface OrderItem {
    id: number;
    product_id: number;
    product: OrderProduct;
    quantity: number;
    unit_price: string;
}

export interface OrderResponse {
    id: number;
    full_name: string;
    phone: string;
    email: string | null;
    address: string;
    city: string;
    delivery_area: string;
    payment_method: string;
    status: string;
    subtotal: string;
    delivery_fee: string;
    total: string;
    created_at: string;
    items: OrderItem[];
}

export interface Order {
    id: number;
    full_name: string;
    phone: string;
    email: string | null;
    address: string;
    city: string;
    delivery_area: string;
    payment_method: string;
    status: string;
    subtotal: string;
    delivery_fee: string;
    total: string;
    created_at: string;
    items: OrderItem[];
}