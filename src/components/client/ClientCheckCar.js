import React, {useEffect, useState} from "react";

const ClientCheckCar = () => {

    const [car, setCar] = useState(null);
    const [reloadCheckCar, setReloadCheckCar] = useState([]);

    const api = "http://localhost:3001/clientCars";

    useEffect(() => {
            fetch(api)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Błąd wczytywania danych")
                })
                .then(data => {
                    setCar(data)
                })
                .catch((err) => console.log(err))
    }, [reloadCheckCar])

    const removeCar = (id) => {
        const areYouSure = window.confirm("Are you sure?");
        if(areYouSure) {
            fetch(`${api}/${id}`, {
                method: "DELETE",
            })
                .catch((err) => console.log(err))
            setReloadCheckCar(id)
        }
    }

    return (
        <section className="client-cars">
            <div className="client-cars--scroll">
            {car ? car.map((el) => {
                return (
                    <>
                        <div key={el.id} className="client-cars__car">
                            <div className="car-info">
                                <p>{el.brand}</p><p>{el.model}</p><p>{el.yearOfProduction}</p>
                            </div>
                            <button onClick={ () => { removeCar(el.id) } }>X</button>
                        </div>
                    </>
                )
            }) : null}
            </div>
        </section>
    )
}

export default ClientCheckCar;