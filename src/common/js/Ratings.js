// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
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
var Ratings = (function () {
    function Ratings() {
        this.providers = [
            new FSUAInformationProvider(), 
            new EXUAInformationProvider()
        ];//            , new FakeInformationProvider()
        
        this.lookupers = [
            new ImdbLookuper(), 
            new KpLookuper()
        ];
        this.databases = [
            new ImdbDatabaseInfo(), 
            new KpDatabaseInfo()
        ];
        this.info = null;
        this.voting = null;
        this.userRatings = new Array();
        this.userRatingsElements = new Array();
    }
    Ratings.prototype.GetRatings = function () {
        for(var i = 0; i < this.providers.length; i++) {
            var infoTmp = this.providers[i].GetInfo();
            if(infoTmp != null) {
                this.info = infoTmp;
                break;
            }
        }
        if(this.info == null) {
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
        var divVoting = document.createElement("div");
        divVoting.innerText = "Vote: ";
        divVoting.id = "voting";
        tdVoting.appendChild(divVoting);
        for(var i = 0; i < this.lookupers.length; i++) {
            var _this = this;
            this.lookupers[i].GetId(this.info, function (id) {
                _this.GetIdCallback(id);
            });
        }
    };
    Ratings.prototype.GetIdCallback = function (id) {
        for(var i = 0; i < this.databases.length; i++) {
            this.databases[i].CreateItemRatingImg(id, this.info.container);
            if(Settings.GetSettings().GetIsShowVoting()) {
                if(this.voting == null) {
                    var _this = this;
                    this.voting = new tVote("voting", {
                        max: 10,
                        def: 0,
                        click: function (mouseEvent, val) {
                            _this.vote(mouseEvent, val);
                        }
                    });
                }
                var _this = this;
                this.databases[i].GetUserRating(id, function (rating, element) {
                    _this.GetUserRatingCallback(rating, element);
                });
            }
        }
    };
    Ratings.prototype.GetUserRatingCallback = function (rating, element) {
        console.log(rating, element);
        this.userRatings[this.userRatings.length] = rating;
        this.userRatingsElements[this.userRatingsElements.length] = element;
        this.updateVoting();
    };
    Ratings.prototype.updateVoting = function () {
        if(this.userRatings.length < 1) {
            return;
        }
        var val = this.userRatings[0];
        for(var i = 1; i < this.userRatings.length; i++) {
            if(val != this.userRatings[i]) {
                val = -1;
                break;
            }
        }
        var display = ((val == -1) ? "block" : "none");
        console.log(display);
        for(var i = 0; i < this.userRatingsElements.length; i++) {
            this.userRatingsElements[i].style.display = display;
        }
        this.voting.reset(val);
    };
    Ratings.prototype.vote = function (mouseEvent, val) {
        console.log("vote " + val);
    };
    return Ratings;
})();
//@ sourceMappingURL=Ratings.js.map
