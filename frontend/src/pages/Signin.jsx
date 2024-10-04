import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";

export function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return <>
        <div className="bg-slate-300 h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-96 text-center">
                    <Heading title={"SignIn"}/>
                    <SubHeading label={"Enter your email and password to sign in your account"}/>
                    <InputBox onChange={(e) => setUsername(e.target.value)} placeholder={"jhondoe@gmail.com"} label={"Email"}/>
                    <InputBox onChange={(e) => setPassword(e.target.value)} placeholder={"jhon@123"} label={"Password"}/>
                    <Button title={"Sign In"} onClick={
                        async () => {
                            try{
                                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                    email : username,
                                    password : password
                                })
                            }catch(e){
                                console.log(e);
                            }
                        }
                    }/>
                    <BottomWarning label={"New to Paytm ?"} buttonText={"SignUp"} to={"/signup"}/>
                </div>
            </div>
        </div>
    </>
}

