import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";

const Client = () => {

    const api = "https://private-anon-0c45208108-carsapi1.apiary-mock.com/cars";

    const [car, setCar] = useState(null);

    const [brand, setBrand] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [model, setModel] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    // const [year, setYear] = useState("");

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
                data.map(el => {
                    return setModel(prev => [...prev, el.model])
                })
                console.log(data)
            })
            .catch((err) => console.log(err))
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

    return (
        <>
            <Header/>

            <select onChange={e => setSelectedBrand(e.target.value)}>
                {brand ? allBrands.map((el, id) => {
                    return (
                        <option key={id}>{ el }</option>
                    )
                }) : "Loading..."}
            </select>

            <select onChange={e => setSelectedModel(e.target.value)}>
                {car ? car.map((el, id) => {
                    if(el.make === selectedBrand) {
                        return (
                            <option key={id}>{ el.model }</option>
                        )
                    }
                }) : null}
            </select>

            <Footer />
        </>
    )
}

export default Client;