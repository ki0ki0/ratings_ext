/// <reference path="Localization/Ii18n.ts"/> 

interface KangoXhr {
//    getXMLHttpRequest(): XMLHttpRequest;  missed in 1.2
    send(details, callback: Function);
}

interface Kango {
    xhr: KangoXhr;
    i18n: Ii18n;
}

interface KangoAPI {
    onReady(callback);
}

declare var kango: Kango;
declare var KangoAPI: KangoAPI;