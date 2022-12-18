import { useContext } from "react";
import { CartContext } from "@/store/contexts/CartContext";

const useCart = () => useContext(CartContext);

export default useCart;
