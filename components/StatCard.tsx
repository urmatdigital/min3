import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="stat-card p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}
              </div>
              {trend && (
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    trendUp
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {trend}
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default StatCard;