// ==UserScript==
// @name ChristmasTree
// @include http://*
// @include https://*
// @include about:blank
// @require jquery-1.7.2.min.js
// ==/UserScript==

/// <reference path="jquery.d.ts"/> 

function xhr(url: string, object: Object, success: Function, error: Function) {
    var xhr = $.getJSON(url);
    xhr.success(function (data: JSON, textStatus: string, jqXHR: JQueryXHR) {
        success.call(object, data, textStatus, jqXHR);
    });
    xhr.error(function (jqXHR: JQueryXHR, textStatus: string, errorThrown: Object) {
        error.call(object, jqXHR, textStatus, errorThrown);
    });
};