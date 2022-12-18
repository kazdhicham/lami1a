import { useContext } from 'react';
import { ConfigContext } from '@/store/contexts/ConfigContext';

// ==============================|| CONFIG - HOOKS  ||============================== //

const useConfig = () => useContext(ConfigContext);

export default useConfig;
