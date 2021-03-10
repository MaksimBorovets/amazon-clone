import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";


function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const sum = basket.reduce((amount,item) => item.price + amount, 0)
  const history = useHistory()

  return (
    <div className="subtotal">
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
      <button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
