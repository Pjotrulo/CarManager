import React, {useState} from "react";
import Header from "./Header";
import ClientManagementPanel from "./ClientManagementPanel";
import ClientAddCarForm from "./ClientAddCarForm";

const Client = () => {

    const [buttonStatus, setButtonStatus] = useState(false);

    return (
        <>
            <Header/>
            {buttonStatus === false ? <ClientAddCarForm buttonStatus={buttonStatus} setButtonStatus={setButtonStatus}/> : <ClientManagementPanel />}
        </>
    )
}

export default Client;