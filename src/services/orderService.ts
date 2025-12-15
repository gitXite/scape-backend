import { google } from 'googleapis';
import fs from 'fs';
import Order from '../models/Order';
import { generateID } from '../utils/generateID';

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({
    version: 'v3',
    auth,
});

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
    const order = await Order.findOneAndUpdate(
        { orderID },
        {
            $setOnInsert: {
                orderID,
                amount: 576,
            },
            $set: {
                coordinates,
                verticalScale,
                scale,
                frame,
                passepartout,
            },
        },
        { upsert: true, new: true }
    );
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
    paymentStatus: string
) {
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
        },
    });
    console.log('Order successful', order);
    return order;
}

export async function deleteOrder(reference: string) {
    await Order.findOneAndDelete({ orderID: reference });
    console.log('Order deleted', reference);
    return;
}

export async function checkOrder(orderID: string): Promise<boolean> {
    const order = await Order.findOne({ orderID }).exec();
    return !!order;
}

export async function uploadToDrive(stlBuffer: Buffer, orderId: string) {
    const res = await drive.files.create({
        requestBody: {
            name: `${orderId}.zip`,
            mimeType: 'application/zip',
        },
        media: {
            mimeType: 'application/zip',
            body: fs.createReadStream(`${orderId}.zip`),
        },
    });

    const fileId = res.data.id;
    await drive.permissions.create({
        fileId,
        requestBody: {
            role: 'reader',
            type: 'user',
            emailAddress: 'scapebymd@gmail.no',
        },
    });
}