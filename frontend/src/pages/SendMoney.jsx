import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SendMoney(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState("");
    return (
        <div className="bg-slate-300 flex justify-center h-screen items-center">
            <div className="bg-white h-auto w-96 rounded-lg">
                <div className="mt-12 text-4xl font-extrabold text-center">Send Money</div>
                <div className="my-12 mx-10">
                    <div className="flex flex-row items-center">
                        <div className="bg-green-500 h-12 w-12 rounded-full flex justify-center items-center text-2xl font-medium text-white">{name[0]}</div>
                        <div className="ml-4 text-2xl font-bold">{name}</div>
                    </div>
                    <div className="font-medium">Amount (in Rs)</div>
                    <input type="number" id="amount" onChange={(e) => setAmount(e.target.value)} className="border-2 border-gray-200 w-full mt-2 p-2 rounded-md" placeholder="Enter Amount"/>
                    <button onClick = { () => 
                        axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to : id,
                            amount : amount
                        }, {
                            headers : {
                                Authorization : "Bearer " + sessionStorage.getItem("token")
                            }
                        })
                    } className="bg-green-500 justify-center w-full mt-4 p-2 rounded-md font-medium text-white">Initiate Transfer</button>
                </div>
            </div>
        </div>
    );
}
