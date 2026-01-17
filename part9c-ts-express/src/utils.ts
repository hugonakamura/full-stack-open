import { NewDiaryEntry, VisibilityEnum, WeatherEnum, Weather, Visibility } from './types';
import { z } from 'zod';

const NewEntrySchema = z.object({
  weather: z.enum(WeatherEnum),
  visibility: z.enum(VisibilityEnum),
  date: z.string().date(),
  comment: z.string().optional()
});

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(object);
};

// without zod
// const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   if (!object || typeof object !== 'object') {
//     throw new Error('Incorrect or missing data');
//   }

//   if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
//     const newEntry: NewDiaryEntry = {
//       weather: z.enum(WeatherEnum).parse(object.weather),
//       visibility: z.enum(VisibilityEnum).parse(object.visibility),
//       date: z.string().date().parse(object.date),
//       comment: z.string().optional().parse(object.comment)
//     };

//     return newEntry;
//   }

//   throw new Error('Incorrect data: some fields are missing');
// };

// export default toNewDiaryEntry;

// without any lib
// const parseComment = (comment: unknown): string => {
//   if (!comment || !isString(comment)) {
//     throw new Error('Incorrect or missing comment');
//   }

//   return comment;
// };

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// with zod
const parseComment = (comment: unknown): string => {
  return z.string().parse(comment);
};


const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(WeatherEnum).map(v => v.toString()).includes(param);
};


const isVisibility = (param: string): param is Visibility => {
  return Object.values(VisibilityEnum).map(v => v.toString()).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility: ' + visibility);
  }
  return visibility;
};