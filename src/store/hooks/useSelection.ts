import { useContext } from "react";
import { SelectionContext } from "@/store/contexts/SelectionContext";

const useSelection = () => useContext(SelectionContext);

export default useSelection;
