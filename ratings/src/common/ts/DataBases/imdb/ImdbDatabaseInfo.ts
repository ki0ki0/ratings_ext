/// <reference path="../../common.ts"/>
/// <reference path="../../Interfaces/ISettings.d.ts"/> 
/// <reference path="../../Interfaces/IFilmLookuper.d.ts"/> 
/// <reference path="../../xhr.ts"/>

class ImdbDatabaseInfo implements IDbFilmInfo {

    private id: string;
    private title: string;
    private year: number;

    constructor(id: string, title: string, year: number) {
        this.id = id;
        this.title = title;
        this.year = year;
    }

    GetName(): string {
        return this.title;
    }
    GetLocalName(): string {
        return this.title;
    }
    GetYear(): number {
        return this.year;
    }
    GetRating(): number {
        return null;
    }
    GetInfoUrl(): string {
        return "http://www.imdb.com/title/" + this.id + "/";
    }
    GetRatingImgSrc(): string {
        return "http://tracker.0day.kiev.ua/imdb/imdb_" + this.id + ".gif";
    }
    GetUserRating(callback: (userRating: number) => void): boolean {
        return null;
    }
    Vote(rating: number, callback: (successful: boolean) => void): boolean {
        return null;
    }

}