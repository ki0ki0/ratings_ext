interface IFilmInfo {
    GetTitles(): string[];
    GetYears(): number[];
}

interface IDbFilmInfo {
    GetName(): string;
    GetLocalName(): string;
    GetYear(): number;
    GetRating(): number;
    GetRatingImgSrc(): string;
    GetUserRating(callback: (userRating: number) => void): boolean;
    Vote(rating: number, callback: (successful: boolean) => void): boolean;
}

interface IFilmLookuper {
    GetId(settings: ISettings, info: IFilmInfo, callback: (dbInfo: IDbFilmInfo) => void): void;
}
