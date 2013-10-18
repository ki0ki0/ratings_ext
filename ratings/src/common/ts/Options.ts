/// <reference path="kango.d.ts"/>
/// <reference path="Settings/Settings.ts"/> 

class Options
{
    public settings: Settings;

    constructor(init: boolean) {
        if (init) {
            this.settings = new Settings( () => this.initOptionsValues());
            this.initOptionsPage();
            debug("this.settings" + this.settings);
        }
    }

    private initOptionsPage() {
        var text = kango.i18n.getMessage("settings");
        document.getElementById("settingMess").textContent = text;
        text = kango.i18n.getMessage("playerOnly");
        document.getElementById("playerOnlyLabel").textContent = text;
        text = kango.i18n.getMessage("playerOnlySub");
        document.getElementById("playerOnlySub").textContent = text;
        text = kango.i18n.getMessage("showVoting");
        document.getElementById("showVotingLabel").textContent = text;
        text = kango.i18n.getMessage("showVotingSub");
        document.getElementById("showVotingSub").textContent = text;
        text = kango.i18n.getMessage("removeAdv");
        document.getElementById("removeAdvLabel").textContent = text;
        text = kango.i18n.getMessage("removeAdvSub");
        document.getElementById("removeAdvSub").textContent = text;
    }

    private initOptionsValues() {
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("playerOnlyVal");
        val.addEventListener("click", () => { this.saveSettings(); });
        val.checked = this.settings.GetIsClearPlayer();

        val = <HTMLInputElement> document.getElementById("showVotingVal");
        val.addEventListener("click", () => { this.saveSettings(); });
        val.checked = this.settings.GetIsShowVoting();

        val = <HTMLInputElement> document.getElementById("removeAdvVal");
        val.addEventListener("click", () => { this.saveSettings(); });
        val.checked = this.settings.GetIsRemoveAd();
    }

    private saveSettings() {
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("playerOnlyVal");
        this.settings.SetIsClearPlayer(val.checked);

        val = <HTMLInputElement> document.getElementById("showVotingVal");
        this.settings.SetIsShowVoting(val.checked);

        val = <HTMLInputElement> document.getElementById("removeAdvVal");
        this.settings.SetIsRemoveAd(val.checked);
    }

}


KangoAPI.onReady(() => new Options(true));