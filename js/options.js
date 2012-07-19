function initOptionsPage() {
    var text = chrome.i18n.getMessage("settings");
    document.getElementById("settingMess").innerHTML = text;

    var text = chrome.i18n.getMessage("syncSettings");
    document.getElementById("syncSettings").innerHTML = text;

    var text = chrome.i18n.getMessage("syncSettingsSub");
    document.getElementById("syncSettingsSub").innerHTML = text;

    var text = chrome.i18n.getMessage("playerOnly");
    document.getElementById("playerOnly").innerHTML = text;

    var text = chrome.i18n.getMessage("playerOnlySub");
    document.getElementById("playerOnlySub").innerHTML = text;

    var text = chrome.i18n.getMessage("showVoting");
    document.getElementById("showVoting").innerHTML = text;

    var text = chrome.i18n.getMessage("showVotingSub");
    document.getElementById("showVotingSub").innerHTML = text;

    initOptionsPage2();
    settings.loadSettings(initOptionsPage2);
}

function initOptionsPage2() {
    var val = document.getElementById("syncSettingsVal");
    val.addEventListener("click", updateSettings);
    val.checked = settings.syncSettings;

    var val = document.getElementById("playerOnlyVal");
    val.addEventListener("click", updateSettings);
    val.checked = settings.playerOnly;

    var val = document.getElementById("showVotingVal");
    val.addEventListener("click", updateSettings);
    val.checked = settings.showVoting;
}

function updateSettings() {
    var val = document.getElementById("syncSettingsVal");
    settings.syncSettings = val.checked;

    var val = document.getElementById("playerOnlyVal");
    settings.playerOnly = val.checked;

    var val = document.getElementById("showVotingVal");
    settings.showVoting = val.checked;

    settings.saveSettings();
}

document.addEventListener('DOMContentLoaded', initOptionsPage);