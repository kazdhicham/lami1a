import { useContext } from "react";
import { SnackbarContext } from "@/store/contexts/SnackbarContext";

const useSnackbar = () => useContext(SnackbarContext);

export default useSnackbar;
