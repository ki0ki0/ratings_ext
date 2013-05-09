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


var providers : IInformationProvider[] = 
        [
            new FSUAInformationProvider()
            , new EXUAInformationProvider()
//            , new FakeInformationProvider()
        ];

var info: IInformationContainer = null;

for (var i = 0; i < providers.length; i++) {
    var infoTmp = providers[i].GetInfo();
    if (infoTmp != null) {
        info = infoTmp;
        break;
    }
}

var lookupers: ILookuper[] =
        [
            new ImdbLookuper(),
            new KpLookuper()
        ];

var databases: IDatabaseInfo[] =
        [
            new ImdbDatabaseInfo(),
            new KpDatabaseInfo()
        ];


for (var i = 0; i < lookupers.length; i++) {
    lookupers[i].GetId(info, GetIdCallback);
}

function GetIdCallback(id) {
    for (var i = 0; i < databases.length; i++) {
        databases[i].CreateItemRatingImg(id, info.container);
    }
}
