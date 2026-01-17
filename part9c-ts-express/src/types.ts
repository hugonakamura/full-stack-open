import { z } from 'zod';
import { newEntrySchema } from './utils'

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string | undefined;
}

// subset of a type using Pick
// export type NonSensitiveDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>;

// using Omit
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

// export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

// using zod
// infer the type from schema
export type NewDiaryEntry = z.infer<typeof newEntrySchema>;


// it's possible but kinda backwards
// declaring it  explicitly with TypeScript is better
// export interface DiaryEntry extends NewDiaryEntry {
//   id: number;
// }

export enum WeatherEnum {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum VisibilityEnum {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}
