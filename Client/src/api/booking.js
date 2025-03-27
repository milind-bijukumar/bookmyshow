import { axiosInstance } from "./axiosInstance";

export const makePayment = async ({token,amount})=>{
    try{
        const response = await axiosInstance.post("http://localhost:8082/payments",{
            token,
            amount
        });
        // console.log(response.data);
        return response.data
    }
    catch(err){
        console.log(err);
        return err.response;
    }
}
export const createBooking = async ({show,seats,transactionId})=>{
    console.log('Hi')
    try{
        // console.log("Inside booking API")
        const response = await axiosInstance.post("http://localhost:8082/bookings",{
            show,
            seats,
            transactionId
        })    
        return response.data
    }
    catch(err){
        console.log(err);
        return err.response;
    }
};
