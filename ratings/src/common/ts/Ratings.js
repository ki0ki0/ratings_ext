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
Ratings.GetRatings();

var Ratings = (function () {
    function Ratings() {
    }
    Ratings.GetRatings = function () {
        debug("GetRatings");

        var settings = new Settings(function () {
            var i;
            for (i = 0; i < this.providers.length; i++) {
                this.providers[i].ProcessRatings(settings, this.lookupers);
            }
        });

        debug("GetRatings Done");
    };
    Ratings.providers = [
        new FSUAInformationProvider()
    ];

    Ratings.lookupers = [
        new ImdbLookuper()
    ];
    return Ratings;
})();
