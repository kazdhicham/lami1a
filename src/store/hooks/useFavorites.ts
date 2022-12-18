import { useContext } from "react";
import { FavoritesContext } from "@/store/contexts/FavoritesContext";

const useFavorites = () => useContext(FavoritesContext);

export default useFavorites;
