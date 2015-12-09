/// <reference path="common.ts"/>

/// <reference path="Settings/Settings.ts"/>
/// <reference path="Ratings.ts"/>

debug("init");

var settings = new Settings(() => {
    new Ratings().getRatings();
});