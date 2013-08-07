interface IDatabaseInfo {
    IsValid(id: any): boolean;
    CreateItemRatingImg(id: any, parent: Node): Element;
    GetUserRating(id: any, callback: Function): boolean;
    Vote(id: any, rating: number, callback: Function): boolean;
}
