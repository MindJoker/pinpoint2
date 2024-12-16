import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/orders/");
        setOrders(response.data); // Set orders in state
        setLoading(false); // Stop loading spinner
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4 text-gray-100">
        Loading orders...
      </div>
    );
  }


  return (
    <div className="p-4 bg-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">Orders and Packages</h1>
      <table className="min-w-full bg-gray-700 border border-gray-600">
        <thead>
          <tr className="bg-gray-600">
            <th className="py-2 px-2border-b border-gray-500 text-gray-100">Order ID</th>
            <th className="py-2 px-2 border-b border-gray-500 text-gray-100">Customer</th>
            <th className="py-2 px-2 border-b border-gray-500 text-gray-100">Status</th>
            <th className="py-2 px-2 border-b border-gray-500 text-gray-100">Packages</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <tr>
                <td className="py-2 px-4 border-b border-gray-500 text-gray-100">{order.id}</td>
                <td className="py-2 px-4 border-b border-gray-500 text-gray-100">
                  {order.customer ? (
                    <details>
                      <summary className="cursor-pointer text-blue-500">View Customer Details</summary>
                      <ul className="ml-4 mt-2">
                        <li><strong>First Name:</strong> {order.customer.first_name}</li>
                        <li><strong>Last Name:</strong> {order.customer.last_name}</li>
                        <li><strong>Email:</strong> {order.customer.email}</li>
                        <li><strong>Phone:</strong> {order.customer.phone_number}</li>
                        <li><strong>Operator: {order.operator}</strong></li>
                        <li><strong>Address:</strong> {order.customer.address}</li>
                      </ul>
                    </details>
                  ) : (
                    "No customer info"
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-500 text-gray-100">{order.status}</td>
                <td className="py-2 px-4 border-b border-gray-500 text-gray-100">
                  {order.packages.length > 0 ? (
                    <details className="text-gray-100">
                      <summary className="cursor-pointer text-blue-500">
                        {order.packages.length} Packages
                      </summary>
                      <ul className="ml-4 mt-2">
                        {order.packages.map((pkg) => (
                          <li key={pkg.id} className="mb-2 text-gray-100">
                            <strong>Tracking:</strong> {pkg.tracking_number}
                            <br />
                            <strong>Type:</strong> {pkg.package_type}
                            <br />
                            <strong>Size:</strong> {pkg.size}
                            <br />
                            <strong>Status:</strong> {pkg.current_status}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    "No packages"
                  )}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
