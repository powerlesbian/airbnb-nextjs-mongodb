//static regenerated page
// import clientPromise from '../../lib/mongodb'

export async function getStaticPaths(){

    return {
        paths: [],
        fallback: true
    }
}

export async function getStaticProps({props}){

    const client = await clientPromise;

    const database = client.db('sample_airbnb');
    
    const userdb = await database.collection('listingsAndReviews').findOne({

        _id: props.id
    },{
        projection: {
            name: 1,
            images: 1,
            address: 1,
            summary: 1,
            price: 1,
            cleaning_fee: 1,
            amenities: 1
        }
    })
    
    return{
    props: {property: JSON.parse(JSON.stringify(userdb))},
    revalidate: 1
    }
}