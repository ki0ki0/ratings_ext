interface KangoXhr {
//    getXMLHttpRequest(): XMLHttpRequest;  missed in 1.2
    send(details, callback: Function);
}

interface Kango {
    xhr: KangoXhr;
}

declare var kango: Kango;