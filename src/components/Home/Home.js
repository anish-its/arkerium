import React from "react";
import './Home.css';
import Intro from "./Intro3d/Intro";
import Navbar from "../Navbar/Navbar";
import Digital from "./Digital/Digital";

function Home(){
    return (
        <>
            <Navbar/>
            <Intro/>
            <Digital/>
        </>
    )
}
export default Home;