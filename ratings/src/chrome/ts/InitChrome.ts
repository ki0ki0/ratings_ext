﻿/// <reference path="../../common/ts/common.ts"/>

/// <reference path="Settings/SettingsChrome.ts"/>
/// <reference path="../../common/ts/Ratings.ts"/>

if (navigator["vendor"].indexOf("Google") != -1)
{
    debug("chrome/init");
    var settingsChrome  = new SettingsChrome(function () {
        new Ratings().GetRatings();
    }, null);
}
else {
    debug("blink/init");
    var settings = new Settings(function () {
        new Ratings().GetRatings();
    });
}