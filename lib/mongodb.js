import { MongoClient } from 'mongodb'

// const {MONGODB_URI, MONGODB_DB } = process.env

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

//below line equivalent to Ado's 5
if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

// if (!MONGODB_DB) {
//    throw new Error('Please add your Mongo URI to .env.local')
// }

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

//line 22 on Ado's video
// let cached = global.mongo 
// if (!cached) cached = global.mongo ={}

// export async function connectToDatabase(){
//  if (cached.conn) return cached.conn 
//  if(!cached.promise){
//    const conn ={}
//    const opts ={
//      useNewUrlParser: true,
//      useUnifiedTopology: true, 

//    }
//    cached.promise =MongoClient.connect(MONGODB_URI, opts)
//    .then((client) => {
//      conn.db = db 
//      cached.conn = conn
//    })
//  }
//  await cached.promise
//  return cached.conn
// }