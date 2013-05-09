/// <reference path="LocalStorageSettings.ts"/> 

class Settings {
    private local: LocalStorageSettings;

    private names = ["playerOnly", "showVoting"];

    constructor() {
        this.local = new LocalStorageSettings();
    }

    GetIsClearPlayer(): any { return this.local.Get(this.names[1]); }
    SetIsClearPlayer(isClear: bool) { this.local.Set(this.names[1], isClear); }

    GetIsShowVoting(): any { return this.local.Get(this.names[2]); }
    SetIsShowVoting(isClear: bool) { this.local.Set(this.names[2], isClear); }
}
