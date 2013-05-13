// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="InformationProviders/FSUAInformationProvider.ts"/>
/// <reference path="InformationProviders/EXUAInformationProvider.ts"/>
///// <reference path="InformationProviders/FakeInformationProvider.ts"/>
/// <reference path="Databases/ILookuper.ts"/>
/// <reference path="Databases/imdb/ImdbLookuper.ts"/>
/// <reference path="Databases/imdb/ImdbDatabaseInfo.ts"/>
/// <reference path="Databases/kinopoisk/KpLookuper.ts"/>
/// <reference path="Databases/kinopoisk/KpDatabaseInfo.ts"/>
/// <reference path="Settings/Settings.ts"/>
var Ratings = (function () {
    function Ratings() {
        this.providers = [
            new FSUAInformationProvider(), 
            new EXUAInformationProvider()
        ];//            , new FakeInformationProvider()
        
        this.lookupers = [
            new ImdbLookuper(), 
            new KpLookuper()
        ];
        this.databases = [
            new ImdbDatabaseInfo(), 
            new KpDatabaseInfo()
        ];
        this.info = null;
    }
    Ratings.prototype.GetRatings = function () {
        for(var i = 0; i < this.providers.length; i++) {
            var infoTmp = this.providers[i].GetInfo();
            if(infoTmp != null) {
                this.info = infoTmp;
                break;
            }
        }
        for(var i = 0; i < this.lookupers.length; i++) {
            var _this = this;
            this.lookupers[i].GetId(this.info, function (id) {
                _this.GetIdCallback(id);
            });
        }
    };
    Ratings.prototype.GetIdCallback = function (id) {
        for(var i = 0; i < this.databases.length; i++) {
            this.databases[i].CreateItemRatingImg(id, this.info.container);
            if(Settings.GetSettings().GetIsShowVoting()) {
                var _this = this;
                this.databases[i].GetUserRating(id, function (rating) {
                    _this.GetUserRatingCallback(rating);
                });
            }
        }
    };
    Ratings.prototype.GetUserRatingCallback = function (rating) {
        console.log(rating);
    };
    return Ratings;
})();
//@ sourceMappingURL=Ratings.js.map
