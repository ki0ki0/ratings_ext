// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="debug.ts"/>

/// <reference path="InformationProviders/FSUAInformationProvider.ts"/> 
/// <reference path="InformationProviders/EXUAInformationProvider.ts"/> 
///// <reference path="InformationProviders/FakeInformationProvider.ts"/> 
/// <reference path="Databases/ILookuper.ts"/> 
/// <reference path="Databases/imdb/ImdbLookuper.ts"/> 
/// <reference path="Databases/imdb/ImdbDatabaseInfo.ts"/> 
/// <reference path="Databases/kinopoisk/KpLookuper.ts"/> 
/// <reference path="Databases/kinopoisk/KpDatabaseInfo.ts"/> 
/// <reference path="Settings/Settings.ts"/>

/// <reference path="tVote.d.ts"/>

class Ratings {
    private providers: IInformationProvider[] =
        [
            new FSUAInformationProvider()
            , new EXUAInformationProvider()
//            , new FakeInformationProvider()
        ];

    private lookupers: ILookuper[] =
            [
                new ImdbLookuper(),
                new KpLookuper()
            ];

    private databases: IDatabaseInfo[] =
            [
                new ImdbDatabaseInfo(),
                new KpDatabaseInfo()
            ];

    private info: IInformationContainer = null;

    public GetRatings() {
        for (var i = 0; i < this.providers.length; i++) {
            var infoTmp = this.providers[i].GetInfo();
            if (infoTmp != null) {
                this.info = infoTmp;
                debug("Info found");
                break;
            }
        }

        if (this.info == null)
        {
            debug("No info found");
            return;
        }

        var table = document.createElement("table");
        this.info.container.appendChild(table);

        var tr = document.createElement("tr");
        table.appendChild(tr);

        var td = document.createElement("td");
        tr.appendChild(td);
        this.info.container = td;

        var trVoting = document.createElement("tr");
        table.appendChild(trVoting);

        var tdVoting = document.createElement("td");
        trVoting.appendChild(tdVoting);

        this.divVoting = document.createElement("div");
        this.divVoting.innerText = "Vote: ";
        this.divVoting.id = "voting";
        this.divVoting.style.display = "none";
        tdVoting.appendChild(this.divVoting);

        for (var i = 0; i < this.lookupers.length; i++) {
            var _this = this;
            this.lookupers[i].GetId(this.info, function (id) { _this.GetIdCallback(id); });
        }
    }

    private voting = null;
    private divVoting = null;

    private ids = new Array();
    private ratingElements = new Array();

    private GetIdCallback(id) {
        if (id == null)
        {
            debug("Id response empty");
            return;
        }

        debug("Id response recived");

        var index = this.ids.length;
        this.ids[index] = id;

        for (var i = 0; i < this.databases.length; i++) {
            var element = this.databases[i].CreateItemRatingImg(id, this.info.container);
            if (element == null)
                continue;

            this.ratingElements[index] = element;

            if (Settings.GetSettings().GetIsShowVoting()) {
                if (this.voting == null) {
                    this.divVoting.style.display = "block";

                    var star = "http://dl.dropboxusercontent.com/u/8771963/res/star.png";
                    var darkStar = "http://dl.dropboxusercontent.com/u/8771963/res/dark_star.png";

                    if ((kango.io !== undefined) && (kango.io.getResourceUrl !== undefined))
                    {
                        star = kango.io.getResourceUrl("res/star.png");
                        darkStar = kango.io.getResourceUrl("res/dark_star.png");
                    }
                    var voteStar = star;
                    this.addVoting(star, darkStar, voteStar);
                }
                var _this = this;
                this.databases[i].GetUserRating(id, function (rating) { _this.GetUserRatingCallback(id, rating); });
            }
        }
    }

    private addVoting(star: string, darkStar: string, voteStar: string) {
        var _this = this;
        this.voting = new tVote(star, darkStar, voteStar, "voting", {
            max: 10, def: 0, click: function (mouseEvent, val) {
                _this.vote(mouseEvent, val);
            }
        });
    }

    private userRatings = new Array();
    private userRatingsElements = new Array();

    private GetUserRatingCallback(id, rating) {
        debug("GetUserRatingCallback " + id + " " + rating);

        var index = this.ids.indexOf(id);
        debug("GetUserRatingCallback index:" + index);

        this.userRatings[index] = rating;

        var div = document.createElement("div");
        this.ratingElements[index].appendChild(div);
        debug("GetUserRatingCallback ratingElements[index]:" + this.ratingElements[index]);
        var txt = "";

        if (rating == null) {
            txt = "Please, sing in.";
        }
        else {
            txt = "Your rating: " + rating + "/10";
        }
        var txtNode = document.createTextNode(txt);

        var elem = this.userRatingsElements[index];

        if ((elem === undefined) || (elem === null))
        {
            div.appendChild(txtNode);
            this.userRatingsElements[index] = div;
        }
        else {
            debug("UR Element " + elem + " child " + elem.firstChild);
            if (elem.firstChild != null)
                elem.removeChild(elem.firstChild);
            elem.appendChild(txtNode);
        }
        this.updateVoting();
        debug("GetUserRatingCallback done");
    }

    private updateVoting() {
        if (this.userRatings.length < 1)
            return;

        var val = this.userRatings[0];

        for (var i = 1; i < this.userRatings.length; i++) {
            if (val != this.userRatings[i]) {
                val = -1;
                break;
            }
        }

        var display = ((val == -1) || (val == null) ? "block" : "none");
        for (var i = 0; i < this.userRatingsElements.length; i++) {
            if (this.userRatingsElements[i]) {
                this.userRatingsElements[i].style.display = display;
            }
        }

        var numberVal: number = parseInt(val);
        if (numberVal != null) {
            this.voting.reset(numberVal);
        }
    }

    private vote(mouseEvent, val) {
        for (var j = 0; j < this.ids.length; j++) {
            var id = this.ids[j];

            var index = this.ids.indexOf(id);
            for (var i = 0; i < this.databases.length; i++) {
                var _this = this;
                if (this.databases[i].Vote(id, val, function (id, success) { _this.voteCallback(id, success); })) {
                    var elem: HTMLDivElement = this.userRatingsElements[j];
                    elem.style.display = "block";

                    debug("Element " + elem + " child " + elem.firstChild);
                    if (elem.firstChild !== null)
                        elem.removeChild(elem.firstChild);

                    var img: HTMLImageElement = <HTMLImageElement> document.createElement("img");
                    if ((kango.io !== undefined) && (kango.io.getResourceUrl !== undefined))
                    {
                        img.src = kango.io.getResourceUrl("res/comajax_gray.gif");
                    }
                    else
                    {
                        img.src = "https://dl.dropboxusercontent.com/u/8771963/res/comajax_gray.gif";
                    }
                    elem.appendChild(img);
                }
            }
        }
    }

    private voteCallback(id, success) {
        debug(success);

        var index = this.ids.indexOf(id);
        debug("voteCallback id: " + id);
        var elem: HTMLDivElement = this.userRatingsElements[index];
        elem.style.display = "block";

        for (var i = 0; i < this.databases.length; i++) {
            var _this = this;
            this.databases[i].GetUserRating(id, function (rating) {
                elem.removeChild(elem.firstChild);
                _this.GetUserRatingCallback(id, rating);
            });
        }
    }
}