import clientPromise from "../../lib/mongodb";

export default async (req, res) => {

  const client = await clientPromise;

  const database = client.db("sample_airbnb");
  const userdb = await database
    .collection("listingsAndReviews")
    .find({})
    .sort({ _id: 1 })
    .limit(20)
    .toArray();

  res.json(userdb);
};