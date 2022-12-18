import { useContext } from "react";
import { SearchContext } from "@/store/contexts/SearchContext";

const useSearch = () => useContext(SearchContext);

export default useSearch;
