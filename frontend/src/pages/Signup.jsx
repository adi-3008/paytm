import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";

export function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-96 text-center p-2 h-max px-4">
                <Heading title={"SignUp"}/>
                <SubHeading label={"Enter your information to create your account"}/>
                <InputBox onChange = {e => {setFirstName(e.target.value)}} placeholder={"Jhon"} label={"First Name"}/>
                <InputBox onChange = {e => {setLastName(e.target.value)}} placeholder={"Doe"} label={"Last Name"}/>
                <InputBox onChange = {e => {setUsername(e.target.value)}} placeholder={"jhondoe@gmail.com"} label={"Email"}/>
                <InputBox onChange = {e => {setPassword(e.target.value)}} placeholder={"jhon@123"} label={"Password"}/>
                <Button title={"Sign Up"} onClick={
                    async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            password,
                            firstName,
                            lastName
                        })
                    }
                }/>
                <BottomWarning label={"Already have an account ?"} buttonText={"SignIn"} to={"/signin"}/>
            </div>
        </div>
    </div>
}