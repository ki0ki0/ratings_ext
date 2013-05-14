interface IDatabaseInfo {
    CreateItemRatingImg(id: any, parent: Node): bool;
    GetUserRating(id: any, callback: Function): bool;
    Vote(id: any, rating: number, callback: Function): bool;
}
