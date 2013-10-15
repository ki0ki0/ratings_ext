// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="../../common.ts"/>

/// <reference path="../../Interfaces/ISettings.ts"/> 
/// <reference path="../../Interfaces/IFilmLookuper.ts"/> 
/// <reference path="../../xhr.ts"/>

class KpDatabaseInfo implements IDbFilmInfo {

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