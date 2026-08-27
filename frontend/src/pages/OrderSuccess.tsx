import { Link, useLocation } from "react-router-dom";

import type { Order } from "../types/order";
import { generateOrderBill } from "../utils/generateOrderBill";

function OrderSuccess() {
    const location = useLocation();

    const order = location.state?.order as Order | undefined;

    if (!order) {
        return (
            <main className="min-h-[75vh] bg-stone-50 px-4">
                <div className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-gray-900">
                            Order information not found
                        </h1>

                        <p className="mt-3 text-gray-500">
                            Please return to the products page and continue shopping.
                        </p>

                        <Link
                            to="/products"
                            className="mt-8 inline-flex rounded-xl bg-gray-900 px-7 py-3.5 font-medium text-white transition hover:bg-gray-700"
                        >
                            Browse Perfumes
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-stone-50">
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Success Header */}
                <div className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                        ✓
                    </div>

                    <p className="mt-6 text-sm uppercase tracking-[0.25em] text-gray-400">
                        Scentora
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">
                        Order Confirmed!
                    </h1>

                    <p className="mt-3 text-gray-500">
                        Thank you for your order. Your fragrance is on its way to you.
                    </p>

                    <p className="mt-2 text-sm font-medium text-gray-900">
                        Order #{order.id}
                    </p>
                </div>

                {/* Order Details */}
                <div className="mt-10 grid gap-6 lg:grid-cols-2">

                    {/* Customer Information */}
                    <section className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Delivery Information
                        </h2>

                        <div className="mt-5 space-y-4 text-sm">

                            <div>
                                <p className="text-gray-500">Name</p>
                                <p className="mt-1 font-medium text-gray-900">
                                    {order.full_name}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="mt-1 font-medium text-gray-900">
                                    {order.phone}
                                </p>
                            </div>

                            {order.email && (
                                <div>
                                    <p className="text-gray-500">Email</p>
                                    <p className="mt-1 font-medium text-gray-900">
                                        {order.email}
                                    </p>
                                </div>
                            )}

                            <div>
                                <p className="text-gray-500">Address</p>
                                <p className="mt-1 font-medium text-gray-900">
                                    {order.address}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">City</p>
                                <p className="mt-1 font-medium text-gray-900">
                                    {order.city}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Delivery Area</p>
                                <p className="mt-1 font-medium text-gray-900">
                                    {order.delivery_area === "inside_dhaka"
                                        ? "Inside Dhaka"
                                        : "Outside Dhaka"}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Payment Method</p>
                                <p className="mt-1 font-medium text-gray-900">
                                    Cash on Delivery
                                </p>
                            </div>

                        </div>
                    </section>

                    {/* Bill */}
                    <section className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Order Summary
                        </h2>

                        <div className="mt-5 space-y-5">

                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4"
                                >
                                    {/* Product Image */}
                                    {item.product.image_url ? (
                                        <img
                                            src={item.product.image_url}
                                            alt={item.product.name}
                                            className="h-16 w-16 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="h-16 w-16 rounded-xl bg-gray-100" />
                                    )}

                                    {/* Product Info */}
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-gray-900">
                                            {item.product.name}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Qty: {item.quantity} × BDT{" "}
                                            {Number(item.unit_price).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Item Total */}
                                    <p className="font-medium text-gray-900">
                                        BDT{" "}
                                        {(
                                            Number(item.unit_price) *
                                            item.quantity
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            ))}

                        </div>

                        <div className="my-6 border-t border-gray-200" />

                        {/* Subtotal */}
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">
                                Subtotal
                            </span>

                            <span className="font-medium text-gray-900">
                                BDT {Number(order.subtotal).toLocaleString()}
                            </span>
                        </div>

                        {/* Delivery */}
                        <div className="mt-4 flex justify-between text-sm">
                            <span className="text-gray-500">
                                Delivery
                            </span>

                            <span className="font-medium text-gray-900">
                                BDT {Number(order.delivery_fee).toLocaleString()}
                            </span>
                        </div>

                        <div className="my-6 border-t border-gray-200" />

                        {/* Total */}
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                                Total
                            </span>

                            <span className="text-2xl font-semibold text-gray-900">
                                BDT {Number(order.total).toLocaleString()}
                            </span>
                        </div>

                        {/* Status */}
                        <div className="mt-5 rounded-xl bg-gray-50 px-4 py-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                    Order Status
                                </span>

                                <span className="font-medium capitalize text-gray-900">
                                    {order.status}
                                </span>
                            </div>
                        </div>

                    </section>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                    {/* Download Bill */}
                    <button
                        type="button"
                        onClick={() => generateOrderBill(order)}
                        className="inline-flex rounded-xl bg-gray-700 px-7 py-3.5 font-medium text-white transition hover:bg-gray-700"
                    >
                        Download Bill
                    </button>

                    {/* Continue Shopping */}
                    <Link
                        to="/products"
                        className="inline-flex rounded-xl bg-gray-900 px-7 py-3.5 font-medium text-white transition hover:bg-gray-700"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>
        </main>
    );
}

export default OrderSuccess;