/// <reference path="../ILookuper.ts"/> 
/// <reference path="../../xhr.ts"/> 

class ImdbLookuper implements ILookuper {
    private info:ILookupInfo;
    private callback: (any) => void;

    private titleIndex: number = 0;

    public GetId(info: ILookupInfo, callback: (any) => void ):void  {
        if ((info != undefined) && (callback != undefined)) {
            this.info = info;
            this.callback = callback;
            this.Lookup();
        }
    }

    private Lookup() {
        var title = this.NextTitle();
        if (title == null) {
            this.callback(null);
        }
        else {
            xhr("http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=" + encodeURIComponent(title),
                this, this.Success, this.Error);
        }
    }

    private NextTitle(): string {
        var res = null;
        if (this.titleIndex < this.info.titles.length) {
            var res = this.info.titles[this.titleIndex];
            this.titleIndex++;
        }
        return res;
    }

    private Error() {
        this.Lookup();
    }

    private Success(data: JSON) {
        var info = this.checkFilms(data["title_popular"]);
        if (info != null)
            return this.callback(info);
        info = this.checkFilms(data["title_exact"]);
        if (info != null)
            return this.callback(info);
        info = this.checkFilms(data["title_substring"]);
        if (info != null)
            return this.callback(info);
        info = this.checkFilms(data["title_approx"]);
        if (info != null)
            return this.callback(info);
        this.Lookup();
    }

    private checkFilms(array) {
        if (array == null)
            return null;
        for (var i in array) {
            var year = array[i]["description"].match("[0-9][0-9][0-9][0-9]")[0];
            var id = array[i]["id"];
            var title = array[i]["title"];
            if (this.checkFilm(title, year)) {
                return { id: id, title: title };
            }
        }
        return null;
    }

    private checkFilm(title, year) {
        if ((this.info.years === undefined) || (this.info.years == null))
            return true;
        for (var i in this.info.years) {
            if (this.info.years[i] == year)
                return true;
        }       
        return false;
    }
}
