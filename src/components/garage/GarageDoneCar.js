import React, {useEffect, useState} from "react";

const GarageDoneCar = ({databaseApi}) => {

    const [doneCar, setDoneCar] = useState(null);
    const [selectedDoneCar, setSelectedDoneCar] = useState(null);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(null);

    useEffect(() => {
        fetch(`${databaseApi}/commission`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Błąd wczytywania danych")
            })
            .then(data => {
                setDoneCar(data);
            })
            .catch((err) => console.log(err))
    }, [databaseApi])

    const commissionData = {
        car: selectedDoneCar,
        description: description,
        price: price + "zł"
    }

    const sendDoneCarToClient = () => {
        fetch(`${databaseApi}/done`, {
            method: "POST",
            body: JSON.stringify(commissionData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Błąd wczytania danych")
            })
            .catch((err) => console.log(err))
    }

    return (
        <section className="garage-done-cars">
            <form className="form">
                <select onChange={e => {
                    setSelectedDoneCar(e.target.value)
                }}>
                    <option>Choose car</option>
                    {doneCar ? doneCar.map(el => {
                        if (el.status === "gotowy") {
                            return (
                                <option key={el.id}>{el.car}</option>
                            )
                        }
                        return null;
                    }) : null}
                </select>
                <textarea className="form__textarea" placeholder="Description about done car" maxLength={100}
                          onChange={e => {
                              setDescription(e.target.value)
                          }}></textarea>
                <label>
                    <input type="number" onChange={e => {setPrice(e.target.value)}}/>
                </label>
                { selectedDoneCar && description.length >= 10 && price.length >= 1 ? <button onClick={e => {e.preventDefault(); sendDoneCarToClient()}}>Send</button> : <button onClick={e => e.preventDefault()} style={{opacity: 0.6, cursor: "not-allowed"}}>Send</button> }
            </form>
        </section>
    )
}

export default GarageDoneCar;