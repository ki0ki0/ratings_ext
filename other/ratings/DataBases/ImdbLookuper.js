var ImdbLookuper = (function () {
    function ImdbLookuper(info, callback) {
        this.info = info;
        this.callback = callback;
        this.Lookup();
    }
    ImdbLookuper.prototype.GetId = function (info, callback) {
        var lookuper = new ImdbLookuper(info, callback);
        return lookuper;
    };
    ImdbLookuper.prototype.Lookup = function () {
        var title = this.NextTitle();
        if(title == null) {
            this.callback(null);
        }
        xhr("http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=" + encodeURIComponent(title), this, this.Success, this.Error);
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
        var info = this.checkFilms(data["title_popular"]);
        if(info != null) {
            return this.callback(info);
        }
        info = this.checkFilms(data["title_exact"]);
        if(info != null) {
            return this.callback(info);
        }
        info = this.checkFilms(data["title_substring"]);
        if(info != null) {
            return this.callback(info);
        }
        info = this.checkFilms(data["title_approx"]);
        if(info != null) {
            return this.callback(info);
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
                return {
                    id: id,
                    title: title
                };
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
