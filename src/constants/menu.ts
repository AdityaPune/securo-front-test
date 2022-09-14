import DashboardLight from '../assets/images/menus/light/dashboard.svg';
import InvestLight from '../assets/images/menus/light/invest.svg';
import WalletLight from '../assets/images/menus/light/wallet.svg';
import AccountLight from '../assets/images/menus/light/account.svg';
import TransactionLight from '../assets/images/menus/light/transaction.svg';

import DashboardDark from '../assets/images/menus/dark/dashboard.svg';
import InvestDark from '../assets/images/menus/dark/invest.svg';
import WalletDark from '../assets/images/menus/dark/wallet.svg';
import AccountDark from '../assets/images/menus/dark/account.svg';
import TransactionDark from '../assets/images/menus/dark/transaction.svg';

export interface IMenuItem {
  label: string;
  path: string[];
  headerLabel: string;
  lightIcon?: any; // Icon for light theme
  darkIcon?: any; //Icon for dark theme
  disableFromSidebar?: boolean;
}

const menu: IMenuItem[] = [
  {
    label: 'Dashboard',
    path: ['/dashboard'],
    headerLabel: 'Dashboard',
    lightIcon: DashboardLight,
    darkIcon: DashboardDark,
  },
  {
    label: 'Invest',
    path: ['/invest', '/invest/LCI', '/invest/MWI', '/invest/BNI'],
    headerLabel: 'Investment Strategies',
    lightIcon: InvestLight,
    darkIcon: InvestDark,
  },
  // { label: "Wallet", path: "/", lightIcon: WalletLight, darkIcon: WalletDark },
  {
    label: 'My Portfolio',
    path: ['/portfolio-performance'],
    headerLabel: 'My Portfolio',
    lightIcon: AccountLight,
    darkIcon: AccountDark,
  },
  {
    label: 'Transaction History',
    path: ['/transaction-history'],
    headerLabel: 'Transaction History',
    lightIcon: TransactionLight,
    darkIcon: TransactionDark,
  },
  {
    label: 'My Account',
    path: ['/my-account'],
    headerLabel: 'My Account',
    lightIcon: AccountLight,
    darkIcon: AccountDark,
    disableFromSidebar: true,
  },
  {
    label: '',
    path: ['/reset-password'],
    headerLabel: '',
    lightIcon: '',
    darkIcon: '',
    disableFromSidebar: true,
  },
  {
    label: '',
    path: ['/verify'],
    headerLabel: '',
    lightIcon: '',
    darkIcon: '',
    disableFromSidebar: true,
  },
  {
    label: 'Settings',
    path: ['/settings'],
    headerLabel: 'Settings',
    lightIcon: '',
    darkIcon: '',
    disableFromSidebar: true,
  },
];

export default menu;
