export function InputBox({placeholder, label, onChange}){
    return <div className="px-3 mb-2">
        <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 text-start">{label}</label>
            <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}