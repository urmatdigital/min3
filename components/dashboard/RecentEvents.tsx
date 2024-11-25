import React from 'react';
import { Event } from '../../types/library';
import { Card, CardContent, CardHeader } from '../ui/card';
import { format } from 'date-fns';

interface RecentEventsProps {
  events: Event[];
}

export const RecentEvents: React.FC<RecentEventsProps> = ({ events }) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Последние мероприятия</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="min-w-[100px]">
                <div className="text-sm text-gray-500">
                  {format(new Date(event.start_date), 'dd.MM.yyyy')}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">{event.title}</h4>
                {event.description && (
                  <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                )}
                <div className="flex items-center mt-2">
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${event.status === 'planned' && 'bg-blue-100 text-blue-800'}
                    ${event.status === 'ongoing' && 'bg-green-100 text-green-800'}
                    ${event.status === 'completed' && 'bg-gray-100 text-gray-800'}
                    ${event.status === 'cancelled' && 'bg-red-100 text-red-800'}
                  `}>
                    {event.status === 'planned' && 'Запланировано'}
                    {event.status === 'ongoing' && 'В процессе'}
                    {event.status === 'completed' && 'Завершено'}
                    {event.status === 'cancelled' && 'Отменено'}
                  </span>
                  {event.participants_count && (
                    <span className="ml-2 text-sm text-gray-500">
                      {event.participants_count} участников
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
