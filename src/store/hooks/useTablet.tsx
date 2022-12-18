import { useContext } from "react";
import { TabletContext } from "@/store/contexts/TabletContext";

const useTablet = () => useContext(TabletContext);

export default useTablet;
