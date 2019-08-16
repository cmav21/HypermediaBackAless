import mongodb from "mongodb";

async function connect(){
    try{
        const client = await mongodb.connect("mongodb://localhost:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db("hipermedia");
        return db;
    } catch(e){
        console.log(e)
    }
}

export default connect;