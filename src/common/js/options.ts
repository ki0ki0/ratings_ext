// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="kango.d.ts"/> 
/// <reference path="Settings/Settings.ts"/> 

var settings: Settings = new Settings();

function initOptionsPage() {
    document.getElementById("syncSettings").style.display = "none";

    var text = kango.i18n.getMessage("settings");
    document.getElementById("settingMess").innerHTML = text;

    var text = kango.i18n.getMessage("playerOnly");
    document.getElementById("playerOnlyLabel").innerHTML = text;

    var text = kango.i18n.getMessage("playerOnlySub");
    document.getElementById("playerOnlySub").innerHTML = text;

    var text = kango.i18n.getMessage("showVoting");
    document.getElementById("showVotingLabel").innerHTML = text;

    var text = kango.i18n.getMessage("showVotingSub");
    document.getElementById("showVotingSub").innerHTML = text;

    initOptionsPage2();
}

function initOptionsPage2() {
    var val: HTMLInputElement = <HTMLInputElement> document.getElementById("playerOnlyVal");
    val.addEventListener("click", updateSettings);
    val.checked = settings.GetIsClearPlayer();

    val = <HTMLInputElement> document.getElementById("showVotingVal");
    val.addEventListener("click", updateSettings);
    val.checked = settings.GetIsShowVoting();
}

function updateSettings() {
    var val: HTMLInputElement = <HTMLInputElement> document.getElementById("playerOnlyVal");
    settings.SetIsClearPlayer(val.checked);

    val = <HTMLInputElement> document.getElementById("showVotingVal");
    settings.SetIsShowVoting(val.checked);
}

KangoAPI.onReady(initOptionsPage);