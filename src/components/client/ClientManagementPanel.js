import React, {useState} from "react";
import ClientAddCarForm from "./ClientAddCarForm";
import ClientCheckCar from "./ClientCheckCar";
import ClientRepairCar from "./ClientRepairCar";

const ClientManagementPanel = () => {

    const [buttonAddCar, setButtonAddCar] = useState({
        "bool": false,
        "color": ""
    });
    const [buttonCheckCar, setButtonCheckCar] = useState({
        "bool": false,
        "color": ""
    });
    const [buttonRepairCar, setButtonRepairCar] = useState({
        "bool": false,
        "color": ""
    });

    return (
        <section className="management">
            <div className="management__nav">
                <button style={{backgroundColor: `${buttonAddCar.color}`}} onClick={() => {setButtonAddCar(prev => ({
                    ...prev,
                    "bool": true,
                    "color": "#b84210"
                }));
                    setButtonCheckCar(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }));
                    setButtonRepairCar(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }))}}>Add new car</button>
                <button style={{backgroundColor: `${buttonCheckCar.color}`}} onClick={() => {setButtonCheckCar(prev => ({
                    ...prev,
                    "bool": true,
                    "color": "#b84210"
                }));
                    setButtonAddCar(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }));
                    setButtonRepairCar(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }))}}>Check car</button>
                <button style={{backgroundColor: `${buttonRepairCar.color}`}} onClick={() => {setButtonRepairCar(prev => ({
                    ...prev,
                    "bool": true,
                    "color": "#b84210"
                }));
                    setButtonAddCar(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }));
                    setButtonCheckCar(prev => ({
                        ...prev,
                        "bool": false,
                        "color": ""
                    }))}}>Repair car</button>
            </div>
            {buttonAddCar.bool ? <ClientAddCarForm /> : null}
            {buttonCheckCar.bool ? <ClientCheckCar /> : null}
            {buttonRepairCar.bool ? <ClientRepairCar /> : null}
        </section>
    )
}

export default ClientManagementPanel;