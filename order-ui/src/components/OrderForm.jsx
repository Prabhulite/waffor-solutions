import { useState } from "react";
import { createOrder } from "../services/orderService";

function OrderForm({ fetchOrders }) {
  const [customerName, setCustomerName] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      customerName,
      item,
      amount
    };

    await createOrder(order);

    setCustomerName("");
    setItem("");
    setAmount("");

    fetchOrders();
  };

  return (
    <div className="card p-4 shadow">
      <h3>Place Order</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Food Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="btn btn-success w-100">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;