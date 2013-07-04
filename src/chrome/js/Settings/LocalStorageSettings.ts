/// <reference path="../../../common/js/Settings/ISettings.ts"/> 

class LocalStorageSettings implements ISettings {
    Get(name: string): any {
        return localStorage[name];
    }

    Set(name: string, val: any) {
        localStorage[name] = val;
    }
}