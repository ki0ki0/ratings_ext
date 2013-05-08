/// <reference path="../ILookuper.ts"/>
/// <reference path="../../xhr.ts"/>
/// <reference path="ImdbInfo.ts"/>
var ImdbLookuper = (function () {
    function ImdbLookuper() {
        this.titleIndex = 0;
    }
    ImdbLookuper.prototype.GetId = function (info, callback) {
        if((info != undefined) && (callback != undefined)) {
            this.info = info;
            this.callback = callback;
            this.Lookup();
        }
    };
    ImdbLookuper.prototype.Lookup = function () {
        var title = this.NextTitle();
        if(title == null) {
            this.callback(null);
        } else {
            xhr("http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=" + encodeURIComponent(title), this, this.Success, this.Error);
        }
    };
    ImdbLookuper.prototype.NextTitle = function () {
        var res = null;
        if(this.titleIndex < this.info.titles.length) {
            var res = this.info.titles[this.titleIndex];
            this.titleIndex++;
        }
        return res;
    };
    ImdbLookuper.prototype.Error = function () {
        this.Lookup();
    };
    ImdbLookuper.prototype.Success = function (data) {
        if(data !== null) {
            var group = data["title_popular"];
            if(group !== undefined) {
                var info = this.checkFilms(group);
                if(info != null) {
                    return this.callback(info);
                }
            }
            group = data["title_exact"];
            if(group !== undefined) {
                info = this.checkFilms(group);
                if(info != null) {
                    return this.callback(info);
                }
            }
            group = data["title_substring"];
            if(group !== undefined) {
                info = this.checkFilms(group);
                if(info != null) {
                    return this.callback(info);
                }
            }
            group = data["title_approx"];
            if(group !== undefined) {
                info = this.checkFilms(group);
                if(info != null) {
                    return this.callback(info);
                }
            }
        }
        this.Lookup();
    };
    ImdbLookuper.prototype.checkFilms = function (array) {
        if(array == null) {
            return null;
        }
        for(var i in array) {
            var year = array[i]["description"].match("[0-9][0-9][0-9][0-9]")[0];
            var id = array[i]["id"];
            var title = array[i]["title"];
            if(this.checkFilm(title, year)) {
                var itemInfo = new ImdbInfo();
                itemInfo.id = id;
                itemInfo.title = title;
                return itemInfo;
            }
        }
        return null;
    };
    ImdbLookuper.prototype.checkFilm = function (title, year) {
        if((this.info.years === undefined) || (this.info.years == null)) {
            return true;
        }
        for(var i in this.info.years) {
            if(this.info.years[i] == year) {
                return true;
            }
        }
        return false;
    };
    return ImdbLookuper;
})();
//@ sourceMappingURL=ImdbLookuper.js.map
