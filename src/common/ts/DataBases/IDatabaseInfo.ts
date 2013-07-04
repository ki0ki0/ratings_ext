interface IDatabaseInfo {
    IsValid(id: any): bool;
    CreateItemRatingImg(id: any, parent: Node): Element;
    GetUserRating(id: any, callback: Function): bool;
    Vote(id: any, rating: number, callback: Function): bool;
}
