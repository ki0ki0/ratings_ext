function trace(s) {
    console.log(s);
}

function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    } else {
        return '';
    }
}

function baseRatings() {
    this.index = 0;

    baseRatings.prototype.getRating = function (titles, years, callback, parent) {
        this.titles = titles;
        this.years = years;
        this.callback = callback;
        this.parent = parent;

        this.next();
    }

    baseRatings.prototype.next = function () {
        var title = this.getNextTitle();
        if (title != null) {
            var url = this.formatUrl(title);
            var xhr = $.getJSON(url, this.success);
            xhr.error(this.next);
            xhr.object = this;
        }
        else {
            this.callback();
        }
    }

    baseRatings.prototype.getNextTitle = function () {
        var title = null;
        do {
            title = null;
            if (this.titles instanceof Array) {
                if (this.index < this.titles.length) {
                    title = this.titles[this.index];
                    this.index++;
                }
            }
            else {
                if (this.index == 0) {
                    title = this.titles;
                    this.index++;
                }
            }
        }
        while ((title != null) && (title.trim() == ""));
        return title;
    }

    baseRatings.prototype.formatUrl = function () {
        return "";
    }

    baseRatings.prototype.success = function (data, textStatus, jqXHR) {
        if (data == null) {
            jqXHR.object.next();
        }
        else {
            var info = jqXHR.object.process(data);
            if (info == null)
                jqXHR.object.next();
            else {
                var gen = jqXHR.object.format(info.id, info.title);
                jqXHR.object.callback(gen);
            }
        }
    }

    baseRatings.prototype.process = function (json) {
        return null;
    }

    baseRatings.prototype.checkFilm = function (title, year) {
        if ((this.years === undefined) || (this.years == null))
            return true;
        if (this.years instanceof Array) {
            for (i in this.years) {
                if (this.years[i] == year)
                    return true;
            }
        }
        else {
            if (this.years == year)
                return true;
        }
        return false;
    }

    baseRatings.prototype.format = function (id, title) {
        return this.generate(id, title, null, null);
    }

    baseRatings.prototype.generate = function (id, title, img, url, name) {
        this.getUserRating(id);
        var item = document.createElement("div");

        var input = document.createElement("input");
        item.appendChild(input);
        input.hidden = true;
        input.name = name + "_id";
        input.value = id;

        var link = document.createElement("a");
        item.appendChild(link);
        link.href = url;

        var image = document.createElement("img");
        link.appendChild(image);
        image.src = img;

        var txt = document.createElement("p");
        link.appendChild(txt);
        txt.innerText = htmlDecode(title);

        return item;
    }

    baseRatings.prototype.getUserRating = function (id) {
        var url = this.formatUserRatingUrl(id);
        var xhr = $.get(url, this.successUserRating);
        xhr.object = this;
    }

    baseRatings.prototype.formatUserRatingUrl = function (id) {
        return "";
    }

    baseRatings.prototype.successUserRating = function (data, textStatus, jqXHR) {
        var rate = jqXHR.object.processUserRating(data);
        jqXHR.object.addVoting(rate);
    }

    baseRatings.prototype.processUserRating = function (id) {
        return null;
    }

    baseRatings.prototype.addVoting = function (rate) {
        if (baseRatings.prototype.voting === undefined) {
            if (rate == null)
                rate = 0;
            baseRatings.prototype.voting = new tVote("voting", { max: 10, def: rate, click: this.vote });
        }
        else {
            baseRatings.prototype.voting.addHandler(this.vote);
        }
        return;
    }

    baseRatings.prototype.vote = function (mouseEvent, labelValue) {
        alert('You clicked ' + labelValue);
    }

    baseRatings.prototype.checkVote = function (data) {
    }
}

function ImdbRatings() {
    var base = new baseRatings();

    var auth = null;

    base.formatUrl = function (title) {
        return "http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=" + encodeURIComponent(title);
    }

    base.process = function (json) {
        var info = this.checkFilms(json["title_popular"]);
        if (info != null)
            return info;
        info = this.checkFilms(json["title_exact"]);
        if (info != null)
            return info;
        info = this.checkFilms(json["title_substring"]);
        if (info != null)
            return info;
        info = this.checkFilms(json["title_approx"]);
        return info;
    }

    base.checkFilms = function (array) {
        if (array == null)
            return null;
        for (i in array) {
            var year = array[i]["description"].match("[0-9][0-9][0-9][0-9]")[0];
            var id = array[i]["id"];
            var title = array[i]["title"];
            if (this.checkFilm(title, year)) {
                base.id = id;
                return { id: id, title: title };
            }
        }
        return null;
    }

    base.format = function (id, title) {
        return this.generate(id, title,
            "http://tracker.0day.kiev.ua/imdb/imdb_" + id + ".gif",
            "http://www.imdb.com/title/" + id, "imdb");
    }

    base.formatUserRatingUrl = function (id) {
        return "http://www.imdb.com/title/" + id + "/";
    }

    base.processUserRating = function (data) {
        var your = /class=\"rating-your\"/g;
        var arr_your = data.match(your);
        var rate = null;
        if (arr_your != null)
            rate = arr_your.length;
        var exp = /data-auth="([0-9A-z-_]*)"/g;
        var arr = exp.exec(data);
        base.auth = arr[1];
        return rate;
    }

    base.vote = function (mouseEvent, labelValue) {
        var irate = document.getElementById("imdb_rate");
        irate.innerHTML = "<img src='http://st.kinopoisk.ru/images/profile/comajax_gray.gif'>";

        var url = "http://www.imdb.com/ratings/_ajax/title?tconst=" + base.id + "&rating=" + labelValue + "&auth=" + base.auth;
        $.getJSON(url, base.checkVote).error(base.checkVote);
    }

    base.checkVote = function (data) {
        var irate = document.getElementById("imdb_rate");
        if ((data === undefined) || (data == null) || (data.status != 200))
            irate.innerHTML = "<a href='http://www.imdb.com/'>" + chrome.i18n.getMessage("imdbLogin") + "</a>";
        else
            irate.innerText = chrome.i18n.getMessage("imdbDone");
    }

    return base;
}

