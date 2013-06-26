// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// @all-frames true
// ==/UserScript==

var isDebug = false;

function debug(a) {
    if (isDebug)
    {
        console.log(a);
    }
}