import React from 'react';
import { format, parseISO } from 'date-fns';
import { MapPin, Calendar, Image as ImageIcon } from 'lucide-react';
import { TravelLog } from '../types';

interface TimelineProps {
  logs: TravelLog[];
  loading: boolean;
}

export default function Timeline({ logs, loading }: TimelineProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-[#E8E4E1] border-t-[#C06048] rounded-full animate-spin mb-4"></div>
          <p className="text-[#8C847E] font-medium text-sm">Loading your memories...</p>
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E4E1] shadow-sm max-w-2xl mx-auto mt-12">
        <div className="w-20 h-20 bg-[#C06048]/10 text-[#C06048] rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin size={32} />
        </div>
        <h3 className="text-2xl font-serif font-bold text-[#4A4440] mb-3">No adventures yet</h3>
        <p className="text-[#8C847E] text-sm mb-8">
          Your travel journal is empty. Start documenting your trips to build your beautiful timeline.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto relative pt-8 pb-20">
      {/* Timeline spine */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#E8E4E1] -translate-x-1/2 hidden md:block"></div>

      <div className="space-y-12">
        {logs.map((log, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={log.id} className="relative flex flex-col md:flex-row items-center md:justify-between w-full">
              
              {/* Center Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-[#C06048] border-4 border-[#FDFCFB] shadow-sm -translate-x-1/2 z-10 hidden md:block"></div>

              {/* Card container */}
              <div className={`w-full md:w-[calc(50%-2.5rem)] ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E8E4E1] group flex flex-col">
                  
                  {log.photoUrl ? (
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={log.photoUrl} 
                        alt={log.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/90 mb-1">{log.location}</p>
                        <p className="text-sm opacity-90">{format(parseISO(log.tripDate), 'MMMM d, yyyy')}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-[#DCCBB5] flex flex-col items-center justify-center text-white/50 relative">
                       <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                       <ImageIcon size={48} strokeWidth={1} className="z-10" />
                       <div className="absolute bottom-4 left-4 text-white z-10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/90 mb-1">{log.location}</p>
                        <p className="text-sm opacity-90">{format(parseISO(log.tripDate), 'MMMM d, yyyy')}</p>
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1">
                    <h3 className="text-lg font-serif font-bold text-[#4A4440] mb-2">{log.title}</h3>
                    {log.description && (
                      <p className="text-xs leading-relaxed text-[#8C847E] line-clamp-3">
                        {log.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
