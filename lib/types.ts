export interface ClassItem {
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  room: string;
}

export interface Day {
  name: string;
  classes: ClassItem[];
}
