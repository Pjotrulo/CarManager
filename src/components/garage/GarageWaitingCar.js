import React, {useEffect, useState} from "react";

const GarageWaitingCar = ({databaseApi}) => {

    const [waitingCar, setWaitingCar] = useState(null);

    useEffect(() => {
        fetch(`${databaseApi}/commission`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Błąd wczytywania danych")
            })
            .then(data => {
                setWaitingCar(data);
            })
            .catch((err) => console.log(err))
    }, [databaseApi])

    const carDone = {
        "status": "gotowy"
    }

    const doneCommission = (id) => {
        fetch(`${databaseApi}/commission/${id}`, {
            method: "PATCH",
            body: JSON.stringify(carDone),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <section className="garage-waiting-cars">
            <div className="garage-waiting-cars--scroll">
                {waitingCar ? waitingCar.map(el => {
                    if (el.status === "w trakcie naprawy") {
                        return (
                            <div key={el.id} className="garage-waiting-cars__car">
                                <div className="about-car">
                                    <p>{el.car}</p><p>{el.description}</p><p>{el.phoneNumber}</p>
                                </div>
                                <button onClick={e => {e.preventDefault(); doneCommission(el.id)}}>Ok</button>
                                {/*<div className="buttons"></div>*/}
                            </div>
                        )
                    }
                    return null;
                }) : null}
            </div>
        </section>
    )
}

export default GarageWaitingCar;