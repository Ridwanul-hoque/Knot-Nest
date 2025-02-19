import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ user, biodata, amount, navigate }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        // Create payment intent on the server
        const response = await fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
            body: JSON.stringify({ price: amount }), // Sending the amount (5 dollars)
        });
        const { clientSecret } = await response.json();

        // Confirm card payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "Anonymous",
                        email: user?.email || "No Email",
                    },
                },
            }
        );

        if (error) {
            setError(error.message);
            setProcessing(false);
        } else if (paymentIntent.status === "succeeded") {
            setSuccess(true);

            // Save payment info to the server
            const paymentInfo = {
                biodataId: biodata._id,
                userEmail: user.email,
                amount,
                transactionId: paymentIntent.id,
                status: "approved",
            };

            // Sending payment info to the backend
            fetch("http://localhost:5000/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access-token")}`,
                },
                body: JSON.stringify(paymentInfo),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        alert("Payment successful!");
                        navigate("/"); // Redirect to a thank-you page
                    }
                });
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Payment successful!</p>}
            <button
                type="submit"
                disabled={!stripe || processing}
                className={`px-6 py-2 bg-blue-500 text-white rounded-lg ${processing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                    }`}
            >
                {processing ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

export default CheckoutForm;
