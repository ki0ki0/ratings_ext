/// <reference path="isettings.d.ts"/> 
/// <reference path="../kango.d.ts"/> 

class KangoStorageSettings implements ISettings {

    private storage = new Object();
    private callback:Function = null;

    constructor(names:string[], callback: Function) {

        this.callback = callback;

        for (var i = 0 ; i < names.length; i++){
            this.storage[names[i]] = true;
        }
        if (kango.storage === undefined) {
            kango.invokeAsync("kango.storage.getItem", "options", (data) => { this.getCallback(data); });
        }
        else {
            var vals = kango.storage.getItem("options");// do not add to setTimeout scope
            setTimeout(() => { this.getCallback(vals); }, 1); // do callback call async
        }
    }

    private getCallback(data) {
        if (data != null)
        {
            this.storage = data;
        }
        this.callback();
    }

    private save() {
        kango.storage.setItem("options", this.storage);
    }

    Get(name: string):any {
        return (this.storage[name] === undefined) ? true : this.storage[name];
    }

    Set(name: string, val: any) {
        this.storage[name] = val;
        this.save();
    }
}