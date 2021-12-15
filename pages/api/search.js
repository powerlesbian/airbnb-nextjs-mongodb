import clientPromise from '../../lib/mongodb';

// const client = await clientPromise

const ObjectId = require('mongodb').ObjectId;

export default async function handler (req, res){

    const client = await clientPromise;

    const term = req.query.term;

    const database = client.db('sample_airbnb');

    const userdb = await database.collection("listingsAndReviews").aggregate([
{
        $search: {
            search: {
                query: term,
                path: ["description", "amenities"]
            }
        }    
        },{
            $limit: 20
        }

    ]).toArray()

    res.json(userdb)
}