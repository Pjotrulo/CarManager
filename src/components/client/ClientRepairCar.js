import React, {useEffect, useState} from "react";
import ReactPhoneInput from "react-phone-input-2";

const ClientRepairCar = ({databaseApi, Swal}) => {

    const [car, setCar] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [commissionId, setCommissionId] = useState("");
    const [selectedGarage, setSelectedGarage] = useState(null);
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

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

        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                characters.length));
        }
        setCommissionId(result);
    }, [databaseApi]);

    const carData = {
        "car": selectedCar,
        "garage": selectedGarage,
        "phoneNumber": "+" + phoneNumber,
        "description": description,
        "commission": commissionId,
        "status": "Waiting"
    }

    const assignRegistrationId = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                characters.length));
        }
        setCommissionId(result);
    }

    const sendCommission = () => {
        fetch(`${databaseApi}/commission`, {
            method: "POST",
            body: JSON.stringify(carData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Couldn't get car data")
            })
            .catch((err) => console.log(err))
        Swal.fire({
            title: "Your commission id is:".concat(" ") + commissionId,
            buttonsStyling: false,
            icon: "info",
            backdrop: `rgba(0, 0, 0, 0.8)`
        });
    }

    return (
        <section className="main-repair-car">
            <form className="form">
                <select onChange={e => {
                    setSelectedCar(e.target.value)
                }}>
                    <option>Choose car</option>
                    {
                        car ? car.map((el) => {
                            return <option key={el.id}>{el.brand} {el.model} {el.yearOfProduction}</option>
                        }) : null
                    }
                </select>
                <select onChange={e => {
                    setSelectedGarage(e.target.value)
                }}>
                    <option>Choose Garage</option>
                    <option>Garage nr1</option>
                    <option>Garage nr2</option>
                    <option>Garage nr3</option>
                </select>
                <label>
                    <ReactPhoneInput placeholder="Phone number" value={phoneNumber} onChange={setPhoneNumber}/>
                </label>
                <textarea
                    maxLength={50}
                    className="form__textarea"
                    placeholder="Describe your car malfunction"
                    onChange={e => {
                        setDescription(e.target.value)
                    }}>
                </textarea>
                {
                    selectedCar && selectedGarage && phoneNumber.length >= 8 ?
                        <button type="submit" onClick={e => {
                            e.preventDefault();
                            assignRegistrationId();
                            sendCommission();
                        }}>
                            Send
                        </button> : <button onClick={e => e.preventDefault()}
                                            style={{opacity: 0.6, cursor: "not-allowed"}}>Send</button>
                }
            </form>
        </section>
    )
}

export default ClientRepairCar;