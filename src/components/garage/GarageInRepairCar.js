import React, {useEffect, useState} from "react";

const GarageInRepairCar = ({databaseApi, Swal}) => {

    const [waitingCar, setWaitingCar] = useState(null);
    const [reloadCar, setReloadCar] = useState(null);

    useEffect(() => {
        fetch(`${databaseApi}/commission`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Couldn't get car data")
            })
            .then(data => {
                setWaitingCar(data);
            })
            .catch((err) => console.log(err))
    }, [databaseApi, reloadCar])

    const carDone = {
        "status": "Done"
    }

    const doneCommission = (id) => {
        setReloadCar(id);
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
        Swal.fire({
            icon: "success",
            title: "Car repaired",
            position: 'center',
            showConfirmButton: true,
            confirmButtonColor: "green",
            backdrop: `rgba(0, 0, 0, 0.8)`,
        })
    }

    return (
        <section className="garage-waiting-cars">
            <div className="garage-waiting-cars--scroll">
                {waitingCar ? waitingCar.map(el => {
                    if (el.status === "In repair") {
                        return (
                            <div key={el.id} className="garage-waiting-cars__car">
                                <div className="about-car">
                                    <p>{el.car}</p><p>{el.description}</p><p>{el.phoneNumber}</p>
                                </div>
                                <button onClick={e => {
                                    e.preventDefault();
                                    doneCommission(el.id)
                                }}>Ok
                                </button>
                            </div>
                        )
                    }
                    return null;
                }) : null}
            </div>
        </section>
    )
}

export default GarageInRepairCar;