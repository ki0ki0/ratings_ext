/// <reference path="Localization/Ii18n.d.ts"/>
interface KangoXhr {
//    getXMLHttpRequest(): XMLHttpRequest;  missed in 1.2
    send(details, callback: Function);
}

interface KangoIo {
    getResourceUrl(src);
}

interface KangoStorage {
    getItem(name: string): any;
    setItem(name: string, value: any): void;
    removeItem(name: string): void;
    getKeys(): string[];
    clear(): void;
}

interface Kango {
    xhr: KangoXhr;
    i18n: Ii18n;
    io: KangoIo;
    storage: KangoStorage;
    invokeAsync(method: string, callback: Function);
    invokeAsync(method: string, param1:any, callback: Function);
    invokeAsync(method: string, param1:any, param2:any, callback: Function);
}

interface KangoAPI {
    onReady(callback);
}

declare var kango: Kango;
declare var KangoAPI: KangoAPI;