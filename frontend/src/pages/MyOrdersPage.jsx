import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simuler un appel API
        const fetchOrders = async () => {
            try {
                // Remplacez ce setTimeout par un vrai appel API
                setTimeout(() => {
                    const mockOrders = [
                        {
                            _id: '1234',
                            createdAt: new Date(),
                            shippingAddress: { city: 'New York', country: 'USA' },
                            orderItems: [
                                {
                                    name: 'Product 7',
                                    image: 'https://picsum.photos/500/500?random=1',
                                },
                            ],
                            totalPrice: 100,
                            isPaid: true,
                        },
                        {
                            _id: '5678',
                            createdAt: new Date(),
                            shippingAddress: { city: 'Los Angeles', country: 'USA' },
                            orderItems: [
                                {
                                    name: 'Product 2',
                                    image: 'https://picsum.photos/500/500?random=2',
                                },
                            ],
                            totalPrice: 200,
                            isPaid: false,
                        }
                    ];
                    setOrders(mockOrders);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);


    const handleRowClick = (orderId) => {
        navigate(`/order/${orderId}`);
    }

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                    <table className="min-w-full text-left text-gray-500">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="py-2 px-4 sm:py-3">Image</th>
                                <th className="py-2 px-4 sm:py-3">Order ID</th>
                                <th className="py-2 px-4 sm:py-3">Created</th>
                                <th className="py-2 px-4 sm:py-3">Shipping Address</th>
                                <th className="py-2 px-4 sm:py-3">Items</th>
                                <th className="py-2 px-4 sm:py-3">Price</th>
                                <th className="py-2 px-4 sm:py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id}
                                        onClick={() => handleRowClick(order._id)}
                                        className="border-b hover:bg-gray-50 cursor-pointer">
                                        <td className="py-2 px-2 sm:px-4">
                                            <img 
                                                src={order.orderItems[0].image} 
                                                alt={order.orderItems[0].name} 
                                                className="w-10 h-10 object-cover rounded-lg sm:h-12" 
                                            />
                                        </td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                                            {order._id}
                                        </td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4">{new Date(order.createdAt).toLocaleDateString()} {' '} {new Date(order.createdAt).toLocaleTimeString()}</td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4">{`${order.shippingAddress.city}, ${order.shippingAddress.country}`}</td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4">{order.orderItems.length} items</td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4">${order.totalPrice.toFixed(2)}</td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4">
                                            {order.isPaid ? (
                                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Paid</span>
                                            ) : (
                                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Pending</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-8 text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MyOrdersPage;