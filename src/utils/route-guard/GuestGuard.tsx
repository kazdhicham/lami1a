import { useEffect } from 'react';
import { useRouter } from 'next/router';

// project imports
import useProfile from '@/store/hooks/useProfile';
import { DASHBOARD_PATH } from 'config';
import { GuardProps } from 'types';
import Loader from '@/components/ui-component/Loader';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
  const { state: { isLoggedIn } } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push(DASHBOARD_PATH);
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  if (isLoggedIn) return <Loader />;

  return children;
};

export default GuestGuard;
