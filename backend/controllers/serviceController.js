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

export const getSingleService = async (req, res) => {
  try {
    const { id } = req.params; 


    const collection = mongoose.connection.collection("services");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    const serviceId = new mongoose.Types.ObjectId(id);

    const service = await collection.findOne({ _id: serviceId });

    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ error: "Service not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
