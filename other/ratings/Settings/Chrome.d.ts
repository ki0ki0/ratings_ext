interface ChromeStorage {
    get(name, callback: Function);
    set(name, callback: Function);
}

interface ChromeStorages {
    local: ChromeStorage;
    sync: ChromeStorage;
}

interface Chrome {
    storage: ChromeStorages;
}

declare var chrome: Chrome;