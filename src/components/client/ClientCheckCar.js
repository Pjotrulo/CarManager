import React, {useEffect, useLayoutEffect, useState} from "react";

const ClientCheckCar = ({databaseApi, Swal}) => {

    const [car, setCar] = useState(null);
    const [reloadCheckCar, setReloadCheckCar] = useState([]);
    const [carFromCommission, setCarFromCommission] = useState(null);
    const [commissionId, setCommissionId] = useState(null);

    useLayoutEffect(() => {
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
    }, [databaseApi, reloadCheckCar])

    const removeCar = (id) => {
        Swal.fire({
            title: "Are you sure?",
            toast: true,
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
                    setReloadCheckCar(id);
                    fetch(`${databaseApi}/clientCars/${id}`, {
                        method: "DELETE"
                    })
                        .catch((err) => {
                            console.log(err)
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
                Swal.fire(`${el.car}`.concat(" ") + "Status:".concat(" ") + `${el.status}`);
            } else if (commissionId !== el.commission) {
                arrayWithRejectedCars.push(el.id)
            }
            return null;
        })
        if (arrayWithRejectedCars.length === arrayWithAllCommissionCars.length) {
            Swal.fire({
                title: "Your commission was rejected",
            });
        }
    }

    return (
        <section className="client-cars">
            <div className="client-cars--scroll">
                <div className="search-bar">
                    <input type="text" onChange={e => {
                        setCommissionId(e.target.value)
                    }}/>
                    <button style={{width: "4rem"}} onClick={searchStatusCar}>Search</button>
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