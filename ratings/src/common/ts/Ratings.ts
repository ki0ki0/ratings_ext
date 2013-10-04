// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="common.ts"/>

/// <reference path="InformationProviders/FSUAInformationProvider.ts"/> 
/// <reference path="Interfaces/IFilmLookuper.ts"/> 
/// <reference path="Databases/imdb/ImdbLookuper.ts"/> 
/// <reference path="Settings/Settings.ts"/>

class Ratings {
    private providers: IInformationSource[] =
        [
            new FSUAInformationProvider(),
            new EXUAInformationProvider()
        ];

    private lookupers: IFilmLookuper[] =
        [
            new ImdbLookuper()
        ];

    public GetRatings(): void {
        debug("Ratings::GetRatings");
        var settings = new Settings(() => this.SettingsCallback(settings));
        debug("Ratings::GetRatings Done");
    }

    private SettingsCallback(settings: ISettings): void {
        debug("Ratings::SettingsCallback");

        for (var i: number = 0; i < this.providers.length; i++) {
            this.providers[i].ProcessRatings(settings, this.lookupers);
        }

        debug("Ratings::SettingsCallback Done");
    }
       
}

new Ratings().GetRatings();