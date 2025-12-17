import { drive_v3 } from '@googleapis/drive';
import { JWT } from 'google-auth-library';
import { Readable } from 'stream';
import Order from '../models/Order';
import { generateID } from '../utils/generateID';
import config from '../config/config';

const credentials = JSON.parse(config.serviceAccount);

const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const client = new drive_v3.Drive({
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
                amount: 596,
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

interface CheckOrder {
    check: boolean;
    order: any;
}

export async function checkOrder(orderID: string): Promise<CheckOrder> {
    const order = await Order.findOne({ orderID }).exec();
    const check = !!order;
    return { check, order };
}

export async function uploadToDrive(stlBuffer: Buffer, orderId: string) {
    const res = await client.files.create({
        supportsAllDrives: true,
        fields: 'id, name, webViewLink',
        requestBody: {
            name: `${orderId}.stl`,
            parents: [config.sharedDriveId],
        },
        media: {
            mimeType: 'application/sla',
            body: Readable.from(stlBuffer),
        },
    });

    // const fileId = res.data.id;
    // if (!fileId) return;

    // await client.permissions.create({
    //     fileId,
    //     requestBody: {
    //         role: 'reader',
    //         type: 'user',
    //         emailAddress: 'scapebymd@gmail.no',
    //     },
    // });
}
