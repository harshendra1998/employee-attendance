import { useState, useEffect } from "react";
import moment from 'moment'

export default function Attend({logged, setLoding}) {
    const [attend, setAttend] = useState(false);
    const [today, setToday] = useState("");

    useEffect(() => {
        let date = new moment().format("MMM Do YYYY");  ;
        setToday(date);
    }, []);

    const styles = {
        input: 'rounded-md px-2 text-black focus:ring ring-blue-100',
        label: 'text-xl text-left pt-2',
        button: `${attend ? "bg-red-500 hover:bg-red-600 border-red-800" : "bg-green-500 hover:bg-green-600 border-green-800"} transition-all rounded-md border-b-4 mt-2 hover:mt-3 hover:border-b-0 px-4 py-1.5 mb-12`
    }

    return (
        <div className="w-full items-center justify-center flex flex-col">
            {/* <div className="mb-10 flex flex-row border-b-2 border-white/40 justify-between px-2 md:px-4 w-full mx-2 gap-4 md:w-1/2">
            <p>Name: {logged.name}</p>
            <p>Joining Date: {logged.date}</p>
            </div> */}
            <p className="mb-5 font-semibold text-4xl">{today}</p>
            <button
                style={{
                    fontWeight: 800,
                    color: "white",
                }}
                className={styles.button}
                onClick={() => setAttend(!attend)}
            >
                {!attend ? "Mark Today's Attendance" : "Cancel Attendance"}
            </button>
        </div>
    );
}