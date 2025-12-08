import Order from '../models/Order';
import { generateID } from '../utils/generateID';

export function generateOrderID() {
    const now = new Date();
    const dd = String(now.getDay()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);

    const rand = generateID();
    return `${dd}${mm}${yy}-${rand}`;
}

export async function checkOrder(orderID: string): Promise<boolean> {
    const order = await Order.findOne({ orderID }).exec();
    return !!order;
}