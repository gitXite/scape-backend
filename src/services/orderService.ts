import Order from '../models/Order';
import { generateID } from '../utils/generateID';

export function generateOrderID() {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);

    const rand = generateID();
    return `${dd}${mm}${yy}-${rand}`;
}

export async function createOrder(
    orderID: string,
    coordinates: {
        north: number;
        south: number;
        east: number;
        west: number;
    },
    verticalScale: number,
    scale: number,
    frame: string,
    passepartout: string
): Promise<void> {
    const order = await Order.create({
        orderID: orderID,
        amount: 576,
        coordinates,
        verticalScale,
        scale,
        frame,
        passepartout,
    });
    console.log('Order created', order);
    return;
}

export async function updateOrder(
    reference: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    streetAddress: string,
    postalCode: string,
    city: string,
    shippingMethod: string,
    paymentStatus: string,
): Promise<void> {
    const filter = { orderID: reference };
    const order = await Order.updateOne(filter, {
        $set: {
            customerFirstName: firstName,
            customerLastName: lastName,
            customerEmail: email,
            customerPhone: phoneNumber,
            shippingAddress: streetAddress,
            postalCode: postalCode,
            city: city,
            shippingMethod: shippingMethod,
            status: paymentStatus,
        }
    });
    console.log('Order successfull', order);
    return;
}

export async function checkOrder(orderID: string): Promise<boolean> {
    const order = await Order.findOne({ orderID }).exec();
    return !!order;
}
