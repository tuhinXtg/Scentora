import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    decreaseQuantity: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
    undefined
);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem("scentora-cart");

        if (!savedCart) {
            return [];
        }

        try {
            return JSON.parse(savedCart) as CartItem[];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "scentora-cart",
            JSON.stringify(items)
        );
    }, [items]);

    function addToCart(product: Product) {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    product,
                    quantity: 1,
                },
            ];
        });
    }

    function decreaseQuantity(productId: number) {
        setItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.product.id === productId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function removeFromCart(productId: number) {
        setItems((currentItems) =>
            currentItems.filter(
                (item) => item.product.id !== productId
            )
        );
    }

    function clearCart() {
        setItems([]);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                decreaseQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// This hook intentionally shares the provider's context; keep the warning
// suppressed until the context and hook can be moved to a separate module.
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}