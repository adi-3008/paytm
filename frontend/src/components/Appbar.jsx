export function Appbar({username}){
    return <div className="flex justify-between bg-white h-12 shadow-md">
        <div className="flex justify-center items-center pl-2 font-medium">
            PayTM App
        </div>
        <div className="flex justify-center items-center pr-2 font-medium">
            Hello {username}
        </div>
    </div>
}