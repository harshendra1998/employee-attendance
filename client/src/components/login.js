import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Login({ setLogged, setLoding, settoken }) {
    const [register, setRegister] = useState(false);
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [dateofjoin, setdateofjoin] = useState('');
    const [name, setname] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/api').then(e => console.log(e.data))
    }, [])


    const logged = () => {
        setLoding(true);
        axios.post('http://localhost:3001/signin', { email, password }
        ).then(e => { console.log(e.data); localStorage.setItem('token', e.data.token); settoken(e.data.token)}).finally(() => setLoding(false))
        setLogged({ name: 'harsehdra' })
    }

    const createacc = () => {
        setLoding(true);
        axios.post('http://localhost:3001/newemployee', { name, email, dateofjoin }
        ).then(e => { console.log(e.data); alert('Password sent to given mail login Using that'); setRegister(false) }).finally(() => setLoding(false))
        setLogged({ name: 'harsehdra' })
    }

    const styles = {
        input: 'rounded-md px-2 text-black focus:ring ring-blue-100 w-full',
        label: 'text-left pt-2 text-base',
        button: 'bg-blue-400 hover:bg-blue-500 transition-all rounded-md border-b-4 mt-2 hover:mt-3 hover:border-b-0 border-blue-500'
    }

    return (
        <div>
            <div className="w-full flex flex-row-reverse justify-around mb-2">
                <button className={`${register ? 'text-white' : 'text-gray-400'} font-semibold transition-all`} onClick={() => setRegister(true)}>
                    Register
                </button>
                <button className={`${!register ? 'text-white' : 'text-gray-400'} font-semibold transition-all`} onClick={() => setRegister(false)}>
                    Login
                </button>
            </div>
            {register ? (
                <div className="flex flex-col gap-1">
                    <label className={styles.label}>Email</label>
                    <input type="email" className={styles.input} value={email} onChange={e => setemail(e.target.value)} placeholder="Email to Register"></input>
                    <label className={styles.label}>Employee Name</label>
                    <input type="text" className={styles.input} value={name} onChange={e => setname(e.target.value)} placeholder="Employee Name"></input>
                    <label className={styles.label}>Date of Joining</label>
                    <input type="date" className={styles.input} value={dateofjoin} onChange={e => setdateofjoin(e.target.value)} placeholder="date of Joining"></input>
                    <button className={styles.button} onClick={() => createacc()}>Register</button>
                    <p className="text-sm pt-1">*You will get Password on given Email</p>
                </div>
            ) : (
                <div className="flex flex-col gap-1">
                    <label className={styles.label}>Email</label>
                    <input type="email" className={styles.input} value={email} onChange={e => setemail(e.target.value)} placeholder="Registered Email"></input>
                    <label className={styles.label}>Password</label>
                    <input type="password" className={styles.input} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
                    <button className={styles.button} onClick={() => logged()}>Log In</button>
                </div>
            )}
            <button className="absolute bottom-0 right-0 m-4 px-3 py-1 bg-gray-400 rounded-md text-lg font-semibold"><Link to='/admin'>Admin View</Link></button>
        </div>
    );
}
