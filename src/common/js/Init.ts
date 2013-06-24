// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="Settings/Settings.ts"/>
/// <reference path="Ratings.ts"/>

console.log("init");

new Settings(function () {
    new Ratings().GetRatings();
});
