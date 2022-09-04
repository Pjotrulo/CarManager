import React, {useEffect, useLayoutEffect, useState} from "react";

const ClientCheckCar = ({databaseApi}) => {

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
        const areYouSure = window.confirm("Are you sure?");
        if (areYouSure) {
            setReloadCheckCar(id)
            fetch(`${databaseApi}/clientCars/${id}`, {
                method: "DELETE",
            })
                .catch((err) => console.log(err))
        }
    }

    const searchStatusCar = () => {
        carFromCommission.map(el => {
            if (commissionId === el.commission) {
                alert(`${el.car}`.concat(" ") + "Status:".concat(" ") + `${el.status}`);
            }
            return null;
        })
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