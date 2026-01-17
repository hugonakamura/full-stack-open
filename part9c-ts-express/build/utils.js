"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewDiaryEntry = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
const NewEntrySchema = zod_1.z.object({
    weather: zod_1.z.enum(types_1.WeatherEnum),
    visibility: zod_1.z.enum(types_1.VisibilityEnum),
    date: zod_1.z.string().date(),
    comment: zod_1.z.string().optional()
});
const toNewDiaryEntry = (object) => {
    return NewEntrySchema.parse(object);
};
exports.toNewDiaryEntry = toNewDiaryEntry;
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
const parseComment = (comment) => {
    return zod_1.z.string().parse(comment);
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseWeather = (weather) => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};
const isWeather = (param) => {
    return Object.values(types_1.WeatherEnum).map(v => v.toString()).includes(param);
};
const isVisibility = (param) => {
    return Object.values(types_1.VisibilityEnum).map(v => v.toString()).includes(param);
};
const parseVisibility = (visibility) => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};
//# sourceMappingURL=utils.js.map