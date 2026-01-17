"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisibilityEnum = exports.WeatherEnum = void 0;
// it's possible but kinda backwards
// declaring it  explicitly with TypeScript is better
// export interface DiaryEntry extends NewDiaryEntry {
//   id: number;
// }
var WeatherEnum;
(function (WeatherEnum) {
    WeatherEnum["Sunny"] = "sunny";
    WeatherEnum["Rainy"] = "rainy";
    WeatherEnum["Cloudy"] = "cloudy";
    WeatherEnum["Stormy"] = "stormy";
    WeatherEnum["Windy"] = "windy";
})(WeatherEnum || (exports.WeatherEnum = WeatherEnum = {}));
var VisibilityEnum;
(function (VisibilityEnum) {
    VisibilityEnum["Great"] = "great";
    VisibilityEnum["Good"] = "good";
    VisibilityEnum["Ok"] = "ok";
    VisibilityEnum["Poor"] = "poor";
})(VisibilityEnum || (exports.VisibilityEnum = VisibilityEnum = {}));
//# sourceMappingURL=types.js.map