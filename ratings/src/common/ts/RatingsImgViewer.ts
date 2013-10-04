// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/*
// @include http://www.kinopoisk.ru/film/*
// @all-frames true
// ==/UserScript==


interface IRatingsImgContainer extends IFilmInfo {

    GetTitles(): string[];

    GetYears(): number[];

    GetContainer(): HTMLElement;
}

class RatingsImgViewer {
    private container: IRatingsImgContainer;
    private containerRatings: HTMLTableRowElement;
    private containerVoting: HTMLElement;
    private settings: ISettings;
    private lookupers: IFilmLookuper[];

    constructor(settings: ISettings, lookupers: IFilmLookuper[]) {
        this.settings = settings;
        this.lookupers = lookupers;      
    }


    GetRattings(containerInfo: IRatingsImgContainer) : void
    {
        this.container = containerInfo;

        var container = containerInfo.GetContainer();
        var table = document.createElement("table");
        container.appendChild(table);

        var trRatings = document.createElement("tr");
        table.appendChild(trRatings);

        this.containerRatings = trRatings;

        var trVoting = document.createElement("tr");
        table.appendChild(trVoting);

        var tdVoting = document.createElement("td");
        trVoting.appendChild(tdVoting);

        var divVoting = document.createElement("div");
        tdVoting.appendChild(divVoting);

        this.containerVoting = divVoting;

        var txtNode = document.createTextNode("Vote:");
        divVoting.appendChild(txtNode);
        divVoting.id = "voting";
        divVoting.style.display = "none";

        kango.invokeAsync("kango.i18n.getMessage", "vote", (data) => {
            divVoting.textContent = data;
        });

        for (var i: number = 0; i < this.lookupers.length; i++) {
            var tdRating = document.createElement("td");
            trRatings.appendChild(tdRating);

            this.lookupers[i].GetId(this.settings, containerInfo, (dbInfo: IDbFilmInfo) => this.GetIdCallback(tdRating, dbInfo));
        }
    }
    
    private GetIdCallback(tdRating: HTMLTableDataCellElement, dbInfo: IDbFilmInfo): void {
        debug("GetIdCallback");

        var link = <HTMLAnchorElement> document.createElement("a");
        tdRating.appendChild(link);
        link.href = dbInfo.GetInfoUrl();

        var image = <HTMLImageElement> document.createElement("img");
        link.appendChild(image);
        image.src = dbInfo.GetRatingImgSrc();

        var txt = document.createElement("p");
        link.appendChild(txt);

        var txtNode = document.createTextNode(HtmlDecode(dbInfo.GetLocalName()));
        txt.appendChild(txtNode);
    }
}