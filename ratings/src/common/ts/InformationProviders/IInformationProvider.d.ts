interface IInformationContainer {
titles: string[];
    years: Number[];
    container: Node;
}

interface IInformationProvider {
    GetInfo(callback:(info: IInformationContainer) => void );
}