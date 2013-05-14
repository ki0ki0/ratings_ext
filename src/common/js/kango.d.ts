/// <reference path="Localization/Ii18n.ts"/> 

interface KangoXhr {
//    getXMLHttpRequest(): XMLHttpRequest;  missed in 1.2
    send(details, callback: Function);
}

interface KangoIo {
    getResourceUrl(src);
}

interface Kango {
    xhr: KangoXhr;
    i18n: Ii18n;
    io: KangoIo;
    invokeAsync(method: string, callback: Function);
}

interface KangoAPI {
    onReady(callback);
}

declare var kango: Kango;
declare var KangoAPI: KangoAPI;