function KinopoiskRatings() {
    var base = new baseRatings();

    var auth = null;

    base.formatUrl = function (title) {
        var query = "getKPGlobalSearch?cityID=49&countryID=62&keyword=";
        query = query + encodeURIComponent(title).replace(/!/g, "%21");
        var hash = MD5(query + "andrliravlik");

        query = query + "&key=" + hash;

        return "http://ext.kinopoisk.ru/android/1.2.0/" + query;
    }

    base.process = function (json) {
        var data = json["data"];
        if (data == null)
            return;

        var youmean = data["youmean"];
        var info = this.checkItem(youmean);
        if (info != null)
            return info;

        var films = data["searchFilms"];
        for (var i = 0; i < films.length; i++) {

            info = this.checkItem(films[i]);
            if (info != null)
                break;
        }

        return info;
    }

    base.checkItem = function (film) {
        if (film == null)
            return null;

        if (this.checkFilm(film["nameRU"], film["year"])) {
            base.id = film["id"];
            return { id: film["id"], title: film["nameRU"] };
        }
        return null;
    }

    base.format = function (id, title) {
        return this.generate(id, title,
            "http://tracker.0day.kiev.ua/kinopoisk/f" + id + ".gif",
            "http://www.kinopoisk.ru/level/1/film/" + id, "kinopoisk");
    }

    base.formatUserRatingUrl = function (id) {
        return "http://www.kinopoisk.ru/level/1/film/" + id;
    }

    base.processUserRating = function (data) {
        var your = /myVote:([0-9]*)/g;
        var arr_your = your.exec(data);
        var rate = null;
        if (arr_your != null)
            rate = arr_your[1];

        var exp = /user_code:'([0-9a-f]*)'/g;
        var arr = exp.exec(data);

        base.auth = arr[1];
        return rate;
    }

    base.receiveMessage = function (event) {
        if (event.data != "!_{h:''}") {
            var irate = document.getElementById("kinopoisk_rate");
            if (event.data == "Ok")
                irate.innerText = chrome.i18n.getMessage("kpDone");
            else
                irate.innerHTML = "<a href='http://www.kinopoisk.ru/'>" + chrome.i18n.getMessage("kpLogin") + "</a>";
        }

    }

    base.vote = function (mouseEvent, labelValue) {
        var krate = document.getElementById("kinopoisk_rate");
        krate.innerHTML = "<img src='http://st.kinopoisk.ru/images/profile/comajax_gray.gif'>";

        var url = "http://www.kinopoisk.ru/level/1/film/" + base.id + "/#" + labelValue + "#" + base.auth;

        window.addEventListener("message", base.receiveMessage, false);

        var ifr = document.createElement("iframe");
        ifr.haight = 0;
        ifr.width = 0;
        ifr.src = url;

        document.body.appendChild(ifr);
    }

    return base;
}

function addScript(text) {
    var start = document.createElement("script");
    start.type = "text/javascript";
    start.innerHTML = text;
    document.body.appendChild(start);
}


function vote_part2(event) {
    if (document.location.hash != "") {
        var exp = /\/level\/1\/film\/([0-9]*)\/#([0-9])+#([0-9A-z]*)/g;
        var info = exp.exec(document.location.href);
        if (info.length != 4)
            return;
        var rate = info[2];
        var id = info[1];
        var auth = info[3];

        var url = "http://www.kinopoisk.ru/vote.php?film=" + id + "&film_vote=" + rate + "&c=" + auth + "&rnd=" + Math.random();
        $.get(url, vote_part3);
    }
}


function vote_part3(data) {
    addScript("parent.postMessage(\"" + data + "\", '*');");
}

if (document.location.href.indexOf("www.kinopoisk.ru") >= 0) {
    vote_part2();
}

function getAllRatings(titles, years, parent) {
    var table = document.createElement("table");
    parent.appendChild(table);
    var tr = document.createElement("tr");
    table.appendChild(tr);

    var td = document.createElement("td");
    td.id = "imdb_info";
    td.width = 121;
    tr.appendChild(td);
    td = document.createElement("td");
    td.id = "kinopoisk_info";
    td.width = 121;
    tr.appendChild(td);

    tr = document.createElement("tr");
    table.appendChild(tr);

    td = document.createElement("td");
    td.colSpan = 2;
    tr.appendChild(td);
    var div = document.createElement("div");
    td.appendChild(div);

    if (settings.showVoting) {
        div.innerText = chrome.i18n.getMessage("yourRating");
        div.id = "voting";
        div.style.verticalAlign = "middle";
        td.appendChild(div);
    }
    div = document.createElement("div");
    div.id = "imdb_rate";
    td.appendChild(div);
    div = document.createElement("div");
    div.id = "kinopoisk_rate";
    td.appendChild(div);

    var callbackImdb = function (item) {
        var el = document.getElementById("imdb_info");
        if ((item != null) && (el != null) && (el.children.length == 0)) {
            el.appendChild(item);
        }
    }

    var imdb = new ImdbRatings();
    imdb.getRating(titles, years, callbackImdb, td);

    var callbackKinopoisk = function (item) {
        var el = document.getElementById("kinopoisk_info");
        if ((item != null) && (el != null) && (el.children.length == 0)) {
            el.appendChild(item);
        }
    }

    var kp = new KinopoiskRatings();
    kp.getRating(titles, years, callbackKinopoisk, td);
}