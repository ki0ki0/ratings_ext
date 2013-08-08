// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/*
// @include http://www.kinopoisk.ru/film/*
// @all-frames true
// ==/UserScript==


/// <reference path="kango.d.ts"/> 

function xhr(url: string, object: Object, success: Function, error: Function) {
    var details = {
        url: url,
        method: 'GET',
        async: false
    };
    kango.xhr.send(details, (data) => {
        if (data.status == 200 && data.response != null) {
            var text = data.response;
            success.call(object, text);
        }
        else { // something went wrong
            error.call(object, data);
        }
    });
};

function xhrJson(url: string, object: Object, success: Function, error: Function) {
    var details = {
        url: url,
        method: 'GET',
        async: false,
        contentType: 'json'
    };
    kango.xhr.send(details, (data) => {
        if (data.status == 200 && data.response != null) {
            var text = data.response;
            success.call(object, text);
        }
        else { // something went wrong
            error.call(object, data);
        }
    });
};
