import { useState, useEffect } from "react";
import "./admin.css";
import DataService from "../services/dataServices";

function Admin() {
  const [product, setProduct] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [coupon, setCoupon] = useState({});
  const [allCoupons, setAllCoupons] = useState([]);

  useEffect(function () {
    loadCoupons();
  }, []);

  async function loadCoupons() {
    let service = new DataService();
    let savedCoupons = await service.getCoupons();
    setAllCoupons(savedCoupons);
  }

  function handleText(e) {
    const value = e.target.value;
    const name = e.target.name;

    // Copy, Modify Copy, Set Copy
    let copy = { ...product };
    copy[name] = value;
    setProduct(copy);
  }

  function handleCouponChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    let copy = { ...coupon };
    copy[name] = value;
    setCoupon(copy);
  }

  async function saveProduct() {
    // product -> obj
    // fix the Product's price to be a number
    let fixedProduct = { ...product };
    fixedProduct.price = parseFloat(product.price);

    let service = new DataService();
    let response = await service.saveProduct(fixedProduct);

    let copy = [...allProducts];
    copy.push(response);
    setAllProducts(copy);
  }

  async function saveCoupon() {
    // coupon
    //fix the discount to be a float
    //send the fixed obj to the service
    //service should send it to the server.
    let fixedCoupon = { ...coupon };
    fixedCoupon.discount = parseFloat(coupon.discount);
    let service = new DataService();
    let response = await service.saveCoupon(fixedCoupon);

    let copy = [...allCoupons];
    copy.push(response);
    setAllCoupons(copy);
  }

  return (
    <div className="admin page">
      <h1>Store Administration</h1>

      <div className="parent">
        <section className="sec-prods">
          <div className="form">
            <h3>Products</h3>
            <div className="mt-3">
              <label className="form-label">Title</label>
              <input
                onChange={handleText}
                name="title"
                className="form-control"
                type="text"
              />
            </div>
            <div className="mt-3">
              <label className="form-label">Category</label>
              <input
                onChange={handleText}
                name="category"
                className="form-control"
                type="text"
              />
            </div>
            <div className="mt-3">
              <label className="form-label">Image</label>
              <input
                onChange={handleText}
                name="image"
                className="form-control"
                type="text"
              />
            </div>
            <div className="mt-3">
              <label className="form-label">Price</label>
              <input
                onChange={handleText}
                name="price"
                className="form-control"
                type="number"
              />
            </div>
            <div className="mt-4 text-center">
              <button onClick={saveProduct} className="btn btn-dark">
                Save Product
              </button>
            </div>
          </div>

          <h3 className="mt-4">You have {allProducts.length} products</h3>

          {allProducts.map((prod) => (
            <h5 key={prod._id}>
              {prod.title} - ${prod.price}
            </h5>
          ))}
        </section>

        <section className="sec-coupons">
          <div className="form">
            <h3>Coupon Codes</h3>

            <div className="mt-3">
              <label className="form-label">Code</label>
              <input
                onChange={handleCouponChange}
                name="code"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <label className="form-label">Discount</label>
              <input
                onChange={handleCouponChange}
                name="discount"
                type="number"
                className="form-control"
              />
            </div>
            <div className="mt-4 text-center">
              <button onClick={saveCoupon} className="btn btn-outline-dark">
                SaveCoupon
              </button>
            </div>

            <div className="mt-3">
              <label className="form-label">Code</label>
              <input
                onChange={handleCouponChange}
                name="code"
                type="text"
                className="form-control"
              />
            </div>

            <div className="mt-3">
              <label className="form-label">Discount</label>
              <input
                onChange={handleCouponChange}
                name="discount"
                type="number"
                className="form-control"
              />
            </div>

            <div className="mt-4 text-center">
              <button onClick={saveCoupon} className="btn btn-outline-dark">
                SaveCoupon
              </button>
            </div>
          </div>
          <h3 className="mt-4">You have {allCoupons.length} coupons</h3>
          <ul>
            {allCoupons.map((coupon) => (
              <li key={coupon._id}>
                {coupon.code} - {coupon.discount}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Admin;
