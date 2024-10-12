import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Users = () => {

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            .then((res) => {
                setUsers(res.data.users);
            })    
    }, [filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"/>
        </div>
        <div className="flext justify-center">
            {users.map((user) => <User user={user}/>)}
        </div>
    </>
}

function User({user}){
    const navigate = useNavigate();
    return <div className="flex justify-between items-center p-4 h-14 hover:bg-slate-50 rounded-full">
        <div className=" flex justify-between items-center p-2">
            <div className="bg-green-500 h-10 w-10 flex justify-center items-center text-center rounded-full text-white font-bold text-xl">
                {user.firstName[0]}
            </div>
            <div className="pl-2">
                {user.username}
            </div>
        </div>
        <button onClick={(e) => {
            navigate(`/send?id=${user._id}&name=${user.firstName}`, { replace: false })
        }} className="bg-green-500 text-white font-medium rounded-full p-2">Send Money</button>
    </div>
}