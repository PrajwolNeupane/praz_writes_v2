import mongoose from "mongoose";

export default async function connect() {
  try {
    if (process.env.MONGODB_URI) {
      mongoose.connect(`${process.env.MONGODB_URI}`);
    } else {
      mongoose.connect(`${process.env.DB_URL}`);
    }

    const connection = mongoose.connection;

    connection.on("connected", () => {});

    connection.on("error", (error) => {
      console.log("MongoDB connected error");
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}
