import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

function Cart() {
  const {
    items,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.product.price) * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            Discover a fragrance and add it to your cart.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
          >
            Browse Perfumes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-stone-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart
          </h1>

          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-red-600"
          >
            Clear Cart
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {items.map((item) => (

            <div
              key={item.product.id}
              className="flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm"
            >
              {item.product.image_url && (
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="h-24 w-24 rounded-xl object-cover"
                />
              )}

              <div className="flex-1">
                <h2 className="font-semibold text-gray-900">
                  {item.product.name}
                </h2>

                <div className="mt-3 flex w-fit items-center overflow-hidden rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.product.id)
                    }
                    className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="flex h-9 w-10 items-center justify-center border-x border-gray-200 text-sm font-medium">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart(item.product)
                    }
                    disabled={item.quantity >= item.product.stock}
                    className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
                  >
                    +
                  </button>
                </div>

                <p className="mt-2 font-medium">
                  BDT {item.product.price} × {item.quantity}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  removeFromCart(item.product.id)
                }
                className="text-sm text-gray-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              Subtotal
            </span>

            <span className="text-xl font-semibold text-gray-900">
              BDT {subtotal.toLocaleString()}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Shipping and taxes will be calculated at checkout.
          </p>

          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-gray-900 px-6 py-4 font-medium text-white transition hover:bg-gray-700"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </main>
  );
}

export default Cart;