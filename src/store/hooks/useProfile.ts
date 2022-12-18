// Top level App component
import { useContext } from "react";
import { profileContext } from '@/store/contexts/ProfileContext'

const useProfile = () => {
  return useContext(profileContext);
};
export default useProfile