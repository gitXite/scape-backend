import Review from '../models/Review.ts';


export async function storeFeedback(rating: number, message: string, orderID: string) {
    try {
        const review = await Review.create({
            orderID: orderID,
            message: message,
            rating: rating,
        });

        console.log('Review stored in database: ', review);
        return review;
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error storing review in database: ', err.message);
        } else {
            console.error('Unknown error: ', err);
        }
        throw err;
    }
}