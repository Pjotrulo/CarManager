import React, {useEffect, useState} from "react";

const ClientRepairCar = () => {

    const [car, setCar] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [registrationId, setRegistrationId] = useState(null);

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
    }, []);

    const assignRegistrationId = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( let i = 0; i < 10; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                characters.length));
        }
        setRegistrationId(result);
    }

    return (
        <section className="main-repair-car">
            <form className="form">
                <select onChange={e => {setSelectedCar(e.target.value)}}>
                    <option>Choose car</option>
                    {
                        car ? car.map((el) => {
                            return <option>{el.brand} {el.model} { el.yearOfProduction }</option>
                        }): null
                    }
                </select>
                <select>
                    <option>Garage</option>
                </select>
                <textarea className="form__textarea" placeholder="Describe your car malfunction"></textarea>
                <button type="submit" onClick={e => {e.preventDefault(); assignRegistrationId()}}>Send</button>
            </form>
        </section>
    )
}

export default ClientRepairCar;