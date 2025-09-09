// import mongoose from "mongoose";

// const dbConnected = async () => {
//   try {
//     const uri = process.env.MONGO_URI || "mongodb+srv://mokchheduls46:mokchhedul@cluster0.cxqeo.mongodb.net/userservice";
//     await mongoose.connect(uri);
//     console.log("MongoDB connected successfully.");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1); 
//   }
// };

// export { dbConnected };




import mongoose from "mongoose";

const dbConnected = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not defined!");
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export { dbConnected };
