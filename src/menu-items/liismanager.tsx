// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  IconApps, IconUserCheck, IconBasket, IconMessages, IconLayoutKanban,
  IconMail, IconCalendar, IconNfc, IconUser
} from '@tabler/icons';
import { NavItemType } from 'types';

// constant
const icons = {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc, IconUser
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const liismanager: NavItemType = {
  id: 'profile',
  title: <FormattedMessage id="profile" />,
  icon: icons.IconUser,
  type: 'group',
  children: [
    {
      id: 'profiles',
      title: <FormattedMessage id="profiles" />,
      type: 'collapse',
      icon: icons.IconUserCheck,
      children: [
        {
          id: 'siblings',
          title: <FormattedMessage id="siblings" />,
          type: 'collapse',
          url: '/profile/card/siblings'
        },
        {
          id: 'setting',
          title: <FormattedMessage id="setting" />,
          type: 'collapse',
          url: '/profile/setting/index'
        },

      ]
    },
    {
      id: 'connexions',
      title: <FormattedMessage id="connexions" />,
      type: 'collapse',
      children: [
        {
          id: 'collaborators',
          title: <FormattedMessage id="collaborators" />,
          type: 'item',
          url: '/profile/card/collaborators'
        },
        {
          id: 'studs',
          title: <FormattedMessage id="studs" />,
          type: 'item',
          url: '/profile/card/studs'
        },
        {
          id: 'oragnisators',
          title: <FormattedMessage id="organisators" />,
          type: 'item',
          url: '/profile/card/organisators'
        },
        {
          id: 'oragnisators',
          title: <FormattedMessage id="organisators" />,
          type: 'item',
          url: '/profile/card/organisators'
        },
        {
          id: 'discounts',
          title: <FormattedMessage id="discounts" />,
          type: 'item',
          url: '/profile/card/discounts'
        },
      ]
    },
  ]

};

export default liismanager;
