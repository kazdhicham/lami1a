import { useContext } from "react";
import { ThemeContext } from "@/store/contexts/ThemeContext"

const useTheme = () => useContext(ThemeContext);

export default useTheme;
