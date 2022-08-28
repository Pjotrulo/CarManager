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

    return (
        <section className="client-cars">
            <div className="client-cars--scroll">
            {car ? car.map((el, id) => {
                return (
                    <>
                        <div key={id} className="client-cars__car"><p>{el.brand}</p><p>{el.model}</p><p>{el.yearOfProduction}</p></div>
                    </>
                )
            }) : null}
            </div>
        </section>
    )
}

export default ClientCheckCar;