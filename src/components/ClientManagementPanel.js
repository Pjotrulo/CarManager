import React, {useState} from "react";
import ClientAddCarForm from "./ClientAddCarForm";
import ClientCheckCar from "./ClientCheckCar";
import ClientRepairCar from "./ClientRepairCar";

const ClientManagementPanel = () => {

    const [buttonAddCar, setButtonAddCar] = useState(false);
    const [buttonCheckCar, setButtonCheckCar] = useState(false);
    const [buttonRepairCar, setButtonRepairCar] = useState(false);

    return (
        <section className="management">
            <div className="management__nav">
                <button onClick={() => {setButtonAddCar(true); setButtonCheckCar(false); setButtonRepairCar(false)}}>Add new car</button>
                <button onClick={() => {setButtonCheckCar(true); setButtonAddCar(false); setButtonRepairCar(false)}}>Check car</button>
                <button onClick={() => {setButtonRepairCar(true); setButtonAddCar(false); setButtonCheckCar(false)}}>Repair car</button>
            </div>
            {buttonAddCar ? <ClientAddCarForm /> : null}
            {buttonCheckCar ? <ClientCheckCar /> : null}
            {buttonRepairCar ? <ClientRepairCar /> : null}
        </section>
    )
}

export default ClientManagementPanel;