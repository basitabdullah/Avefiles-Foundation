import mongoose from "mongoose";

export const getAllServices = async (req, res) => {
  try {
    const collection = mongoose.connection.collection("services");

    const documents = await collection.find({}).toArray();

    res.status(200).json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
