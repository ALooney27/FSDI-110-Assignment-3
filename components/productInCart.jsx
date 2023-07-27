import "./productInCart.css";
import { useState } from "react";

function ProductInCart(props) {
  const [quantity] = useState(1);
  return (
    <div className="prod-cart">
      <img src={"/images/" + props.data.image} alt=""></img>
      <div>
        <h3>{props.data.title}</h3>
        <p>{props.data.category}</p>
      </div>

      <label>{props.data.price}</label>
      <label>{props.data.quantity}</label>
      <label>{props.data.price * props.data.quantity}</label>
    </div>
  );
}

export default ProductInCart;
