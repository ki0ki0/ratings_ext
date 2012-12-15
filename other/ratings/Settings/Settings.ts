/// <reference path="ChromeStorageSettings.ts"/> 

class Setting{
    private sync: ChromeCachedStorageSettings;
    private local: ChromeCachedStorageSettings;
    private callback: Function;
    private obj: Object;

    private names = ["syncSettings", "playerOnly", "showVoting"];

    constructor (callback: Function, obj: Object) {
        this.callback = callback;
        this.obj = obj;
        this.sync = new ChromeCachedStorageSettings(true, this.names, this.syncCallback, this);
    }

    private syncCallback() {
        if (this.GetIsSync())
            this.callCallback();

        this.local = new ChromeCachedStorageSettings(false, this.names, this.localCallback, this);
    }

    private localCallback() {
        this.callCallback();
    }

    private callCallback() {
        if (this.callback) {
            if (this.obj)
                this.callback.call(this.obj);
            else
                this.callback();
        }
    }

    GetIsSync():any { return this.sync.Get(this.names[0]); }
    SetIsSync(isSync: bool) { 
        this.sync.Set(this.names[0], isSync);
        if (isSync) {
            for (var i in this.names)
                this.sync.Set(this.names[i], this.local.Get(this.names[i]));
        }
        else {
            for (var i in this.names)
                this.local.Set(this.names[i], this.sync.Get(this.names[i]));
        }
    }

    GetIsClearPlayer():any { return this.sync.Get(this.names[1]); }
    SetIsClearPlayer(isClear: bool) { this.sync.Set(this.names[1], isClear); }

    GetIsShowVoting():any { return this.sync.Get(this.names[2]); }
    SetIsShowVoting(isClear: bool) { this.sync.Set(this.names[2], isClear); }
}
