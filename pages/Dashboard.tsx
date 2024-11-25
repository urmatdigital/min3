import React from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { LibraryMap } from '../components/dashboard/LibraryMap';
import { RecentEvents } from '../components/dashboard/RecentEvents';
import { Notifications } from '../components/dashboard/Notifications';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  // Запрос статистики
  const { data: statistics } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      // Получаем общее количество библиотек
      const { count: totalLibraries } = await supabase
        .from('libraries')
        .select('*', { count: 'exact' });

      // Получаем общее количество книг
      const { data: bookCollections } = await supabase
        .from('book_collections')
        .select('total_books');
      const totalBooks = bookCollections?.reduce((sum, col) => sum + col.total_books, 0) || 0;

      // Получаем статистику посещений за текущий месяц
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const { data: monthStats } = await supabase
        .from('library_statistics')
        .select('visitors_count, events_held_count')
        .gte('date', startOfMonth.toISOString());

      const totalVisitors = monthStats?.reduce((sum, stat) => sum + stat.visitors_count, 0) || 0;
      const totalEvents = monthStats?.reduce((sum, stat) => sum + stat.events_held_count, 0) || 0;

      return {
        totalLibraries: totalLibraries || 0,
        totalBooks,
        totalVisitors,
        totalEvents,
      };
    },
  });

  // Запрос списка библиотек для карты
  const { data: libraries } = useQuery({
    queryKey: ['libraries'],
    queryFn: async () => {
      const { data } = await supabase
        .from('libraries')
        .select('*');
      return data || [];
    },
  });

  // Запрос последних событий
  const { data: events } = useQuery({
    queryKey: ['recentEvents'],
    queryFn: async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: false })
        .limit(5);
      return data || [];
    },
  });

  // Запрос уведомлений
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      return data || [];
    },
  });

  const handleMarkNotificationAsRead = async (id: string) => {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {t('dashboard.title', 'Панель управления')}
      </h1>

      {/* Статистика */}
      <div className="mb-8">
        {statistics && <DashboardStats statistics={statistics} />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Карта */}
        <div className="lg:col-span-2">
          {libraries && <LibraryMap libraries={libraries} />}
        </div>

        {/* События и уведомления */}
        <div>
          {events && <RecentEvents events={events} />}
        </div>
        <div>
          {notifications && (
            <Notifications
              notifications={notifications}
              onMarkAsRead={handleMarkNotificationAsRead}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;