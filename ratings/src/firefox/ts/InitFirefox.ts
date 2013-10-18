/// <reference path="../../common/ts/common.ts"/>

/// <reference path="Settings/SettingsFirefox.ts"/>
/// <reference path="../../common/ts/Ratings.ts"/>

var settings = new SettingsFirefox(function () {
    new Ratings().GetRatings();
});