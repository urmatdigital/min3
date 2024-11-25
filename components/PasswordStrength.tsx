import React from 'react';
import { useTranslation } from 'react-i18next';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { t } = useTranslation();

  const getStrength = (pass: string): 'weak' | 'medium' | 'strong' => {
    if (!pass) return 'weak';
    
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  };

  const strength = getStrength(password);
  const colors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  };

  return (
    <div className="mt-1">
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${colors[strength]}`}
          style={{
            width: strength === 'weak' ? '33.33%' : strength === 'medium' ? '66.66%' : '100%',
          }}
        />
      </div>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {t(`auth.passwordStrength.${strength}`)}
      </p>
    </div>
  );
}