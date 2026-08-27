import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

function Checkout() {
  const { items } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    deliveryArea: "",
    paymentMethod: "cash_on_delivery",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    deliveryArea: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }
  // validation part
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      deliveryArea: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^01\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid Bangladeshi phone number.";
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.deliveryArea) {
      newErrors.deliveryArea =
        "Please select a delivery area.";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error !== ""
    );

    if (hasErrors) {
      return;
    }

    console.log("Checkout data:", formData);
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[75vh] bg-stone-50 px-4">
        <div className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center">
          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
              🛍️
            </div>

            <h1 className="mt-6 text-3xl font-semibold text-gray-900">
              Your cart is empty
            </h1>

            <p className="mt-3 text-gray-500">
              Add a fragrance to your cart before checking out.
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

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.product.price) * item.quantity,
    0
  );
  const deliveryFee =
    formData.deliveryArea === "inside_dhaka"
      ? 60
      : formData.deliveryArea === "outside_dhaka"
        ? 120
        : 0;

  const total = subtotal + deliveryFee;

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm uppercase tracking-[0.25em] text-gray-400">
            Scentora
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your details and place your order.
          </p>
        </div>

        {/* Checkout Layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Customer Information */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-xl font-semibold text-gray-900">
              Delivery Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Where should we deliver your fragrance?
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone + Email */}
              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Delivery Address
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House, road, area"
                  required
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-gray-700"
                >
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="deliveryArea"
                  className="text-sm font-medium text-gray-700"
                >
                  Delivery Area
                </label>

                <select
                  id="deliveryArea"
                  name="deliveryArea"
                  value={formData.deliveryArea}
                  onChange={(event) =>
                    setFormData((currentData) => ({
                      ...currentData,
                      deliveryArea: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900"
                >
                  <option value="">
                    Select delivery area
                  </option>

                  <option value="inside_dhaka">
                    Inside Dhaka
                  </option>

                  <option value="outside_dhaka">
                    Outside Dhaka
                  </option>
                </select>

                {errors.deliveryArea && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.deliveryArea}
                  </p>
                )}
              </div>
              {/* payment method section  */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment Method
                </h2>

                <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash_on_delivery"
                      checked={formData.paymentMethod === "cash_on_delivery"}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4"
                    />

                    <div>
                      <p className="font-medium text-gray-900">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Pay in cash when your order is delivered.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-gray-900 px-6 py-4 font-medium text-white transition hover:bg-gray-700"
              >
                Place Order
              </button>

            </form>
          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">

            <h2 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">

              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4"
                >
                  {item.product.image_url ? (
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-xl bg-gray-100" />
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {item.product.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-gray-900">
                    BDT{" "}
                    {(
                      Number(item.product.price) *
                      item.quantity
                    ).toLocaleString()}
                  </p>
                </div>
              ))}

            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-medium text-gray-900">
                BDT {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-gray-500">
                Delivery
              </span>

              <span className="font-medium text-gray-900">
                {deliveryFee > 0
                  ? `BDT ${deliveryFee.toLocaleString()}`
                  : "Select area"}
              </span>
            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">
                Total
              </span>

              <span className="text-2xl font-semibold text-gray-900">
                BDT {total.toLocaleString()}
              </span>
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Checkout;