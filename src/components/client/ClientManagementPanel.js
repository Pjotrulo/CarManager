import React, {useState} from "react";
import ClientAddCar from "./ClientAddCar";
import ClientCheckCar from "./ClientCheckCar";
import ClientRepairCar from "./ClientRepairCar";
import Swal from "sweetalert2";

const ClientManagementPanel = () => {

    const [buttonAddCar, setButtonAddCar] = useState({
        "bool": true,
        "color": "#b84210"
    });
    const [buttonCheckCar, setButtonCheckCar] = useState({
        "bool": false,
        "color": ""
    });
    const [buttonRepairCar, setButtonRepairCar] = useState({
        "bool": false,
        "color": ""
    });

    const databaseApi = "http://localhost:3001";

    return (
        <section className="management">
            <div className="management__nav">
                <button style={{backgroundColor: `${buttonAddCar.color}`}} onClick={() => {
                    setButtonAddCar(prev => ({
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
                    }))
                }}>Add new car
                </button>
                <button style={{backgroundColor: `${buttonCheckCar.color}`}} onClick={() => {
                    setButtonCheckCar(prev => ({
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
                    }))
                }}>Check car
                </button>
                <button style={{backgroundColor: `${buttonRepairCar.color}`}} onClick={() => {
                    setButtonRepairCar(prev => ({
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
                    }))
                }}>Repair car
                </button>
            </div>
            {buttonAddCar.bool ? <ClientAddCar Swal={Swal} databaseApi={databaseApi}/> : null}
            {buttonCheckCar.bool ? <ClientCheckCar Swal={Swal} databaseApi={databaseApi}/> : null}
            {buttonRepairCar.bool ? <ClientRepairCar Swal={Swal} databaseApi={databaseApi}/> : null}
        </section>
    )
}

export default ClientManagementPanel;