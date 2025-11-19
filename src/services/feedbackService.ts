import Review from '../models/Review.ts';
import Order from '../models/Order.ts';


export async function storeFeedback(rating: number, message: string, orderID: string) {
    try {
        const order = await Order.findOne({ orderID }).exec();
        
        const review = await Review.create({
            orderID: orderID,
            message: message,
            rating: rating,
            validated: !!order,
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

export async function getReviewCount(): number {
    try {
        const count = await Review.countDocuments();
        return count;
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error fetching reviews in database: ', err.message);
        } else {
            console.error('Unknown error: ', err);
        }
        throw err;
    }
}

export async function calculateAverageRating(): number {
    try {
        const result = await Review.aggregate([
            {
                $group: {
                    _id: null, // group together
                    averageRating: {
                        $avg: '$rating'
                    }
                }
            }
        ]);
        const average = result[0]?.averageRating;
        return average;
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error calculating average rating in database: ', err.message);
        } else {
            console.error('Unknown error: ', err);
        }
        throw err;
    }
}

export async function getReviewSamples(): any[] {
    let resultArray: any[] = [];
    try {
        const result = await Review.aggregate([
            { $match: { message: { $exists: true, $ne: '' }, validated: true, rating: { $gt: 3 } } },
            { $sample: { size: 20 }} 
        ]);

        for (let i: number = 0; i < result.length; i++) {
            resultArray.push(result[i]);
        }
        return resultArray;
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error getting sample reviews in database: ', err.message);
        } else {
            console.error('Unknown error: ', err);
        }
        throw err;
    }
}
