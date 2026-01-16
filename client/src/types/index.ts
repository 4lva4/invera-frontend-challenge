export interface Statics {
  totalUsers: number;
  newUsers: number;
  topUsers: number;
  otherUsers: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'Organic' | 'Social' | 'Direct';
  status: 'New' | 'Top' | 'Other';
  date: string;
}