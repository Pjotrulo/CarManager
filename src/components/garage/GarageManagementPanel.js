import React, {useState} from "react";
import GarageWaitingCar from "./GarageWaitingCar";
import GarageInRepairCar from "./GarageInRepairCar";
import GarageDoneCar from "./GarageDoneCar";
import Swal from "sweetalert2";

const GarageManagementPanel = () => {

    const [buttonWaiting, setButtonWaiting] = useState({
        "bool": true,
        "color": "#b84210"
    });
    const [buttonInRepair, setButtonInRepair] = useState({
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
                <button style={{backgroundColor: `${buttonWaiting.color}`}} onClick={() => {
                    setButtonWaiting(prev => ({
                        ...prev,
                        "bool": true,
                        "color": "#b84210"
                    }));
                    setButtonInRepair(prev => ({
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
                <button style={{backgroundColor: `${buttonInRepair.color}`}} onClick={() => {
                    setButtonInRepair(prev => ({
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
                }}>In repair
                </button>
                <button style={{backgroundColor: `${buttonDone.color}`}} onClick={() => {
                    setButtonDone(prev => ({
                        ...prev,
                        "bool": true,
                        "color": "#b84210"
                    }));
                    setButtonWaiting(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }));
                    setButtonInRepair(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }));
                }}>Done
                </button>
            </div>
            {buttonWaiting.bool ? <GarageWaitingCar Swal={Swal} databaseApi={databaseApi}/> : null}
            {buttonInRepair.bool ? <GarageInRepairCar Swal={Swal} databaseApi={databaseApi}/> : null}
            {buttonDone.bool ? <GarageDoneCar Swal={Swal} databaseApi={databaseApi}/> : null}
        </section>
    )
}

export default GarageManagementPanel;