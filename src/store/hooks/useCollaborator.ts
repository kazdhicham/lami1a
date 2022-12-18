import { useContext } from "react";
import { CollaboratorContext } from "@/store/contexts/CollaboratorContext";

const useCollaborator = () => useContext(CollaboratorContext);

export default useCollaborator;
