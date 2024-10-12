import { useSearchParams } from 'react-router-dom';
import { Appbar } from '../components/Appbar';
import { Balance } from '../components/Balance';
import { Users } from '../components/Users'
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Dashboard = () => {
    console.log("i re-render");

    const [searchParam] = useSearchParams();
    const [showUi, setShowUi] = useState(false);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        async function verifyUser() {
            try {
                const res = await axios.post("http://localhost:3000/api/v1/user/me", {},
                    {
                        headers: {
                            "authorization": "Bearer " + token
                        }
                    }
                )
                if (res.data) {
                    setShowUi(true);
                }
            } catch (error) {
            }
        }

        verifyUser();
        getUserBalance();

    }, [searchParam])


    async function getUserBalance(){
        try {
            const token = sessionStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/api/v1/account/balance",
                {
                    headers : {
                        Authorization : "Bearer " + token
                    }
                }
            )
            console.log(res);
            setBalance(res.data.balance)
        }catch(error){
            console.log(error);
        }
    }

    if (showUi) {
        return <div>
            <Appbar username={"Username"} />
            <div className="m-8">
                <Balance balance={balance} />
                <Users />
            </div>
        </div>
    }
}