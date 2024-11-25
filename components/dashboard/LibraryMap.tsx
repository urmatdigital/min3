import React from 'react';
import { Library } from '../../types/library';
import { Card, CardContent, CardHeader } from '../ui/card';

interface LibraryMapProps {
  libraries: Library[];
}

export const LibraryMap: React.FC<LibraryMapProps> = ({ libraries }) => {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <h3 className="text-lg font-semibold">Карта библиотек КР</h3>
      </CardHeader>
      <CardContent>
        <div className="h-full w-full">
          {/* Здесь будет интеграция с картой (например, Leaflet или Google Maps) */}
          <div className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Карта библиотек</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
