import React from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { useHistory } from "react-router-dom";
import {db} from './firebase'

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true);
  const [succeeded, setSucceeded] = React.useState(false);
  const [processing, setProcessing] = React.useState("");
  const [clientSecret, setClientSecret] = React.useState(true);

  const sum = basket.reduce((amount, item) => item.price + amount, 0);

  React.useEffect(() => {
    // generate the special stripe secret which allows us to
    //charge a customer
    const getClientSecret = async () => {
      const respone = await axios({
        method: "post",
        url: `/payments/create?total=${sum * 100}`,
      });
      setClientSecret(respone.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        })

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch ({
          type: 'EMPTY_BASKET'
        })

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    // listen for changes in the CardElement
    // and display any errors as customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      {" "}
      <h1>
        Checkout (<Link to="/checkout">{basket?.length} items </Link>)
      </h1>
      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>737 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic */}
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <CardElement />
              <div className="payment__priceConteiner">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({basket?.length} items) : <span>{value}</span>
                      </p>
                      <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                      </small>
                    </>
                  )}
                  decimalScale={2}
                  value={sum}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  {" "}
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* ERRORS */}
              {error && <div>{error}</div>}
            </form>
            <div className="warning">
              <p>
                !!! Attention, this site was created for a portfolio! This is a
                DEMO version, do not make purchases and do not use payment !!!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
