/// <reference path="InformationProviders/FSUAInformationProvider.ts"/> 
/// <reference path="InformationProviders/EXUAInformationProvider.ts"/> 
/// <reference path="InformationProviders/FakeInformationProvider.ts"/> 
/// <reference path="Databases/ILookuper.ts"/> 
/// <reference path="Databases/imdb/ImdbLookuper.ts"/> 

var providers : IInformationProvider[] = 
        [ new FSUAInformationProvider(), new EXUAInformationProvider(), new FakeInformationProvider()];

var info: IInformationContainer = null;
for (var i = 0; i < providers.length; i++) {
    var infoTmp = providers[i].GetInfo();
    if (infoTmp != null) {
        info = infoTmp;
        break;
    }
}

var lookupers: ILookuper[] =
        [new ImdbLookuper()];

for (var i = 0; i < lookupers.length; i++) {
    lookupers[i].GetId(info, function (id) { alert(id); });
}
