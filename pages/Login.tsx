import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { LanguageToggle } from '../components/LanguageToggle';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(t('auth.validation.invalidCredentials'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#00154c] py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#001a5c] p-8 rounded-xl shadow-lg">
        <div>
          <img
            className="mx-auto h-16 w-auto"
            src="https://minculture.gov.kg/uploads/logo/logo_64f487b1adc017-72932767-42610797.svg"
            alt={t('common.logo_alt')}
          />
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
            {t('auth.welcome')}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {t('auth.email')}
              </label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="example@mail.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {t('auth.password')}
              </label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full bg-[#0077e0] hover:bg-[#0035a3] text-white"
              disabled={loading}
            >
              {loading ? t('common.loading') : t('auth.login')}
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-[#0077e0] hover:text-[#0035a3] font-medium"
            >
              {t('auth.switchToRegister')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-[#0077e0] hover:text-[#0035a3] font-medium"
            >
              {t('auth.forgotPassword')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}