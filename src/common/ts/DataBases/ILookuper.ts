interface ILookupInfo {
    titles: string[];
    years: Number[];
}

interface ILookuper {
    GetId(info: ILookupInfo, callback: (any) => void): void;
}
