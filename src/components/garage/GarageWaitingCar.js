import React, {useEffect, useState} from "react";
import {FaTimes, FaCheck} from "react-icons/fa";

const GarageWaitingCar = ({databaseApi, Swal}) => {

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
        Swal.fire({
            icon: "success",
            title: "Commission accepted",
            position: 'center',
            showConfirmButton: true,
            confirmButtonColor: "green",
            backdrop: `rgba(0, 0, 0, 0.8)`,
        })
            .then((result) => {
                if (result.isConfirmed) {
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
                }
            })
    }

    const rejectCommission = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            showConfirmButton: true,
            customClass: {
                confirmButton: 'btn--success',
                denyButton: 'btn--deny'
            },
            buttonsStyling: false,
            confirmButtonColor: "green",
            confirmButtonText: "Yes",
            showDenyButton: true,
            backdrop: `rgba(0, 0, 0, 0.8)`
        })
            .then(result => {
                if (result.isConfirmed) {
                    fetch(`${databaseApi}/commission/${id}`, {
                        method: "DELETE"
                    })
                        .catch((err) => {
                            console.log(err)
                        })
                    Swal.fire({
                        icon: "success",
                        title: "Commission rejected",
                        position: "center",
                        confirmButtonColor: "green",
                        backdrop: `rgba(0, 0, 0, 0.8)`,
                    })
                        .then(() => {
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
                        })
                }
                return null;
            })
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
                        <div key={el.id} className="garage-new-cars__car">
                            <div className="about-car">
                                <p>{el.car}</p><p>{el.description}</p><p>{el.phoneNumber}</p>
                            </div>
                            <div className="buttons">
                                <button onClick={e => {
                                    e.preventDefault();
                                    acceptCommission(el.id)
                                }}><FaCheck/>
                                </button>
                                <button onClick={e => {
                                    e.preventDefault();
                                    rejectCommission(el.id)
                                }}><FaTimes/>
                                </button>
                            </div>
                        </div>
                    )
                }) : null}
            </div>
        </section>
    )
}

export default GarageWaitingCar;