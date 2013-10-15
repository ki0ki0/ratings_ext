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
var ImdbDatabaseInfo = (function () {
    function ImdbDatabaseInfo() {
    }
    ImdbDatabaseInfo.prototype.GetName = function () {
        return null;
    };
    ImdbDatabaseInfo.prototype.GetLocalName = function () {
        return null;
    };
    ImdbDatabaseInfo.prototype.GetYear = function () {
        return null;
    };
    ImdbDatabaseInfo.prototype.GetRating = function () {
        return null;
    };
    ImdbDatabaseInfo.prototype.GetRatingImgSrc = function () {
        return null;
    };
    ImdbDatabaseInfo.prototype.GetUserRating = function (callback) {
        return null;
    };
    ImdbDatabaseInfo.prototype.Vote = function (rating, callback) {
        return null;
    };
    return ImdbDatabaseInfo;
})();
