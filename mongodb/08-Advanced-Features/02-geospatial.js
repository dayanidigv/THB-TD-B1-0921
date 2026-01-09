// ==========================================
// GEOSPATIAL QUERIES
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function geospatialExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const places = db.collection("places");

    await places.deleteMany({});

    // Create 2dsphere index
    await places.createIndex({ location: "2dsphere" });

    // Insert places with coordinates [longitude, latitude]
    await places.insertMany([
      { 
        name: "Statue of Liberty", 
        type: "monument",
        location: { type: "Point", coordinates: [-74.0445, 40.6892] } 
      },
      { 
        name: "Central Park", 
        type: "park",
        location: { type: "Point", coordinates: [-73.9654, 40.7829] } 
      },
      { 
        name: "Brooklyn Bridge", 
        type: "landmark",
        location: { type: "Point", coordinates: [-73.9969, 40.7061] } 
      },
      { 
        name: "Times Square", 
        type: "landmark",
        location: { type: "Point", coordinates: [-73.9855, 40.7580] } 
      },
      { 
        name: "Empire State Building", 
        type: "building",
        location: { type: "Point", coordinates: [-73.9857, 40.7484] } 
      }
    ]);

    console.log("✅ Inserted places with coordinates");

    // FIND NEARBY ($near)
    console.log("\n=== FIND NEARBY ($near) ===");
    const nearCentralPark = await places.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [-73.9712, 40.7831] },
          $maxDistance: 5000 // 5km
        }
      }
    }).toArray();
    console.log("Within 5km of Central Park:");
    nearCentralPark.forEach(p => console.log(`- ${p.name}`));

    // FIND WITHIN RADIUS ($geoWithin)
    console.log("\n=== WITHIN RADIUS ($geoWithin) ===");
    const withinRadius = await places.find({
      location: {
        $geoWithin: {
          $centerSphere: [[-73.9712, 40.7831], 10 / 6378.1] // 10km radius
        }
      }
    }).toArray();
    console.log(`Within 10km: ${withinRadius.length} places`);

    // FIND WITHIN POLYGON
    console.log("\n=== WITHIN POLYGON ($geoWithin) ===");
    const withinPolygon = await places.find({
      location: {
        $geoWithin: {
          $geometry: {
            type: "Polygon",
            coordinates: [[
              [-74.05, 40.70], // Southwest
              [-73.95, 40.70], // Southeast
              [-73.95, 40.80], // Northeast
              [-74.05, 40.80], // Northwest
              [-74.05, 40.70]  // Close the polygon
            ]]
          }
        }
      }
    }).toArray();
    console.log("Within polygon:", withinPolygon.map(p => p.name));

    // FIND NEAR WITH DISTANCE
    console.log("\n=== DISTANCES ($geoNear aggregation) ===");
    const distances = await places.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [-73.9712, 40.7831] },
          distanceField: "distance",
          maxDistance: 10000,
          spherical: true
        }
      },
      {
        $project: {
          name: 1,
          distance: { $round: ["$distance", 0] },
          _id: 0
        }
      }
    ]).toArray();
    
    console.log("Places with distances:");
    distances.forEach(p => console.log(`- ${p.name}: ${p.distance}m`));

    // FIND BY TYPE AND LOCATION
    console.log("\n=== FILTER BY TYPE & LOCATION ===");
    const nearbyLandmarks = await places.find({
      type: "landmark",
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [-73.9857, 40.7484] },
          $maxDistance: 3000
        }
      }
    }).toArray();
    console.log("Nearby landmarks:", nearbyLandmarks.map(p => p.name));

    console.log("\n✅ Geospatial Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

geospatialExamples();
