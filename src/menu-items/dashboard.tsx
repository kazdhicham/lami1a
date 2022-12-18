// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import { NavItemType } from 'types';

// constant
const icons = {
  IconDashboard,
  IconDeviceAnalytics
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard: NavItemType = {
  id: 'dashboard',
  title: <FormattedMessage id="dashboard" />,
  icon: icons.IconDashboard,
  type: 'group',
  children: [
   {
      id: 'default',
      title: <FormattedMessage id="lami1a" />,
      type: 'item',
      url: '/dashboard/index',
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
