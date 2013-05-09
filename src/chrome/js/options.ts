/// <reference path="../../common/js/kango.d.ts"/> 
/// <reference path="Settings/Settings.ts"/> 

(function optionsChrome() {
    var settings: SettingsChrome = new SettingsChrome(initOptionsPage2, null);

    function initOptionsPage() {
        var text = kango.i18n.getMessage("settings");
        document.getElementById("settingMess").innerHTML = text;

        var text = kango.i18n.getMessage("syncSettings");
        document.getElementById("syncSettingsLabel").innerHTML = text;

        var text = kango.i18n.getMessage("syncSettingsSub");
        document.getElementById("syncSettingsSub").innerHTML = text;

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
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("syncSettingsVal");
        val.addEventListener("click", updateSettings);
        val.checked = settings.GetIsSync();

        val = <HTMLInputElement> document.getElementById("playerOnlyVal");
        val.addEventListener("click", updateSettings);
        val.checked = settings.GetIsClearPlayer();

        val = <HTMLInputElement> document.getElementById("showVotingVal");
        val.addEventListener("click", updateSettings);
        val.checked = settings.GetIsShowVoting();
    }

    function updateSettings() {
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("syncSettingsVal");
        settings.SetIsSync(val.checked);

        val = <HTMLInputElement> document.getElementById("playerOnlyVal");
        settings.SetIsClearPlayer(val.checked);

        val = <HTMLInputElement> document.getElementById("showVotingVal");
        settings.SetIsShowVoting(val.checked);
    }

    KangoAPI.onReady(initOptionsPage);
} ());