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

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="min-h-[75vh] bg-stone-50 px-4">
        <div className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center">
          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
              🛍️
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900">
              Your shopping bag is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              Your next signature fragrance is waiting.
              Explore our collection and find something
              that feels like you.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex rounded-xl bg-gray-900 px-7 py-3.5 font-medium text-white transition hover:bg-gray-700"
            >
              Explore Collection
            </Link>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400">
              Shopping Bag
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="self-start text-sm font-medium text-gray-500 transition hover:text-red-600 sm:self-auto"
          >
            Clear cart
          </button>

        </div>

        {/* Main layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Cart Items */}
          <section className="space-y-4">

            {items.map((item) => (
              <article
                key={item.product.id}
                className="rounded-2xl bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex gap-4 sm:gap-6">

                  {/* Image */}
                  <Link
                    to={`/products/${item.product.id}`}
                    className="shrink-0"
                  >
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="h-28 w-24 rounded-xl object-cover sm:h-36 sm:w-32"
                      />
                    ) : (
                      <div className="flex h-28 w-24 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400 sm:h-36 sm:w-32">
                        No image
                      </div>
                    )}
                  </Link>

                  {/* Information */}
                  <div className="flex min-w-0 flex-1 flex-col">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                          Fragrance
                        </p>

                        <Link
                          to={`/products/${item.product.id}`}
                        >
                          <h2 className="mt-1 text-lg font-semibold text-gray-900 transition hover:text-gray-600">
                            {item.product.name}
                          </h2>
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.product.id)
                        }
                        className="text-sm text-gray-400 transition hover:text-red-600"
                      >
                        Remove
                      </button>

                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      BDT{" "}
                      {Number(
                        item.product.price
                      ).toLocaleString()}
                    </p>

                    <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">

                      {/* Quantity */}
                      <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item.product.id
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                          −
                        </button>

                        <span className="flex h-10 w-12 items-center justify-center border-x border-gray-200 text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            addToCart(item.product)
                          }
                          disabled={
                            item.quantity >=
                            item.product.stock
                          }
                          className="flex h-10 w-10 items-center justify-center text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300"
                        >
                          +
                        </button>

                      </div>

                      {/* Item total */}
                      <p className="font-semibold text-gray-900">
                        BDT{" "}
                        {(
                          Number(item.product.price) *
                          item.quantity
                        ).toLocaleString()}
                      </p>

                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Continue shopping */}
            <Link
              to="/products"
              className="inline-flex pt-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              ← Continue Shopping
            </Link>

          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">

            <h2 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium text-gray-900">
                  BDT {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="text-gray-500">
                  Calculated at checkout
                </span>
              </div>

            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">
                Total
              </span>

              <span className="text-2xl font-semibold text-gray-900">
                BDT {subtotal.toLocaleString()}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-6 block w-full rounded-xl bg-gray-900 px-6 py-4 text-center font-medium text-white transition hover:bg-gray-700"
            >
              Proceed to Checkout
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              Shipping charges and final order details
              will be confirmed at checkout.
            </p>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Cart;