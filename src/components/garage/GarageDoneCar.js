import React, {useEffect, useState} from "react";
import {FaCheck} from "react-icons/fa";

const GarageDoneCar = ({databaseApi, Swal}) => {

    const [doneCar, setDoneCar] = useState(null);

    useEffect(() => {
        fetch(`${databaseApi}/commission`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Couldn't get car data")
            })
            .then(data => {
                setDoneCar(data);
            })
            .catch((err) => console.log(err))
    }, [databaseApi])

    const finalizeCommission = (id) => {
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
                        title: "Commission is done",
                        backdrop: `rgba(0, 0, 0, 0.8)`
                    })
                        .then(result => {
                            if (result.isConfirmed) {
                                fetch(`${databaseApi}/commission`)
                                    .then((res) => {
                                        if (res.ok) {
                                            return res.json();
                                        }
                                        throw new Error("Couldn't get car data")
                                    })
                                    .then(data => {
                                        setDoneCar(data);
                                    })
                                    .catch((err) => console.log(err))
                            }
                        })
                }
                return null;
            })
    }

    return (
        <section className="garage-done-cars">
            <div className="garage-done-cars--scroll">
                {doneCar ? doneCar.map(el => {
                    if (el.status === "Done") {
                        return (
                            <div key={el.id} className="garage-done-cars__car">
                                <div className="about-car"><p>{el.car}</p> <p>{el.description}</p>
                                    <p>{el.phoneNumber}</p></div>
                                <button onClick={e => {
                                    e.preventDefault();
                                    finalizeCommission(el.id)
                                }}><FaCheck/>
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

export default GarageDoneCar;