import { studentEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import rzplogo from '../../assets/Logo/rzp_logo.png';
import {apiConnector} from '../apiconnector';
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";

const { COURSE_PAYMENT_API,
    COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_MAIL_API } 
    = studentEndpoints;

// addding razorpay script to DOM
function loadScript(src){


    return new Promise( (resolve) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () =>{
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    } )
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId = toast.loading("Loading...");

    try{
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API, {courses},
                            {
                                Authorization: `Bearer ${token}`,
                            } )
        
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        // options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency:orderResponse.data.message.currency,
            amount:`${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description:"Thank you for purchasing the course",
            image:rzplogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email,
            },
            handler: function(response){
                // send successful mail
                sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);
                
                // verify payment
                verifyPayment( {...response,courses},token,navigate, dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            toast.error("Payment Failed");
            console.log(response.error);
        } )

    }catch(error){
        console.log("Payment API ERROR",error);
        toast.error("Could not make Payment")
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_MAIL_API,
            {
                orderId:response.razorpay_order_id,
                paymentId:response.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )
    }catch(error){
        console.log("PAYMENT SUCCESS EMAIL ERROR............", error);
    }
}

// verify Payment
async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId = toast.loading('Verifying Payment');
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,
                {
                    Authorization:`Bearer ${token}`,
                })
        
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful,you are added to course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }catch(error){
        console.log("Payment Verify Error",error);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}