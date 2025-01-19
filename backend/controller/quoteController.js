import User from "../model/quoteModel.js"
// For posting data into database 
export const create = async(req, res)=>{
    try {
        const userData = new User( req.body);
        const {walletAddress} = userData;
        const userExist = await User.findOne({walletAddress:walletAddress})
        if (userExist){
            return res.status(400).json({message : "Wallet Address already exist."})
        }
        const savedUser = await userData.save();
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json({error : "Internal Server Error. "})
    }
}

// For getting all users from database 
export const fetch = async (req, res)=>{
    try {
        const serialNo = req.params.serialNo;
        const users = await User.find({serialNo:serialNo});
        if(users.length === 0 ){
            return res.status(404).json({message : "User not Found."})
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}

// To get a user from database 
// export const getOne = async (req, res)=>{
//     try {
//         const serialNo = req.params.serialNo;
//         const user = await User.findOne({serialNo:serialNo});
//         if(users.length === 0 ){
//             return res.status(404).json({message : "User not Found."})
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({error : " Internal Server Error. "})
//     }
// }

// For updating data 
export const update = async (req, res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if (!userExist){
            return res.status(404).json({message : "User not found."})
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new : true});
        res.status(201).json(updateUser);
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}
// For deleting data from database 
export const deleteQuote = async (req, res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            return res.status(404).json({message : " User Not Found. "})
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({message : " User deleted Successfully."})
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}