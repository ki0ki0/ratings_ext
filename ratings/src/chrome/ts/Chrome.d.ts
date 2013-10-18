/// <reference path="../../common/ts/Localization/Ii18n.d.ts"/>
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