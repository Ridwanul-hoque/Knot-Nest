import React, { useState, useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';


const ContactRequest = ({ paymentId }) => {
  const { user, loading } = useAuth(); // Get user data from useAuth hook
  const [payment, setPayment] = useState(null);
  const [biodata, setBiodata] = useState(null);

  useEffect(() => {
    if (user && !loading) {
      // Fetch the payment information by paymentId using fetch
      fetch(`/api/payment/${paymentId}`)
        .then(response => response.json())
        .then(paymentData => {
          if (paymentData.status === 'approved') {
            setPayment(paymentData);
            // Fetch biodata using the biodataId from payment
            fetch(`/api/bio/${paymentData.biodataId}`)
              .then(response => response.json())
              .then(bioData => {
                setBiodata(bioData);
              })
              .catch(error => {
                console.error('Error fetching biodata:', error);
              });
          } else {
            setPayment(paymentData);
          }
        })
        .catch(error => {
          console.error('Error fetching payment data:', error);
        });
    }
  }, [user, loading, paymentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view the contact request.</div>;
  }

  if (!payment) {
    return <div>No payment data available.</div>;
  }

  // Check payment status and show content accordingly
  return (
    <div>
      <h2>Biodata Information</h2>
      {payment.status === 'approved' ? (
        <div>
          <img src={biodata?.profileImage} alt={biodata?.name} />
          <p>Name: {biodata?.name}</p>
          <p>Age: {biodata?.age}</p>
          <p>Occupation: {biodata?.occupation}</p>
          <p>Email: {biodata?.email}</p>
          <p>Phone: {biodata?.phone}</p>
          <p>Division: {biodata?.permanentDivision}</p>
        </div>
      ) : (
        <div>
          <p>Request is pending. Your request will be processed shortly.</p>
          <p>Name: {biodata?.name}</p>
          <p>Age: {biodata?.age}</p>
          <p>Occupation: {biodata?.occupation}</p>
          <p>Division: {biodata?.permanentDivision}</p>
        </div>
      )}
    </div>
  );
};

export default ContactRequest;
