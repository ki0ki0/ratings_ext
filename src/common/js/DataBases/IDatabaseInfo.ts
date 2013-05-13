interface IDatabaseInfo {
    CreateItemRatingImg(id: any, parent: Node): bool;
    GetUserRating(id: any, callback: Function): bool;
}
