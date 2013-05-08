/// <reference path="Chrome.d.ts"/>
/// <reference path="Settings/Settings.ts"/>
var settings = new Settings(initOptionsPage2, null);
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
}
function initOptionsPage2() {
    var val = document.getElementById("syncSettingsVal");
    val.addEventListener("click", updateSettings);
    val.checked = settings.GetIsSync();
    val = document.getElementById("playerOnlyVal");
    val.addEventListener("click", updateSettings);
    val.checked = settings.GetIsClearPlayer();
    val = document.getElementById("showVotingVal");
    val.addEventListener("click", updateSettings);
    val.checked = settings.GetIsShowVoting();
}
function updateSettings() {
    var val = document.getElementById("syncSettingsVal");
    settings.SetIsSync(val.checked);
    val = document.getElementById("playerOnlyVal");
    settings.SetIsClearPlayer(val.checked);
    val = document.getElementById("showVotingVal");
    settings.SetIsShowVoting(val.checked);
}
document.addEventListener('DOMContentLoaded', initOptionsPage);
//@ sourceMappingURL=options.js.map
