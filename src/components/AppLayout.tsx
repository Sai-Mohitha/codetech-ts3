import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, getDocs, addDoc } from 'firebase/firestore';
import { LogOut, Plus, Map as MapIcon, Image as ImageIcon, Filter, Search } from 'lucide-react';
import { db, logout } from '../lib/firebase';
import { User, TravelLog } from '../types';
import Timeline from './Timeline';
import MapView from './MapView';
import CreateLogForm from './CreateLogForm';

interface AppLayoutProps {
  user: User;
}

export default function AppLayout({ user }: AppLayoutProps) {
  const [logs, setLogs] = useState<TravelLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [view, setView] = useState<'timeline' | 'map'>('timeline');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const seedData = async () => {
      if (localStorage.getItem(`seeded_${user.uid}`)) return;
      
      const q = query(collection(db, 'travelLogs'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        localStorage.setItem(`seeded_${user.uid}`, 'true');
        
        const sampleLogs = [
          {
            userId: user.uid,
            title: 'The Lemon Groves of Positano',
            description: 'Waking up to the scent of citrus and the sound of waves. We spent three days hiking the Path of the Gods before descending into the turquoise waters for a sunset swim...',
            location: 'Amalfi Coast, Italy',
            tripDate: '2023-08-15',
            photoUrl: 'https://images.unsplash.com/photo-1533682806253-85f9e71ec26d?q=80&w=1000&auto=format&fit=crop',
            createdAt: Date.now() - 100000
          },
          {
            userId: user.uid,
            title: 'Autumn Gold in Gion',
            description: 'The maples are just beginning to turn. Early morning visits to the Fushimi Inari Shrine offered a quiet meditation before the crowds arrived. Tea ceremonies in Arashiyama were peaceful.',
            location: 'Kyoto, Japan',
            tripDate: '2023-10-05',
            photoUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
            createdAt: Date.now() - 50000
          },
          {
            userId: user.uid,
            title: 'Alpine Magic in Banff',
            description: 'Lake Louise was frozen solid, reflecting the snow-capped peaks like a mirror. The crisp mountain air and the scale of the Rockies made everything else feel small.',
            location: 'Banff, Canada',
            tripDate: '2023-12-15',
            photoUrl: 'https://images.unsplash.com/photo-1603706175727-464a938cde99?q=80&w=1000&auto=format&fit=crop',
            createdAt: Date.now() - 25000
          },
          {
            userId: user.uid,
            title: 'Red Rock Serenity',
            description: 'The vortexes are real. Hiking Cathedral Rock at dawn provided a perspective of the desert I never expected. The silence here is heavy and healing...',
            location: 'Sedona, USA',
            tripDate: '2024-01-08',
            photoUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop',
            createdAt: Date.now() - 10000
          }
        ];
        
        for (const log of sampleLogs) {
          await addDoc(collection(db, 'travelLogs'), log);
        }
      } else {
        localStorage.setItem(`seeded_${user.uid}`, 'true');
      }
    };

    seedData();

    // Fetch logs from Firestore
    const q = query(
      collection(db, 'travelLogs'),
      where('userId', '==', user.uid),
      orderBy('tripDate', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData: TravelLog[] = [];
      snapshot.forEach((doc) => {
        logsData.push({ id: doc.id, ...doc.data() } as TravelLog);
      });
      setLogs(logsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching logs:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const filteredLogs = logs.filter(log => {
    const q = searchQuery.toLowerCase();
    return log.title.toLowerCase().includes(q) || 
           log.location.toLowerCase().includes(q) ||
           log.description?.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#4A4440] font-sans selection:bg-[#C06048] selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E4E1] sticky top-0 z-40 px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-[#C06048]">
            <MapIcon size={24} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-tight text-[#C06048] hidden sm:block">Chronicle</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-[#C06048] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#A04E38] transition-colors active:scale-95"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Log</span>
          </button>
          
          <div className="h-6 w-px bg-[#E8E4E1] mx-2"></div>
          
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-[#D2691E]/20" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#E8E4E1] text-[#4A4440] flex items-center justify-center font-bold text-sm border border-[#D2691E]/20">
                {user.displayName?.[0] || user.email?.[0] || 'U'}
              </div>
            )}
            <button
              onClick={() => logout()}
              className="p-1.5 text-[#8C847E] hover:text-[#C06048] hover:bg-[#F9F7F5] rounded-full transition-colors"
              title="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
          
          <div className="bg-[#F9F7F5] rounded-xl border border-[#E8E4E1] p-1 flex w-full sm:w-auto">
            <button
              onClick={() => setView('timeline')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${view === 'timeline' ? 'bg-[#C06048] text-white shadow-sm' : 'text-[#8C847E] hover:text-[#C06048]'}`}
            >
              <ImageIcon size={16} />
              Gallery
            </button>
            <button
              onClick={() => setView('map')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${view === 'map' ? 'bg-[#C06048] text-white shadow-sm' : 'text-[#8C847E] hover:text-[#C06048]'}`}
            >
              <MapIcon size={16} />
              Map View
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C847E]">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories, locations..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F9F7F5] border border-[#E8E4E1] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C06048] text-[#4A4440] transition-all"
            />
          </div>
        </div>

        {/* View Content */}
        <div className="min-h-[500px]">
          {view === 'timeline' ? (
            <Timeline logs={filteredLogs} loading={loading} />
          ) : (
            <MapView logs={filteredLogs} />
          )}
        </div>
      </main>

      {/* Modals */}
      {isCreating && (
        <CreateLogForm user={user} onClose={() => setIsCreating(false)} />
      )}
    </div>
  );
}
