export const MOCK_STATIONS = [
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'BCT', name: 'Mumbai Central' },
  { code: 'HWH', name: 'Howrah' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'BZA', name: 'Vijayawada' },
  { code: 'SBC', name: 'Bengaluru' },
  { code: 'ADI', name: 'Ahmedabad' },
  { code: 'PNBE', name: 'Patna' },
  { code: 'BSP', name: 'Bilaspur' },
  { code: 'GHY', name: 'Guwahati' }
];

export const MOCK_TRAINS = [
  {
    id: 1,
    number: '12301',
    name: 'Rajdhani Express',
    from: 'NDLS',
    to: 'HWH',
    departureTime: '16:50',
    arrivalTime: '10:00',
    duration: '17:10',
    distance: 1451,
    classes: [
      { type: '1A', fare: 4500, available: 10 },
      { type: '2A', fare: 2700, available: 45 },
      { type: '3A', fare: 1900, available: 65 }
    ],
    intermediate: [
      { station: 'CNB', arrival: '22:05', departure: '22:15' },
      { station: 'PRYJ', arrival: '01:12', departure: '01:22' },
      { station: 'DDU', arrival: '03:55', departure: '04:00' }
    ]
  }
];

export const CLASS_TYPES = [
  { value: '1A', label: 'First AC' },
  { value: '2A', label: 'Second AC' },
  { value: '3A', label: 'Third AC' },
  { value: 'SL', label: 'Sleeper' },
  { value: '2S', label: 'Second Sitting' }
];

export const THEME_COLORS = {
  primary: {
    light: '#3B82F6',
    dark: '#60A5FA'
  },
  secondary: {
    light: '#F97316',
    dark: '#FB923C'
  }
};

export const ANIMATION_CONFIG = {
  spring: {
    stiff: { type: 'spring', stiffness: 300, damping: 30 },
    soft: { type: 'spring', stiffness: 50, damping: 20 },
    bounce: { type: 'spring', stiffness: 200, damping: 10 }
  },
  transition: {
    fast: { duration: 0.2 },
    normal: { duration: 0.3 },
    slow: { duration: 0.5 }
  }
};
