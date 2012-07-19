var settings = new function () {
    this.syncSettings = true;
    this.playerOnly = true;
    this.showVoting = true;

    this.saveSettings = function () {
        chrome.storage.sync.set({ "syncSettings": this.syncSettings });
        var storage;
        if (this.syncSettings)
            storage = chrome.storage.sync;
        else
            storage = chrome.storage.local;
        storage.set({ "playerOnly": this.playerOnly, "showVoting": this.showVoting });
        this.saveCachedSettings();
    }

    this.loadSettings = function (callback) {
        this.callback = callback;
        this.loadCachedSettings();
        chrome.storage.sync.get("syncSettings", this.syncSettingsCallback);
    }

    this.settingsChanged = function (changes, namespace) {
        settings.loadSettings();
    }

    this.loadCachedSettings = function () {
        this.playerOnly = localStorage["playerOnly"] != "false";
        this.showVoting = localStorage["showVoting"] != "false";
    }

    this.saveCachedSettings = function () {
        localStorage["playerOnly"] = this.playerOnly;
        localStorage["showVoting"] = this.showVoting;
    }

    this.syncSettingsCallback = function (val) {
        settings.syncSettings = val["syncSettings"] != false;
        var storage;
        if (settings.syncSettings)
            storage = chrome.storage.sync;
        else
            storage = chrome.storage.local;
        storage.get(["playerOnly", "showVoting"], settings.settingsCallback);
    }

    this.settingsCallback = function (val) {
        settings.playerOnly = val["playerOnly"] != false;
        settings.showVoting = val["showVoting"] != false;

        settings.saveCachedSettings();

        if (settings.callback != undefined)
            settings.callback();
    }

    this.loadSettings();
    chrome.storage.onChanged.addListener(this.settingsChanged);
}

