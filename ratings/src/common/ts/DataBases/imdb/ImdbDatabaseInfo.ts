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

class ImdbDatabaseInfo implements IDbFilmInfo {

    private id: string;
    private title: string;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }

    GetName(): string {
        return this.title;
    }
    GetLocalName(): string {
        return this.title;
    }
    GetYear(): number {
        return null;
    }
    GetRating(): number {
        return null;
    }
    GetRatingImgSrc(): string {
        return null;
    }
    GetUserRating(callback: (userRating: number) => void): boolean {
        return null;
    }
    Vote(rating: number, callback: (successful: boolean) => void): boolean {
        return null;
    }

}
