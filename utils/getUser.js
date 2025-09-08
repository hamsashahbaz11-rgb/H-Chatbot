import User  from "@/models/User";
import connectDB from "./db";

export const getUser = async(email) => {
    try {
        await connectDB();
        
        const user = await User.findOne({email});
        if(!user){
            return null;
        }
        let userId  =  user._id;
        return userId;
        
    } catch (error) {
        
        return error;
    }
}