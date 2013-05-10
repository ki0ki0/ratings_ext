// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="kango.d.ts"/> 
/// <reference path="Options.ts"/> 

var options = new Options();
KangoAPI.onReady(function () { options.initOptionsPage(); });