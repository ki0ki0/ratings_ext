/// <reference path="../../common.ts"/>
/// <reference path="../../Interfaces/ISettings.d.ts"/> 
/// <reference path="../../Interfaces/IFilmLookuper.d.ts"/> 
/// <reference path="../../xhr.ts"/>

class KpDatabaseInfo implements IDbFilmInfo {

    private id: string;
    private title: string;
    private titleLocal: string;
    private year: number;
    private rating: number;

    constructor(id: string, title: string, titleLocal: string, year: number, rating: number) {
        this.id = id;
        this.title = title;
        this.titleLocal = titleLocal;
        this.year = year;
        this.rating = rating;
    }

    GetName(): string {
        return this.title;
    }
    GetLocalName(): string {
        return this.titleLocal;
    }
    GetYear(): number {
        return this.year;
    }
    GetRating(): number {
        return this.rating;
    }
    GetInfoUrl(): string {
        return "http://www.kinopoisk.ru/film/" + this.id + "/";
    }
    GetRatingImgSrc(): string {
        return "http://tracker.0day.kiev.ua/kinopoisk/f" + this.id + ".gif";
    }
    GetUserRating(callback: (userRating: number) => void): boolean {
        return null;
    }
    Vote(rating: number, callback: (successful: boolean) => void): boolean {
        return null;
    }

}