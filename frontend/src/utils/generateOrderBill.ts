import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { Order } from "../types/order";

export function generateOrderBill(order: Order) {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.text("SCENTORA", 20, 20);

    doc.setFontSize(11);
    doc.text("Order Invoice", 20, 28);

    // Order information
    doc.setFontSize(10);

    doc.text(`Order #: ${order.id}`, 20, 42);
    doc.text(
        `Date: ${new Date(order.created_at).toLocaleDateString()}`,
        20,
        49
    );
    doc.text(`Status: ${order.status}`, 20, 56);

    // Customer information
    doc.setFontSize(13);
    doc.text("Customer Information", 20, 70);

    doc.setFontSize(10);
    doc.text(`Name: ${order.full_name}`, 20, 78);
    doc.text(`Phone: ${order.phone}`, 20, 85);

    if (order.email) {
        doc.text(`Email: ${order.email}`, 20, 92);
    }

    doc.text(`Address: ${order.address}`, 20, 99);
    doc.text(`City: ${order.city}`, 20, 106);

    // Products
    autoTable(doc, {
        startY: 118,
        head: [
            [
                "Product",
                "Qty",
                "Unit Price",
                "Total",
            ],
        ],
        body: order.items.map((item) => [
            item.product.name,
            item.quantity,
            `BDT ${Number(item.unit_price).toLocaleString()}`,
            `BDT ${(
                Number(item.unit_price) * item.quantity
            ).toLocaleString()}`,
        ]),
    });

    // Totals
    const finalY =
        (doc as jsPDF & { lastAutoTable: { finalY: number } })
            .lastAutoTable.finalY;

    doc.setFontSize(10);

    doc.text(
        `Subtotal: BDT ${Number(order.subtotal).toLocaleString()}`,
        130,
        finalY + 15
    );

    doc.text(
        `Delivery: BDT ${Number(order.delivery_fee).toLocaleString()}`,
        130,
        finalY + 22
    );

    doc.setFontSize(13);

    doc.text(
        `Total: BDT ${Number(order.total).toLocaleString()}`,
        130,
        finalY + 32
    );

    // Payment
    doc.setFontSize(10);

    doc.text(
        `Payment Method: Cash on Delivery`,
        20,
        finalY + 32
    );

    // Footer
    doc.setFontSize(9);

    doc.text(
        "Thank you for shopping with Scentora.",
        20,
        280
    );

    // Download
    doc.save(`Scentora_Order_${order.id}.pdf`);
}