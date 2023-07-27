import Product from "../components/product";
import DataService from "../services/dataServices";
import "./catalog.css";
import { useEffect, useState } from "react";

function Catalog() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [prodsToDisplay, setProdsToDisplay] = useState([]);
  // when the component loads --> do something

  useEffect(function () {
    loadCatalog();
  }, []);

  async function loadCatalog() {
    //get the products from the serice
    let service = new DataService();
    let prods = await service.getProducts();
    console.log(prods);
    setProducts(prods);

    let cats = await service.getCategories();
    setCategory(cats);
    setProdsToDisplay(prods);
  }
  // when the product component is loaded
  //console.log "Hello I am a product"

  function filter(category) {
    console.log(category);
    let list = [];
    //find the products that match the category and add them to the list
    for (let index = 0; index < products.length; index++) {
      let prod = products[index];
      if (prod.category === category) {
        list.push(prod);
      }
    }
    console.log(list);
    setProdsToDisplay(list);
  }

  function clearFilters() {
    setProdsToDisplay(products);
  }

  return (
    <div className="catalog">
      <h1>Check out our {products.length} new products in our catalog</h1>
      <br />
      <button onClick={clearFilters} className="btn btn-sm btn-dark btn-filter">
        All
      </button>
      {category.map((c) => (
        <button
          onClick={() => filter(c)}
          key={c}
          className="btn btn-sm btn-primary btn-filter"
        >
          {c}
        </button>
      ))}

      <br />

      {prodsToDisplay.map((p) => (
        <Product key={p._id} data={p} />
      ))}
    </div>
  );
}
//create a product component and render the quantity picker inside of the product component
//render the <Product> component 5 times into the Catalog.

export default Catalog;
