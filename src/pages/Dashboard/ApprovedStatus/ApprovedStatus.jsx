import React, { useState, useEffect } from 'react';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);

  // Fetch payments from the server
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:5000/payment'); // Fetch payments from backend
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  // Approve payment status
  const handleApproveStatus = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:5000/payment/approve/${paymentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }), // Update status to 'approved'
      });

      if (response.ok) {
        // Update the status in the local state
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment._id === paymentId ? { ...payment, status: 'approved' } : payment
          )
        );
      } else {
        console.error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error approving payment:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Payment Table</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left">User Email</th>
              <th className="py-3 px-4 text-left">Biodata ID</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Timestamp</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-b">
                <td className="py-3 px-4 text-gray-700">{payment.userEmail}</td>
                <td className="py-3 px-4 text-gray-700">{payment.biodataId}</td>
                <td className="py-3 px-4 text-gray-700">${payment.amount}</td>
                <td className="py-3 px-4">
                  {payment.status === 'approved' ? (
                    <span className="text-green-500 font-semibold">Approved</span>
                  ) : (
                    <span className="text-yellow-500 font-semibold">Pending</span>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {new Date(payment.timestamp).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  {payment.status === 'pending' ? (
                    <button
                      onClick={() => handleApproveStatus(payment._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                    >
                      Approve
                    </button>
                  ) : (
                    <span className="text-green-500 font-semibold">Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
