interface ISettingsStorage{
Get(name: string): any;
    Set(name: string, val: any);
}