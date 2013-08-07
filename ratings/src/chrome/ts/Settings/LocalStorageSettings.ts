/// <reference path="../../../common/ts/Settings/ISettings.ts"/> 

class LocalStorageSettings implements ISettings {
    Get(name: string): any {
        return (localStorage[name] === undefined) ? true : localStorage[name];
    }

    Set(name: string, val: any) {
        localStorage[name] = val;
    }
}