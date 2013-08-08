// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="../Chrome.d.ts"/> 
/// <reference path="LocalStorageSettings.ts"/> 

class ChromeStorageSettings implements ISettings {
    public Names: string[];
    private Values: any[];
    private storage: ChromeStorage;
    private callback: Function;
    private obj: Object;

    constructor (isSync: boolean, names : string[], vals: any[], callback: Function, obj: Object) {
        this.Names = names;
        this.Values = new Array();
        for (var i in this.Names) {
            this.Values[i] = vals[i];
        }
        if (isSync)
            this.storage = chrome.storage.sync;
        else
            this.storage = chrome.storage.local;
        this.callback = callback;
        this.obj = obj;
        this.storage.get(names, (val) => { this.getCallback(val); });
    }

    private getCallback (val) {
        for (var i in this.Names) {
            this.Values[i] = val[this.Names[i]];
        }
        if (this.callback) {
            if (this.obj == null)
                this.callback();
            else
                this.callback.call(this.obj);
        }
    }

    private save() {
        var obj = new Object;
        for (var i in this.Names) {
            obj[this.Names[i]] = this.Values[i];
        }
        this.storage.set(obj, null);
    }

    Get(name: string):any {
        var i = this.Names.indexOf(name);
        if ( i == -1)
            return null;
        return (this.Values[i] === undefined) ? true : this.Values[i];
    }

    Set(name: string, val: any) {
        var i = this.Names.indexOf(name);
        if ( i == -1)
            return;
        this.Values[i] = val;
        this.save();
    }
}

class ChromeCachedStorageSettings implements ISettings {

    private cache: LocalStorageSettings;
    private settings: ChromeStorageSettings;

    constructor(isSync: boolean, names : string[], callback: Function, obj: Object) {
        this.cache = new LocalStorageSettings();
        var vals = this.loadCache(names);
        this.settings = new ChromeStorageSettings(isSync, names, vals, callback, obj);
    }

    private loadCache(names : string[]) {
        var vals = new Array();
        for (var i in names) {
            vals[i] = this.cache.Get(names[i]);
        }
        return vals;
    }

    private saveCache() {
        for (var i in this.settings.Names) {
            var name = this.settings.Names[i];
            this.cache.Set(name, this.settings.Get(name));
        }
    }

    private save() {
        this.saveCache();
    }

    Get(name: string):any{
        return this.settings.Get(name);
    }

    Set(name: string, val: any) {
        this.settings.Set(name, val);
        this.save();
    }
}
