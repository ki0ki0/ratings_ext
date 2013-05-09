// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="isettings.ts"/> 

class LocalStorageSettings implements ISettings {
    Get(name: string):any {
        return localStorage[name];
    }

    Set(name: string, val: any) {
        localStorage[name] = val;
    }
}
