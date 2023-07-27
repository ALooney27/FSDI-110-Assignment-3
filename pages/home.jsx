import "./home.css";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home page">
      <h1>Welcome to my online store</h1>

      <Link to="/catalog">Check out our catalog &gt;</Link>

      <img src="/images/produce-image.png"></img>
    </div>
  );
}

export default Home;
