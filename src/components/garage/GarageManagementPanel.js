import React, {useState} from "react";
import GarageNewCar from "./GarageNewCar";
import GarageWaitingCar from "./GarageWaitingCar";
import GarageDoneCar from "./GarageDoneCar";

const GarageManagementPanel = () => {

    const [buttonNew, setButtonNew] = useState({
        "bool": false,
        "color": ""
    });
    const [buttonWaiting, setButtonWaiting] = useState({
        "bool": false,
        "color": ""
    });
    const [buttonDone, setButtonDone] = useState({
        "bool": false,
        "color": ""
    });

    const databaseApi = "http://localhost:3001";

    return (
        <section className="garage-management">
            <div className="garage-management__nav">
                <button style={{backgroundColor: `${buttonNew.color}`}} onClick={() => {
                    setButtonNew(prev => ({
                        ...prev,
                        "bool": true,
                        "color": "#b84210"
                    }));
                    setButtonWaiting(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }));
                    setButtonDone(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }));
                }}>New
                </button>
                <button style={{backgroundColor: `${buttonWaiting.color}`}} onClick={() => {
                    setButtonWaiting(prev => ({
                        ...prev,
                        "bool": true,
                        "color": "#b84210"
                    }));

                    setButtonNew(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }));

                    setButtonDone(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }));
                }}>Waiting
                </button>
                <button style={{backgroundColor: `${buttonDone.color}`}} onClick={() => {
                    setButtonDone(prev => ({
                        ...prev,
                        "bool": true,
                        "color": "#b84210"
                    }));
                    setButtonNew(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }));
                    setButtonWaiting(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }));
                }}>Done
                </button>
            </div>
            {buttonNew.bool ? <GarageNewCar databaseApi={databaseApi}/> : null}
            {buttonWaiting.bool ? <GarageWaitingCar databaseApi={databaseApi}/> : null}
            {buttonDone.bool ? <GarageDoneCar databaseApi={databaseApi}/> : null}
        </section>
    )
}

export default GarageManagementPanel;