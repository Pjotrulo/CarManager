import React, {useEffect, useState} from "react";

const GarageDoneCar = ({databaseApi}) => {

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

    return (
        <section className="garage-done-cars">
            <div className="garage-done-cars--scroll">
                {doneCar ? doneCar.map(el => {
                    if(el.status === "Done") {
                        return (
                            <div className="garage-done-cars__car">
                                <div className="about-car"><p>{el.car}</p> <p>{el.description}</p> <p>{el.phoneNumber}</p></div>
                                <button>Done</button>
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