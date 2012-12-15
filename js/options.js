function initOptionsTexts() {
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

    initOptionsValues();
}

function initOptionsValues() {
    var val = document.getElementById("syncSettingsVal");
    val.addEventListener("click", updateSettings);
    val.checked = settings.GetIsSync();

    var val = document.getElementById("playerOnlyVal");
    val.addEventListener("click", updateSettings);
    val.checked = settings.GetIsClearPlayer();

    var val = document.getElementById("showVotingVal");
    val.addEventListener("click", updateSettings);
    val.checked = settings.GetIsShowVoting();
}

function updateSettings() {
    var val = document.getElementById("syncSettingsVal");
    settings.SetIsSync( val.checked);

    var val = document.getElementById("playerOnlyVal");
    settings.SetIsClearPlayer( val.checked);

    var val = document.getElementById("showVotingVal");
    settings.SetIsShowVoting( val.checked);
}

document.addEventListener('DOMContentLoaded', initOptionsTexts);

var settings = new Setting(initOptionsValues, null);