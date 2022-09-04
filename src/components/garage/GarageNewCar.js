import React, {useEffect, useState} from "react";

const GarageNewCar = ({databaseApi}) => {

    const [car, setCar] = useState(null);

    useEffect(() => {
        fetch(`${databaseApi}/commission`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Couldn't get car data")
            })
            .then(data => {
                setCar(data)
            })
            .catch((err) => console.log(err))
    }, [databaseApi]);

    const carStatus = {
        "status": "In repair"
    }

    const acceptCommission = (id) => {
        fetch(`${databaseApi}/commission/${id}`, {
            method: "PATCH",
            body: JSON.stringify(carStatus),
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

    const rejectCommission = (id) => {
        const areYouSure = window.confirm("Are you sure?");
        if (areYouSure) {
            fetch(`${databaseApi}/commission/${id}`, {
                method: "DELETE",
            })
                .catch((err) => console.log(err))
        }
    }

    return (
        <section className="garage-new-cars">
            <div className="garage-new-cars--scroll">
                {car ? car.map((el) => {
                    if (el.status === "In repair") {
                        return null;
                    } else if (el.status === "Done") {
                        return null;
                    }
                    return (
                        <div className="garage-new-cars__car">
                            <div className="about-car">
                                <p>{el.car}</p><p>{el.description}</p><p>{el.phoneNumber}</p>
                            </div>
                            <div className="buttons">
                                <button onClick={e => {
                                    e.preventDefault();
                                    acceptCommission(el.id)
                                }}>Ok
                                </button>
                                <button onClick={e => {
                                    e.preventDefault();
                                    rejectCommission(el.id)
                                }}>X
                                </button>
                            </div>
                        </div>
                    )
                }) : null}
            </div>
        </section>
    )
}

export default GarageNewCar;