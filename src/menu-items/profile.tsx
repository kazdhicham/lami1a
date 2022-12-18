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

const profile: NavItemType = {
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
          url: '/profile/siblings'
        },
        {
          id: 'setting',
          title: <FormattedMessage id="setting" />,
          type: 'collapse',

          url: '/profile/setting/profile1'
        },
        /* {
          id: 'setting-profile2',
          title: (
            <>
              <FormattedMessage id="profile" /> 02
            </>
          ),
          type: 'item',
          url: '/profile/setting/profile2'
        },
        {
          id: 'setting-profile3',
          title: (
            <>
              <FormattedMessage id="profile" /> 03
            </>
          ),
          type: 'item',
          url: '/profile/setting/profile3'
        } */
      ]
    },
    {
      id: 'profiles-card',
      title: <FormattedMessage id="profile cards" />,
      type: 'collapse',
      children: [
        {
          id: 'liismanager',
          title: (
            <>
              <FormattedMessage id="style" /> liismanager
            </>
          ),
          type: 'item',
          url: '/profile/card/card1'
        },
        {
          id: 'studs',
          title: (
            <>
              <FormattedMessage id="style" /> studs
            </>
          ),
          type: 'item',
          url: '/profile/card/card1'
        },
        {
          id: 'collaborators',
          title: (
            <>
              <FormattedMessage id="style" /> collaborators
            </>
          ),
          type: 'item',
          url: '/profile/card/card1'
        },
        {
          id: 'organisators',
          title: (
            <>
              <FormattedMessage id="style" /> organisators
            </>
          ),
          type: 'item',
          url: '/profile/card/card1'
        },
        {
          id: 'affiliate',
          title: (
            <>
              <FormattedMessage id="style" /> affiliate
            </>
          ),
          type: 'item',
          url: '/profile/card/card1'
        },
      ]
    },
    {
      id: 'affiliate-list',
      title: <FormattedMessage id="affiliate-list" />,
      type: 'collapse',
      children: [
        {
          id: '',
          title: (
            <>
              <FormattedMessage id="style" /> affiliate
            </>
          ),
          type: 'item',
          url: '/profile/list/list1'
        },
        {
          id: 'studs-list',
          title: (
            <>
              <FormattedMessage id="style" /> studs list
            </>
          ),
          type: 'item',
          url: '/profile/list/list2'
        }
      ]
    }
  ]
},
  {
    id: 'customer',
    title: <FormattedMessage id="customer" />,
      type: 'collapse',
        icon: icons.IconBasket,
          children: [
            {
              id: 'customer-list',
              title: <FormattedMessage id="customer-list" />,
              type: 'item',
              url: '/app/customer/customer-list',
              breadcrumbs: false
            },
            {
              id: 'order-list',
              title: <FormattedMessage id="order-list" />,
              type: 'item',
              url: '/app/customer/order-list',
              breadcrumbs: false
            },
            {
              id: 'create-invoice',
              title: <FormattedMessage id="create-invoice" />,
              type: 'item',
              url: '/app/customer/create-invoice',
              breadcrumbs: false
            },
            {
              id: 'order-details',
              title: <FormattedMessage id="order-details" />,
              type: 'item',
              url: '/app/customer/order-details'
            },
            {
              id: 'product',
              title: <FormattedMessage id="product" />,
              type: 'item',
              url: '/app/customer/product',
              breadcrumbs: false
            },
            {
              id: 'product-review',
              title: <FormattedMessage id="product-review" />,
              type: 'item',
              url: '/app/customer/product-review',
              breadcrumbs: false
            }
          ]
    },
{
  id: 'chat',
    title: <FormattedMessage id="chat" />,
      type: 'item',
        icon: icons.IconMessages,
          url: '/app/chat'
},
{
  id: 'kanban',
    title: 'Kanban',
      type: 'item',
        icon: icons.IconLayoutKanban,
          url: '/app/kanban/board'
},
{
  id: 'mail',
    title: <FormattedMessage id="mail" />,
      type: 'item',
        icon: icons.IconMail,
          url: '/app/mail'
},
{
  id: 'calendar',
    title: <FormattedMessage id="calendar" />,
      type: 'item',
        url: '/app/calendar',
          icon: icons.IconCalendar,
            breadcrumbs: false
},
{
  id: 'contact',
    title: <FormattedMessage id="contact" />,
      type: 'collapse',
        icon: icons.IconNfc,
          children: [
            {
              id: 'c-card',
              title: <FormattedMessage id="cards" />,
              type: 'item',
              url: '/app/contact/c-card',
              breadcrumbs: false
            },
            {
              id: 'c-list',
              title: <FormattedMessage id="list" />,
              type: 'item',
              url: '/app/contact/c-list',
              breadcrumbs: false
            }
          ]
},
{
  id: 'e-commerce',
    title: <FormattedMessage id="e-commerce" />,
      type: 'collapse',
        icon: icons.IconBasket,
          children: [
            {
              id: 'products',
              title: <FormattedMessage id="products" />,
              type: 'item',
              url: '/app/e-commerce/products'
            },
            {
              id: 'product-details',
              title: <FormattedMessage id="product-details" />,
              type: 'item',
              url: '/app/e-commerce/product-details/1',
              breadcrumbs: false
            },
            {
              id: 'product-list',
              title: <FormattedMessage id="product-list" />,
              type: 'item',
              url: '/app/e-commerce/product-list',
              breadcrumbs: false
            },
            {
              id: 'checkout',
              title: <FormattedMessage id="checkout" />,
              type: 'item',
              url: '/app/e-commerce/checkout'
            }
          ]
}
  ]
};

export default profile;
