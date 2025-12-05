import React, { useState } from 'react';

const Orders = () => {
    const orders = [
        { id: "ORD123", customer: "Amit Sharma", total: 850, status: "Pending", date: "03-12-2025" },
        { id: "ORD124", customer: "Priya Verma", total: 1200, status: "In-Progress", date: "03-12-2025" },
        { id: "ORD125", customer: "Rohit Singh", total: 650, status: "Completed", date: "02-12-2025" },
        { id: "ORD126", customer: "Neha Gupta", total: 1450, status: "Cancelled", date: "01-12-2025" },
        { id: "ORD127", customer: "Rahul Jain", total: 980, status: "Completed", date: "30-11-2025" },
    ];

    const [filter, setFilter] = useState("All");

    const statusColors = {
        Pending: "bg-yellow-100 text-yellow-800",
        "In-Progress": "bg-blue-100 text-blue-800",
        Completed: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800",
    };

    const filteredOrders = filter === "All" ? orders : orders.filter(o => o.status === filter);

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold mb-8 text-[#3f2e20]">Orders Management</h2>

            {/* Filter Buttons */}
            <div className="flex gap-4 mb-8 flex-wrap">
                {['All', 'Pending', 'In-Progress', 'Completed', 'Cancelled'].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`
                            px-5 py-2.5 rounded-lg font-medium transition-all duration-200
                            shadow-sm border
                            ${filter === s
                                ? 'bg-[#d69e64] text-white border-transparent'
                                : 'bg-white text-[#3f2e20] border-[#d9c1aa] hover:bg-[#f7e8dc]'
                            }
                        `}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white p-8 rounded-2xl shadow-xl overflow-auto border border-[#f1e5d8]">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#f7e8dc] text-[#3f2e20]">
                            <th className="py-4 px-5 text-left font-semibold">Order ID</th>
                            <th className="py-4 px-5 text-left font-semibold">Customer</th>
                            <th className="py-4 px-5 text-left font-semibold">Total Amount</th>
                            <th className="py-4 px-5 text-left font-semibold">Status</th>
                            <th className="py-4 px-5 text-left font-semibold">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredOrders.map((o, index) => (
                            <tr
                                key={index}
                                className="last:border-none hover:bg-[#fff7f1] transition-all text-[#3f2e20]"
                            >
                                <td className="py-4 px-5 font-semibold">{o.id}</td>
                                <td className="py-4 px-5">{o.customer}</td>
                                <td className="py-4 px-5 font-medium">₹{o.total}</td>
                                <td className="py-3 px-5 ">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[o.status]}`}
                                    >
                                        {o.status}
                                    </span>
                                </td>
                                <td className="py-4 px-5">{o.date}</td>
                            </tr>
                        ))}

                        {filteredOrders.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-6 text-gray-500"
                                >
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
