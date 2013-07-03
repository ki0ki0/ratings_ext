if (navigator["vendor"].indexOf("Google") != -1) {
    debug("chrome/init");
    new SettingsChrome(function () {
        new Ratings().GetRatings();
    }, null);
} else {
    debug("blink/init");
    new Settings(function () {
        new Ratings().GetRatings();
    });
}
//@ sourceMappingURL=Init.js.map
