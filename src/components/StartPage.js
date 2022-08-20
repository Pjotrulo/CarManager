import React from "react";
import Button from "./Button";

const StartPage = () => {
    return (
        <div className={"startedPage"}>
            <h1 className={"startedPage__title"}>CarManager</h1>
            <div className={"startedPage__btn"}>
                <Button btnName={"Client"}/>
                <Button btnName={"Garage"}/>
            </div>
        </div>
    )
}

export default StartPage;