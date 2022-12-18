import { useRouter } from 'next/router';
// project imports
import useProfile from '@/store/hooks/useProfile';
import { GuardProps } from 'types';
import { useEffect } from 'react';
import Loader from '@/components/ui-component/Loader';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
  const { state: { email } } = useProfile();
  console.log({ email })
  const router = useRouter();
  useEffect(() => {
    if (email === '') {
      router.push('/login');
    }
    // eslint-disable-next-line
  }, [email]);

  if (email === '') return <Loader />;

  return children;
};

export default AuthGuard;
