import { connectDB } from "../../utils/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { db, client } = await connectDB();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}
