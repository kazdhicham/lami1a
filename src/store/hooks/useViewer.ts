// Top level App component
import { useContext } from "react";
import { viewerContext } from '@/store/contexts/ViewerContext'

const useViewer = () => {
  return useContext(viewerContext);
};
export default useViewer