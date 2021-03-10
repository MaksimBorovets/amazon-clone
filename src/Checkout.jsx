import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

function Checkout() {

  const [{basket, user}, dispatch] = useStateValue()


  return (
    <div className="checkout">
    
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlaYbq34T8CoZKbzIthiDJYBw7EgZ-AHnZ5g&usqp=CAU"
          alt=""
        />
        <div>
        <h3>Hello, {!user ? "Guest !" : user.email}</h3>
          <h2 className="checkout__title">Your shoping basket</h2>
         {basket.map(item => (
           <CheckoutProduct
           id = {item.id}
           title = {item.title}
           image = {item.image}
           price = {item.price}
           rating = {item.rating}
            />
         ))}
          

        </div>
      </div>
      <div className="checkout__right">
      <h2><Subtotal/></h2>
      </div>
    </div>
  );
}

export default Checkout;
