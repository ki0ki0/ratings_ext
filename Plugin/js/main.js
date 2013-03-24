var providers = [
    new FSUAInformationProvider(), 
    new EXUAInformationProvider()
];
var info = null;
for(var i = 0; i < providers.length; i++) {
    var infoTmp = providers[i].GetInfo();
    if(infoTmp != null) {
        info = infoTmp;
        break;
    }
}
var lookupers = [
    new ImdbLookuper(), 
    new KpLookuper()
];
var databases = [
    new ImdbDatabaseInfo(), 
    new KpDatabaseInfo()
];
for(var i = 0; i < lookupers.length; i++) {
    lookupers[i].GetId(info, GetIdCallback);
}
function GetIdCallback(id) {
    for(var i = 0; i < databases.length; i++) {
        databases[i].CreateItemRatingImg(id, info.container);
    }
}
//@ sourceMappingURL=main.js.map
