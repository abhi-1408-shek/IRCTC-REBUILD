export interface Station {
  code: string;
  name: string;
  state: string;
  zone: string;
  latitude: number;
  longitude: number;
}

export const stations: Station[] = [
  {
    code: 'NDLS',
    name: 'New Delhi',
    state: 'Delhi',
    zone: 'Northern',
    latitude: 28.6419,
    longitude: 77.2194
  },
  {
    code: 'BCT',
    name: 'Mumbai Central',
    state: 'Maharashtra',
    zone: 'Western',
    latitude: 18.9691,
    longitude: 72.8193
  },
  {
    code: 'MAS',
    name: 'Chennai Central',
    state: 'Tamil Nadu',
    zone: 'Southern',
    latitude: 13.0827,
    longitude: 80.2707
  },
  {
    code: 'HWH',
    name: 'Howrah Junction',
    state: 'West Bengal',
    zone: 'Eastern',
    latitude: 22.5857,
    longitude: 88.3425
  },
  // Add more stations as needed
];
