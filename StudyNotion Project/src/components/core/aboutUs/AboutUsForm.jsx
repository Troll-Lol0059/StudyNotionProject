import React from "react";
import { useForm } from "react-hook-form"


const AboutUsForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
      } = useForm()

    const handleForm = (data) => {
        console.log(data);
    }


    return(
        <form onSubmit={handleSubmit(handleForm)} >
            <div className="lg:flex gap-12 lg:w-[100%]">
                <div className="flex flex-col">
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text" name="firstName" className="input" {...register("firstName")} />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text" name="lastName" className="input" {...register("lastName")} />
                </div>
            </div>

            <div>
                <label htmlFor="email">Email Address: </label>
                <input type="email" name="email" className="input" {...register("email")} />
            </div>

            <div>
                <label htmlFor="phone">Phone Number: </label>
                <div className="flex gap-3">
                    <input type="number" placeholder="+91" name="countryCode" className="input lg:w-[17%]" {...register("countryCode")} />
                    <input type="tel" placeholder="1234567890" name="phone" className="input lg:w-[80%]" {...register("phone")} />
                </div>
            </div>

            
        </form>
    )
}

export default AboutUsForm;