/// <reference path="../../common/ts/kango.d.ts"/> 
/// <reference path="OptionsFirefox.ts"/> 

KangoAPI.onReady(function () {
    var options = new OptionsFirefox();
    options.initOptionsPage();
});