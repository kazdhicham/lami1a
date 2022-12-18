import { useContext } from "react";
import { ProductContext } from "@/store/contexts/ProductContext";

const useProduct = () => useContext(ProductContext);

export default useProduct;
