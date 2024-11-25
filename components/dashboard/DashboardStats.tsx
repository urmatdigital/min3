import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { LibraryStatistics } from '../../types/library';

interface DashboardStatsProps {
  statistics: {
    totalLibraries: number;
    totalBooks: number;
    totalVisitors: number;
    totalEvents: number;
  };
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ statistics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-sm font-medium">Всего библиотек</h3>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalLibraries}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-sm font-medium">Общий книжный фонд</h3>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalBooks}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-sm font-medium">Посетители за месяц</h3>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalVisitors}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-sm font-medium">Мероприятия за месяц</h3>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalEvents}</div>
        </CardContent>
      </Card>
    </div>
  );
};
