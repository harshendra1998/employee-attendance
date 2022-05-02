import React, { useEffect, useState } from "react";
import './App.css';
import Login from "./components/login";
import Attend from "./components/attendance";
import logo from './logo.svg';
import Loader from "./components/loader";
import Adminview from "./components/adminview";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [data, setData] = useState(null);
  const [logged, setLogged] = useState(null);
  const [token, settoken] = useState(null);
  const [loding, setLoding] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token") || null;
    console.log(token);
    setLogged('Harshendra')
    settoken(token);
  }, []);

  return (
    <div className="App flex flex-col">
      {loding && <Loader />}
      <header className="absolute top-0 w-full left-0 flex flex-row justify-between px-2 md:px-4 py-2 bg-gray-900 text-white sticky top-0"><div className="flex flex-row items-center md:gap-2"><img src={logo} className="App-logo h-8 md:h-12" alt="logo" /><p className="font-bold text-base md:text-3xl">Employee Attendance</p></div><div className="flex flex-row gap-2 md:gap-4 text-sm md:text-base items-center">{(token && logged) && <><p>{logged.name&&'Hi,'} {logged.name}</p> <button className="underline font-semibold" onClick={() => {localStorage.removeItem('token'); settoken(null); setLogged(null)}}>LogOut</button></>}</div></header>
      <div className="App-header flex-1">
        <BrowserRouter>
          <Routes>
            <Route index element={<>{token ? <Attend logged={logged} setLoding={setLoding} /> : <Login setLogged={setLogged} setLoding={setLoding} settoken={settoken} />}</>} />
            <Route path="admin" element={<Adminview />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
