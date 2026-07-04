const mongoose = require("mongoose");
const Listing = require("./models/listing");
const geocoder = require("./utils/geocoder");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderstay";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    const listings = await Listing.find({});

    for (let listing of listings) {
        if (listing.location) {
            const geoData = await geocoder.geocode(listing.location);

            if (geoData.length > 0) {
                listing.geometry = {
                    type: "Point",
                    coordinates: [
                        geoData[0].longitude,
                        geoData[0].latitude,
                    ],
                };

                await listing.save();
                console.log(`Updated: ${listing.title}`);
            } else {
                console.log(`Could not find: ${listing.location}`);
            }
        }
    }

    console.log("All listings updated!");
    mongoose.connection.close();
}

main().catch(console.error);