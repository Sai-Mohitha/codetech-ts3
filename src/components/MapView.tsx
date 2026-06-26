import React from 'react';
import { MapPin } from 'lucide-react';
import { TravelLog } from '../types';

interface MapViewProps {
  logs: TravelLog[];
}

export default function MapView({ logs }: MapViewProps) {
  // Extract unique locations
  const uniqueLocations = Array.from(new Set(logs.map(log => log.location))).filter(Boolean);

  return (
    <div className="h-[600px] w-full bg-[#F9F7F5] rounded-3xl border border-[#E8E4E1] overflow-hidden relative flex flex-col">
      <div className="p-6 bg-white border-b border-[#E8E4E1] flex items-center justify-between z-10">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#4A4440] mb-1">Travel Map</h2>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C847E]">{uniqueLocations.length} locations visited</p>
        </div>
      </div>
      
      {/* Decorative SVG Map Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-center justify-center overflow-hidden">
        <svg width="200%" height="200%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,500 Q200,400 300,500 T500,500 T700,500 T900,500" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
          <path d="M200,200 Q300,300 200,400 T200,600 T200,800" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
          <path d="M800,200 Q700,300 800,400 T800,600 T800,800" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
        </svg>
      </div>

      <div className="flex-1 p-8 overflow-y-auto z-10 relative">
        {uniqueLocations.length === 0 ? (
          <div className="flex h-full items-center justify-center text-[#8C847E] text-sm">
            No locations to display yet
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {uniqueLocations.map((location, idx) => {
              const logsInLocation = logs.filter(l => l.location === location);
              return (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E8E4E1] shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 cursor-default group">
                  <div className="bg-[#F9F7F5] border border-[#E8E4E1] text-[#C06048] p-3 rounded-full shrink-0 group-hover:scale-110 group-hover:bg-[#C06048] group-hover:text-white group-hover:border-[#C06048] transition-all">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#4A4440] mb-1">{location}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C847E]">{logsInLocation.length} {logsInLocation.length === 1 ? 'trip' : 'trips'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
