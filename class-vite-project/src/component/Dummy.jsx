import Contact from "./Contact.jsx";
import About from "./About.jsx";
import { Route, Routes } from "react-router-dom";
import Registration from "./Registration.jsx";
import Header from "./Header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import Error from "./Error.jsx";
import Product from "./Product.jsx";
import TextBox from "./kilas/TextBox.jsx";
import Timer from "./kilas/Timer.jsx";
import Login from "./kilas/Login.jsx";
import { useEffect, useState } from "react";

const Dummy = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        // Fixed: Use data.products instead of data.quotes
        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {products.map((item) => (
        <div className="card" style={{ width: "18rem" }} key={item.id}>
          <img
            src={item.thumbnail}
            className="card-img-top"
            alt={item.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <p className="fw-bold">${item.price}</p>
            <a href="#" className="btn btn-primary">
              Buy Now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dummy;
