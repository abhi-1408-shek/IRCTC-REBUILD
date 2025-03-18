export interface Station {
  code: string;
  name: string;
}

export interface Train {
  id: number;
  number: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: number;
  classes: TrainClass[];
  intermediate: IntermediateStation[];
}

export interface TrainClass {
  type: string;
  fare: number;
  available: number;
}

export interface IntermediateStation {
  station: string;
  arrival: string;
  departure: string;
}

export interface DatePickerProps {
  date?: Date;
  setDate: (date: Date | undefined) => void;
}
