import React, {useState} from "react";
import ClientAddCarForm from "./ClientAddCarForm";
import ClientCheckCar from "./ClientCheckCar";
import ClientRepairCar from "./ClientRepairCar";

const ClientManagementPanel = () => {

    const [buttonAddCar, setButtonAddCar] = useState(false);
    const [buttonCheckCar, setButtonCheckCar] = useState(false);
    const [buttonRepairCar, setButtonRepairCar] = useState(false);
    const [activeButtonAddCarColor, setActiveButtonAddCarColor] = useState("")
    const [activeButtonCheckCarColor, setActiveButtonCheckCarColor] = useState("")
    const [activeButtonRepairCarColor, setActiveButtonRepairCarColor] = useState("")

    return (
        <section className="management">
            <div className="management__nav">
                <button style={{backgroundColor: `${activeButtonAddCarColor}`}} onClick={() => {setButtonAddCar(true); setActiveButtonAddCarColor("#b84210"); setActiveButtonCheckCarColor(""); setActiveButtonRepairCarColor(""); setButtonCheckCar(false); setButtonRepairCar(false)}}>Add new car</button>
                <button style={{backgroundColor: `${activeButtonCheckCarColor}`}} onClick={() => {setButtonCheckCar(true); setActiveButtonCheckCarColor("#b84210"); setActiveButtonRepairCarColor(""); setActiveButtonAddCarColor(""); setButtonAddCar(false); setButtonRepairCar(false)}}>Check car</button>
                <button style={{backgroundColor: `${activeButtonRepairCarColor}`}} onClick={() => {setButtonRepairCar(true); setActiveButtonRepairCarColor("#b84210"); setActiveButtonCheckCarColor(""); setActiveButtonAddCarColor(""); setButtonAddCar(false); setButtonCheckCar(false)}}>Repair car</button>
            </div>
            {buttonAddCar ? <ClientAddCarForm /> : null}
            {buttonCheckCar ? <ClientCheckCar /> : null}
            {buttonRepairCar ? <ClientRepairCar /> : null}
        </section>
    )
}

export default ClientManagementPanel;