// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="isettings.ts"/> 
/// <reference path="../kango.d.ts"/> 

class KangoStorageSettings implements ISettings {

    private storage = new Object();
    private callback:Function = null;

    constructor(names:string[], callback: Function) {
        var _this = this;

        this.callback = callback;

        for (var i = 0 ; i < names.length; i++){
            this.storage[names[i]] = true;
        }
        if (kango.storage === undefined) {
            kango.invokeAsync("kango.storage.getItem", "options", function (data) { _this.getCallback(data); });
        }
        else {
            var vals = kango.storage.getItem("options");
            this.getCallback(vals);
        }
    }

    private getCallback(data) {
        if (data != null)
        {
            this.storage = data;
        }
        this.callback();
    }

    private save() {
        kango.storage.setItem("options", this.storage);
    }

    Get(name: string):any {
        return this.storage[name];
    }

    Set(name: string, val: any) {
        this.storage[name] = val;
        this.save();
    }
}
