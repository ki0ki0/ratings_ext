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

class Ratings
{
    private providers: IInformationProvider[] =
        [
            new FSUAInformationProvider()
            , new EXUAInformationProvider()
//            , new FakeInformationProvider()
        ];

    private lookupers: ILookuper[] =
            [
                new ImdbLookuper(),
                new KpLookuper()
            ];

    private databases: IDatabaseInfo[] =
            [
                new ImdbDatabaseInfo(),
                new KpDatabaseInfo()
            ];

    private info: IInformationContainer = null;

    public GetRatings() {
        for (var i = 0; i < this.providers.length; i++) {
            var infoTmp = this.providers[i].GetInfo();
            if (infoTmp != null) {
                this.info = infoTmp;
                break;
            }
        }

        for (var i = 0; i < this.lookupers.length; i++) {
            var _this = this;
            this.lookupers[i].GetId(this.info, function (id) { _this.GetIdCallback(id); });
        }
    }

    private GetIdCallback(id) {
        for (var i = 0; i < this.databases.length; i++) {
            this.databases[i].CreateItemRatingImg(id, this.info.container);
            if (Settings.GetSettings().GetIsShowVoting()) {
                var _this = this;
                this.databases[i].GetUserRating(id, function (rating) { _this.GetUserRatingCallback(rating); });
            }
        }
    }

    private GetUserRatingCallback(rating) {
        console.log(rating);
    }

}