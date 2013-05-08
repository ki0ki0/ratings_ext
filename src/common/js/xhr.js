// ==UserScript==
// @name ChristmasTree
// @include http://*
// @include https://*
// @include about:blank
// @require jquery-1.7.2.min.js
// ==/UserScript==
/// <reference path="jquery.d.ts"/>
function xhr(url, object, success, error) {
    var xhr = $.getJSON(url);
    xhr.success(function (data, textStatus, jqXHR) {
        success.call(object, data, textStatus, jqXHR);
    });
    xhr.error(function (jqXHR, textStatus, errorThrown) {
        error.call(object, jqXHR, textStatus, errorThrown);
    });
}
;
//@ sourceMappingURL=xhr.js.map
