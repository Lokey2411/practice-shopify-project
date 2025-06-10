export default interface IWishList {
    _id: string;
    price: string;
    ProductId: {
        _id: string;
        title: string;
        author: string;
        price: number;
        image: string;
    };
}