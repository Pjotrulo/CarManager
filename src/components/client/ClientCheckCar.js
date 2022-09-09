import React, {useEffect, useState} from "react";

const ClientCheckCar = ({databaseApi, Swal}) => {

    const [car, setCar] = useState(null);
    const [carFromCommission, setCarFromCommission] = useState(null);
    const [commissionId, setCommissionId] = useState(null);

    useEffect(() => {
        fetch(`${databaseApi}/clientCars`)
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
    }, [databaseApi])

    useEffect(() => {
        fetch(`${databaseApi}/commission`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Couldn't get car data")
            })
            .then(data => {
                setCarFromCommission(data);
            })
            .catch((err) => console.log(err))
    }, [databaseApi])

    const removeCar = (id) => {
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
                    fetch(`${databaseApi}/clientCars/${id}`, {
                        method: "DELETE"
                    })
                        .catch((err) => {
                            console.log(err)
                        })
                    Swal.fire({
                        icon: "success",
                        title: "Deleted successfully",
                        position: "center",
                        confirmButtonColor: "green",
                        backdrop: `rgba(0, 0, 0, 0.8)`,
                    })
                        .then(() => {
                            fetch(`${databaseApi}/clientCars`)
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

    const arrayWithRejectedCars = [];
    const arrayWithAllCommissionCars = [];

    const searchStatusCar = () => {
        carFromCommission.map(el => {
            arrayWithAllCommissionCars.push(el.id)
            if (commissionId === el.commission) {
                Swal.fire({
                    title: `${el.car}`.toUpperCase(),
                    text: `Status: ${el.status}`,
                    backdrop: `rgba(0, 0, 0, 0.8)`
                });
            } else if (commissionId !== el.commission) {
                arrayWithRejectedCars.push(el.id)
            }
            return null;
        })
        if (arrayWithRejectedCars.length === arrayWithAllCommissionCars.length) {
            Swal.fire({
                title: "Your commission was rejected",
                backdrop: `rgba(0, 0, 0, 0.8)`
            });
        }
    }

    return (
        <section className="client-cars">
            <div className="client-cars--scroll">
                <div className="search-bar">
                    <input type="text" placeholder="Car id" onChange={e => {
                        setCommissionId(e.target.value)
                    }}/>
                    <button onClick={searchStatusCar}>Search</button>
                </div>
                {car ? car.map((el) => {
                    return (
                        <div key={el.id} className="client-cars__car">
                            <div className="car-info">
                                <p>{el.brand}</p><p>{el.model}</p><p>{el.yearOfProduction}</p>
                            </div>
                            <button onClick={() => {
                                removeCar(el.id)
                            }}>X
                            </button>
                        </div>
                    )
                }) : null}
            </div>
        </section>
    )
}

export default ClientCheckCar;