import { MongoClient } from "mongodb";

export const connectDB = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@newcluster.4pnxy.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();

  return {
    db,
    client,
  };
};
