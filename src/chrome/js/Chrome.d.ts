/// <reference path="../../common/js/Localization/Ii18n.ts"/> 

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
    i18n: Ii18n;
}

declare var chrome: Chrome;