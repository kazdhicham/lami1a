import dashboard from './dashboard';
import liismanager from './liismanager';
import forms from './forms';
import elements from './elements';
import pages from './pages';
import utilities from './utilities';
import support from './support';
import other from './other';
import { NavItemType, NavItemTypeObject } from 'types';
import useProfile from '@/store/hooks/useProfile';

// ==============================|| MENU ITEMS ||============================== //


const menuItems = (): NavItemTypeObject => {
  const { state: { role } } = useProfile()
  if (role.includes('LIIS')) {
    return {
      items: [
        liismanager,
        profile, forms, elements,
        pages, utilities, support, other]
    }
  } else if (role.includes('ORGA')) {
    return {
      items: [
        organisator
        
      ]
    }
  } else if (role.includes('COLL')) {
    return {
      items: [dashboard,
        profile, forms, elements,
        pages, utilities, support, other]
    }
  } else {
    return {
      items: [dashboard,
        profile, forms, elements,
        pages, utilities, support, other]
    }
  }

};

export default menuItems;
