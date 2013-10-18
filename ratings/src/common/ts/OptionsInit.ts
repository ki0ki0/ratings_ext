/// <reference path="kango.d.ts"/> 
/// <reference path="Options.ts"/> 

KangoAPI.onReady(
    function () {
        var options = new Options(true);
        options.initOptionsPage();
    }
);