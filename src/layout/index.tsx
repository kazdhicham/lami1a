// project import
import LAYOUT, { Props } from 'constant';
import MainLayout from './MainLayout';
import MinimalLayout from './MinimalLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
import GuestGuard from 'utils/route-guard/GuestGuard';
// ==============================|| LAYOUTS - STRUCTURE ||============================== //

export default function Layout({ variant = LAYOUT.main, children, title }: Props) {
  switch (variant) {
    case LAYOUT.minimal:
      return <MinimalLayout title={title}>{children}</MinimalLayout>;

    case LAYOUT.noauth:
      return (
        <GuestGuard>
          <MinimalLayout title={title}>{children}</MinimalLayout>
        </GuestGuard>
      );

    default:
      return (
        <AuthGuard>
          <MainLayout title={title}>{children}</MainLayout>
        </AuthGuard>

      );
  }
}
