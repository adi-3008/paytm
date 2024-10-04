import {Appbar} from '../components/Appbar';
import {Balance} from '../components/Balance';
import {Users} from '../components/Users' 

export const Dashboard = () => {
    return <div>
        <Appbar username={"Username"}/>
        <div className="m-8">
            <Balance balance={"10,000"}/>
            <Users/>
        </div>
    </div>
}