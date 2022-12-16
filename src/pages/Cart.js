import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const carts = useSelector((state) => state.cart.cart);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10">
      {carts.map((cart) => (
        <ProductCard key={cart._id} product={cart} />
      ))}
    </div>
  );
};

export default Cart;
