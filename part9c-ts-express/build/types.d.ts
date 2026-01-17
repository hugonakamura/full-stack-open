import { z } from 'zod';
import { newEntrySchema } from './utils';
export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor';
export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string | undefined;
}
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
export type NewDiaryEntry = z.infer<typeof newEntrySchema>;
export declare enum WeatherEnum {
    Sunny = "sunny",
    Rainy = "rainy",
    Cloudy = "cloudy",
    Stormy = "stormy",
    Windy = "windy"
}
export declare enum VisibilityEnum {
    Great = "great",
    Good = "good",
    Ok = "ok",
    Poor = "poor"
}
//# sourceMappingURL=types.d.ts.map