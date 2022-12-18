import { useContext } from "react";
import { MessageContext } from "@/store/contexts/MessageContext";

const useMessage = () => useContext(MessageContext);

export default useMessage;
