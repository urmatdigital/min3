import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  BookMarked,
  LogOut
} from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { useTranslation } from 'react-i18next';

function Layout() {
  const { logout } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  const navigation = [
    { name: t('navigation.dashboard'), href: '/', icon: BarChart3 },
    { name: t('navigation.catalog'), href: '/catalog', icon: BookOpen },
    { name: t('navigation.users'), href: '/users', icon: Users },
    { name: t('navigation.documents'), href: '/documents', icon: FileText },
    { name: t('navigation.loans'), href: '/loans', icon: BookMarked },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-[#0035a3] text-white">
              <div className="flex items-center flex-shrink-0 px-4 mb-8">
                <img
                  src="https://minculture.gov.kg/uploads/logo/logo_64f487b1adc017-72932767-42610797.svg"
                  alt={t('common.logo_alt')}
                  className="h-12 w-auto"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <nav className="flex-1 px-2 pb-4 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-white/10 p-4">
                <button
                  onClick={logout}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium text-white/70 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  {t('common.logout')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top bar */}
          <header className="relative z-10 flex-shrink-0 h-16 bg-white dark:bg-[#00154c] border-b dark:border-white/10">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center flex-1">
                {/* Mobile menu button */}
                <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10">
                  <span className="sr-only">{t('common.open_menu')}</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                {/* System title */}
                <h1 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">
                  {t('common.system_title')}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <LanguageToggle />
                <div className="h-6 w-px bg-gray-200 dark:bg-white/10" />
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50 dark:bg-[#00154c]">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;