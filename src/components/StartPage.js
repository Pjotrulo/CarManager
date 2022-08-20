import React from "react";
import Button from "./Button";
// import Client from "./Client";
import { Link } from "react-router-dom";

const StartPage = () => {

    return (
            <div className={"startedPage"}>
                <h1 className={"startedPage__title"}>CarManager</h1>
                <div className={"startedPage__btn"}>
                    <Link to="/client"><Button btnName={"Client"}/></Link>
                    <Link to="/garage"><Button btnName={"Garage"}/></Link>
                </div>
            </div>
    )
}

export default StartPage;