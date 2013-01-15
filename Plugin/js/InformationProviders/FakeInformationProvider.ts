/// <reference path="IInformationProvider.ts"/> 

class FakeInformation implements IInformationContainer {
    titles: string[];
    years: Number[];
    container: Node;
}

class FakeInformationProvider implements IInformationProvider {
    GetInfo(): IInformationContainer {
        var info = new FakeInformation();
        info.titles = ["Пила","Saw"];
        info.years = [2005, 2004];
        info.container = null;
        return info;
    }
}
