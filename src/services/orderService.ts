import Order from '../models/Order';

export async function checkOrder(orderID: string): Promise<boolean> {
    const order = await Order.findOne({ orderID }).exec();
    return !!order;
}