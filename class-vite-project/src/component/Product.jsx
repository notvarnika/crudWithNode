import { useParams } from "react-router-dom";

const Product = () => {
  const { pid } = useParams();
  return (
    <div className="vh-100">
      <h1>Product ID:{pid}</h1>
    </div>
  );
};

export default Product;
