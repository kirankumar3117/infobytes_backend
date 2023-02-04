import mongoose from "mongoose";

// connecting to mongodb data base using mongoose connection
const connect=()=>{
    return (
        mongoose.connect(`mongodb+srv://Infobytes:kiran123@infobytes.iu3dmqb.mongodb.net/test`)
    )
}

export default connect;