/// <reference path="../Chrome.d.ts"/>
/// <reference path="LocalStorageSettings.ts"/>
var ChromeStorageSettings = (function () {
    function ChromeStorageSettings(isSync, names, vals, callback, obj) {
        this.Names = names;
        this.Values = new Array();
        for(var i in this.Names) {
            this.Values[i] = vals[i];
        }
        if(isSync) {
            this.storage = chrome.storage.sync;
        } else {
            this.storage = chrome.storage.local;
        }
        this.callback = callback;
        this.obj = obj;
        var pThis = this;
        this.storage.get(names, function (val) {
            pThis.getCallback(val);
        });
    }
    ChromeStorageSettings.prototype.getCallback = function (val) {
        for(var i in this.Names) {
            this.Values[i] = val[this.Names[i]];
        }
        if(this.callback) {
            if(this.obj == null) {
                this.callback();
            } else {
                this.callback.call(this.obj);
            }
        }
    };
    ChromeStorageSettings.prototype.save = function () {
        var obj = new Object();
        for(var i in this.Names) {
            obj[this.Names[i]] = this.Values[i];
        }
        this.storage.set(obj, null);
    };
    ChromeStorageSettings.prototype.Get = function (name) {
        var i = this.Names.indexOf(name);
        if(i == -1) {
            return null;
        }
        return this.Values[i];
    };
    ChromeStorageSettings.prototype.Set = function (name, val) {
        var i = this.Names.indexOf(name);
        if(i == -1) {
            return null;
        }
        this.Values[i] = val;
        this.save();
    };
    return ChromeStorageSettings;
})();
var ChromeCachedStorageSettings = (function () {
    function ChromeCachedStorageSettings(isSync, names, callback, obj) {
        this.cache = new LocalStorageSettings();
        var vals = this.loadCache(names);
        this.settings = new ChromeStorageSettings(isSync, names, vals, callback, obj);
    }
    ChromeCachedStorageSettings.prototype.loadCache = function (names) {
        var vals = new Array();
        for(var i in names) {
            vals[i] = this.cache.Get(names[i]);
        }
        return vals;
    };
    ChromeCachedStorageSettings.prototype.saveCache = function () {
        for(var i in this.settings.Names) {
            var name = this.settings.Names[i];
            this.cache.Set(name, this.settings.Get(name));
        }
    };
    ChromeCachedStorageSettings.prototype.save = function () {
        this.saveCache();
    };
    ChromeCachedStorageSettings.prototype.Get = function (name) {
        return this.settings.Get(name);
    };
    ChromeCachedStorageSettings.prototype.Set = function (name, val) {
        this.settings.Set(name, val);
        this.save();
    };
    return ChromeCachedStorageSettings;
})();
//@ sourceMappingURL=ChromeStorageSettings.js.map
