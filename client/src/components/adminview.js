import moment from 'moment';
import React,{useEffect, useState} from 'react'

export default function Adminview() {
  const [today, setToday] = useState("");

    useEffect(() => {
        let date = new moment().format("MMM Do YYYY");  ;
        setToday(date);
    }, []);

    const data = [{name:'harshendra'},{name:'Vishal'},{name:'Ramesh'}]
  return (
    <ul className='divide-white/50 divide-y w-full md:w-1/3 px-4'>
      <p className='font-semibold'><span className='text-green-500'>Present on </span>{today}</p>
        {data.map((attending,index) => <li key={index} className='flex flex-row justify-between px-2 py-1 text-lg font-semibold'><p>{attending.name}</p></li>)}
    </ul>
  )
}
