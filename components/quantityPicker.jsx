import "./quantityPicker.css";
import { useState } from "react";

function QuantityPicker(props) {
  let [quantity, setQuantity] = useState(1);

  function increase() {
    console.log("Increasing quantity");
    let val = quantity + 1;
    setQuantity(val);
    props.onChange(val); //notify my parent that I am doing something
  }

  function decrease() {
    console.log("Decreasing quantity");
    if (quantity < 1) return;
    let val = quantity - 1;
    setQuantity(val);
    props.onChange(val); //notify my parent that I am doing something.
  }

  return (
    <div className="quantityPicker">
      <button
        className="btn btn-secondary btn-sm"
        disabled={quantity < 1}
        onClick={decrease}
      >
        -
      </button>
      <label> {quantity} </label>
      <button className="btn btn-secondary btn-sm" onClick={increase}>
        +
      </button>
    </div>
  );
}

export default QuantityPicker;
