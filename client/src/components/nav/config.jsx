// component
import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'tutors',
    path: '/tutors',
    icon: icon('ic_user'),
  },
  {
    title: 'packages',
    path: '/packages',
    icon: icon('ic_cart'),
  },
  {
    title: 'students',
    path: '/students',
    icon: icon('ic_blog'),
  },/*
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },*/
];

export default navConfig;
