// seeder for 'scape' prod database
import mongoose from 'mongoose';
import config from '../config/config.js';
import Item from '../models/Item.js';

async function seed() {
    try {
        await mongoose.connect(config.mongoDBUri);

        console.log('Clearing old items...');
        await Item.deleteMany({});

        console.log("Inserting items...");
        await Item.insertMany([
            {
                type: "frame",
                label: "Oak",
                value: "oak",
                price: 99,
            },
            {
                type: "frame",
                label: "Walnut",
                value: "walnut",
                price: 99,
            },
            {
                type: "frame",
                label: "White",
                value: "white",
                price: 99,
            },
            {
                type: "frame",
                label: "Black",
                value: "black",
                price: 99,
            },
            {
                type: "passepartout",
                label: "White",
                value: "white",
                price: 49,
            },
            {
                type: "passepartout",
                label: "Black",
                value: "black",
                price: 49,
            }
        ]);
        
        console.log('Seeding complete');
    } catch (err) {
        console.error('Failed to seed:', err);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
