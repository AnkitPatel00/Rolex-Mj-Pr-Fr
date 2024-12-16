import { useDispatch } from "react-redux";
import { cancelOrderAsync } from "../features/order/orderSlice";

const OrderList = ({ orders }) => {
  const dispatch = useDispatch();

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrderAsync(orderId));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Your Orders</h1>
      <ul className="list-group">
        {orders.toReversed().map((order) => (
          <li
            key={order._id}
            className="list-group-item mb-4 p-3 shadow-sm rounded"
          >
           
            <div className="row">
              {/* Date on Top Left */}
              <div className="col-12 mb-3 text-muted">
               <span>Order Placed :</span><small> {new Date(order.date).toLocaleDateString()}</small>
              </div>

              {/* Cloth Details on Left */}
              <div className="col-md-6">
                {order.cloths.map((cloth) => (
                  <div
                    className="d-flex align-items-start mb-3"
                    key={cloth.clothsId._id}
                  >
                    <img
                      src={cloth.clothsId.imgUrl}
                      alt={cloth.clothsId.title}
                      className="img-fluid rounded me-3"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <div>
                      <h6 className="mb-1">
                        {cloth.clothsId.title.slice(0, 30) + "..."}
                      </h6>
                      <p className="mb-1">
                        <strong>Quantity:</strong> {cloth.quantity}
                      </p>
                      <p className="mb-1">
                        <strong>Size:</strong> {cloth.size}
                      </p>
                      <p className="mb-1">
                        <strong>Final Price:</strong>{" "}
                        <small>
                          &#8377;
                          {(
                            cloth.clothsId.price -
                            cloth.clothsId.price *
                              cloth.clothsId.discount *
                              0.01
                          ).toFixed(2)}
                        </small>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Details and Cancel Button on Right */}
              <div className="col-md-6 text-end">
                <p className="mb-1">
                  <strong>Name:</strong> {order.user.firstname}
                </p>
                <p className="mb-1">
                  <strong>Email:</strong> {order.user.email}
                </p>
                <p className="mb-1">
                  <strong>Contact:</strong> {order.user.mobilenumber}
                </p>
                <p className="mb-1">
                  <strong>Shipping Address:</strong>{" "}
                  <span>{order.address}</span>
                </p>
                <hr />
                <div>
                  <h5>Price Details</h5>
                  <p>
                    Price: <span>&#8377;{order.priceDetails.totalPrice}</span>
                  </p>
                  <p>
                    Discount:{" "}
                    <span style={{ color: "green" }}>
                      &minus;&#8377;{order.priceDetails.discount}
                    </span>
                  </p>
                  <p>
                    Delivery Charges :{" "}
                    {order.priceDetails.deliveryCharges > 0
                      ? "+40 Delivery"
                      : "Free"}
                  </p>
                  <p>Payment Method: {order.paymentMethod}</p>
                  <h5 className="mb-3">
                    <strong>{order.paymentMethod==="Cash On Delivery"?"Payable Amount":"Paid"}:</strong> ₹
                    {order.priceDetails.totalAmount}
                  </h5>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
