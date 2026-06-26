import React, { useState } from 'react';
import { Camera, MapPin, Calendar, X, Loader2 } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from '../types';

interface CreateLogFormProps {
  user: User;
  onClose: () => void;
}

export default function CreateLogForm({ user, onClose }: CreateLogFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tripDate, setTripDate] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !tripDate) {
      setError('Please fill in the required fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'travelLogs'), {
        userId: user.uid,
        title,
        description,
        location,
        tripDate,
        photoUrl: photoUrl || null,
        createdAt: Date.now(),
      });
      onClose();
    } catch (err) {
      console.error('Error adding log:', err);
      setError('Failed to save travel log. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A4440]/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-[#E8E4E1] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-[#E8E4E1]">
          <h2 className="text-xl font-serif font-bold text-[#4A4440]">Log New Journey</h2>
          <button onClick={onClose} className="p-2 text-[#8C847E] hover:text-[#C06048] hover:bg-[#F9F7F5] rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[75vh]">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C847E] block">Trip Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sunset in Santorini"
                className="w-full px-4 py-2 bg-[#F9F7F5] border border-[#E8E4E1] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C06048] text-[#4A4440] transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C847E] block">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C847E]">
                    <MapPin size={16} />
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Where did you go?"
                    className="w-full pl-10 pr-4 py-2 bg-[#F9F7F5] border border-[#E8E4E1] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C06048] text-[#4A4440] transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C847E] block">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C847E]">
                    <Calendar size={16} />
                  </div>
                  <input
                    type="date"
                    value={tripDate}
                    onChange={(e) => setTripDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#F9F7F5] border border-[#E8E4E1] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C06048] text-[#4A4440] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C847E] block">Rich Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your story..."
                rows={4}
                className="w-full h-32 px-4 py-2 bg-[#F9F7F5] border border-[#E8E4E1] rounded-xl text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#C06048] text-[#4A4440] transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C847E] block">Photo URL (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C847E]">
                  <Camera size={16} />
                </div>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-10 pr-4 py-2 bg-[#F9F7F5] border border-[#E8E4E1] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C06048] text-[#4A4440] transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-[#E8E4E1]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 font-bold text-sm text-[#8C847E] bg-white border border-[#E8E4E1] rounded-xl hover:bg-[#F9F7F5] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2 font-bold text-sm text-white bg-[#C06048] rounded-xl hover:bg-[#A04E38] active:scale-[0.98] transition-all disabled:opacity-70 flex items-center gap-2 shadow-lg shadow-[#C06048]/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish to Timeline'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
