/// <reference path="../../common/ts/kango.d.ts"/> 
/// <reference path="Settings/SettingsFirefox.ts"/> 
/// <reference path="../../common/ts/Options.ts"/>

class OptionsFirefox extends Options {
    
    public settings: SettingsFirefox;

    constructor() {
        super(false);
        this.settings = new SettingsFirefox( () => { this.initOptionsValues(); });
    }

    initOptionsPage() {
        super.initOptionsPage();
    }

    initOptionsValues() {
        super.initOptionsValues();
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("playerOnlyVal");
        val.disabled = true;
    }

    saveSettings() {
        super.saveSettings();
    }
}