import clientPromise from "../../lib/mongodb";

export default async (req, res) => {

    const client = await clientPromise

    // const { fivebedrooms } = req.query({beds:5})

    const database = client.db('sample_airbnb');
    const userdb = await database.collection('listingsAndReviews')
      .find({  bedrooms:5  })
      .limit(25)
      .toArray();
  res.json(userdb)
}