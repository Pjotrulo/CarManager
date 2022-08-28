import React, {useEffect, useState} from "react";

const ClientCheckCar = () => {

    const [car, setCar] = useState(null);

    const api = "http://localhost:3001/cars";

    useEffect(() => {
        fetch(api)
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                throw new Error("Błąd wczytywania danych")
            })
            .then(data => {
                setCar(data)
            })
            .catch((err) => console.log(err))
    }, [])

    console.log(car);

    return (
        <ul className="list">
            {car ? car.map((el, id) => {
                return (
                    <li key={id}>{el.brand}-{el.model}-{el.yearOfProduction}</li>
                )
            }) : null}
        </ul>
    )
}

export default ClientCheckCar;