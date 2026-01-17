import { NewDiaryEntry, NonSensitiveDiaryEntry, DiaryEntry } from '../types';
declare const _default: {
    getEntries: () => DiaryEntry[];
    addDiary: (entry: NewDiaryEntry) => DiaryEntry;
    getNonSensitiveEntries: () => NonSensitiveDiaryEntry[];
    findById: (id: number) => DiaryEntry | undefined;
};
export default _default;
//# sourceMappingURL=diaryService.d.ts.map