import "./cart.css";
import { useContext } from "react";
import DataContext from "../store/dataContext";
import ProductInCart from "../components/productInCart";

function Cart() {
  const cart = useContext(DataContext).cart;

  function getNumProducts() {
    let sum = 0;

    for (let index = 0; index < cart.length; index++) {
      const prod = cart[index];
      sum += prod.quantity;
    }

    return sum;
  }

  function getTotal() {
    let total = 0;
    for (let index = 0; index < cart.length; index++) {
      const prod = cart[index];
      total += prod.quantity * prod.price;
    }
    return total.toFixed(2);
  }

  return (
    <div className="cart page">
      <h1>Proceed to checkout</h1>
      <h5>You have {getNumProducts()} products in the cart</h5>

      <div className="parent">
        <section className="list">
          List of products here
          {cart.map((prod) => (
            <ProductInCart key={prod.id} data={prod} />
          ))}
        </section>
        <section className="side">Side Panel</section>
        <h4>Total</h4>
        <h5>{getTotal()}</h5>
      </div>
    </div>
  );
}

export default Cart;

/**
 * Create ProductInCart component
 * map the cart into your component, send the data
 * the component should receive the data and display the information
 * add the style that you need
 */
