import React from 'react';
import { loginWithGoogle } from '../lib/firebase';
import { Map, PlaneTakeoff } from 'lucide-react';

export default function AuthScreen() {
  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      // Error handled in firebase.ts
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#4A4440] selection:bg-[#C06048] selection:text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm overflow-hidden border border-[#E8E4E1]">
        <div className="bg-[#F9F7F5] p-12 flex flex-col items-center justify-center text-center border-b border-[#E8E4E1]">
          <div className="bg-[#C06048] p-4 rounded-2xl mb-6 shadow-md text-white">
            <PlaneTakeoff size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-[#C06048] mb-2">Chronicle</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C847E]">Your private travel journal</p>
        </div>
        
        <div className="p-10 text-center">
          <p className="text-[#8C847E] text-sm leading-relaxed mb-8">
            Keep track of your adventures, photos, and memories in a beautiful timeline.
          </p>
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-[#E8E4E1] text-[#4A4440] text-sm font-bold py-3 px-6 rounded-xl hover:bg-[#F9F7F5] transition-all active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
