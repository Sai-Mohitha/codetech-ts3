export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface TravelLog {
  id: string;
  userId: string;
  title: string;
  description: string;
  location: string;
  tripDate: string; // ISO format or YYYY-MM-DD
  photoUrl?: string | null;
  createdAt: number;
}
