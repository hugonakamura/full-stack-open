export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

// subset of a type using Pick
// export type NonSensitiveDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>;

// using Omit
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
