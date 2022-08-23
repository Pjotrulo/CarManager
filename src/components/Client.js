import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";

const Client = () => {

    const api = "https://private-anon-0c45208108-carsapi1.apiary-mock.com/cars";

    const [car, setCar] = useState(null);

    const [brand, setBrand] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [year, setYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [buttonStatus, setButtonStatus] = useState(false);

    useEffect(() => {
        fetch(api)
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                throw new Error("Błąd wczytania danych")
            })
            .then(data => {
                setCar(data)
                data.map(el => {
                    return setBrand(prev => [...prev, el.make])
                })
            })
            .catch((err) => console.log(err))

        const years = () => {
            for(let i = 1950; i <= 2022; i++) {
                setYear(prev => [...prev, i]);
            }
        }
        return () => {
            years();
        }
    }, [])

    const allBrands = [];
    const deleteDuplicateBrands = () => {
        for (let i = 0; i <= brand.length; i++) {
            if (brand[i] !== brand[i + 1]) {
                allBrands.push(brand[i]);
            }
        }
    }
    deleteDuplicateBrands();

    const databaseApi = "http://localhost:3001";

    const dataCar = {
        brand: selectedBrand,
        model: selectedModel,
        yearOfProduction: selectedYear
    }

    const addCar = () => {
        fetch(`${databaseApi}/cars`, {
            method: "POST",
            body: JSON.stringify(dataCar),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                throw new Error("Błąd wczytania danych")
            })
            .then(dataCar => {
                console.log(dataCar);
            })
            .catch((err) => console.log(err))
    }

    console.log(buttonStatus);

    return (
        <>
            <Header/>
            {buttonStatus === false ? <section className="main">
                <h2 className="main__title">Fill Car Information</h2>
                <form className="main__form">
                    <label>Brand:
                        <select onChange={e => setSelectedBrand(e.target.value)}>
                            {brand ? allBrands.map((el, id) => {
                                return (
                                    <option key={id}>{ el }</option>
                                )
                            }) : null}
                        </select>
                    </label>
                    <label>Model:
                        <select onChange={e => setSelectedModel(e.target.value)}>
                            {car ? car.map((el, id) => {
                                if(el.make === selectedBrand) {
                                    return (
                                        <option key={id}>{ el.model }</option>
                                    )
                                }
                                return null;
                            }) : null}
                        </select>
                    </label>
                    <label>Year of production:
                        <select onChange={e => setSelectedYear(e.target.value)}>
                            {year ? year.map((el, id) => {
                                return <option key={id}>{ el }</option>
                            }) : null}
                        </select>
                    </label>
                    <button type="submit" onClick={(e) => {e.preventDefault(); addCar(); buttonStatus ? setButtonStatus(false) : setButtonStatus(true) }}>Add car</button>
                </form>
            </section> : "Znikam"}
            <Footer />
        </>
    )
}

export default Client;