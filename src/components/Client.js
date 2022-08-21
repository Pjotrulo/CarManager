import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";

const Client = () => {

    const api = "https://private-anon-0c45208108-carsapi1.apiary-mock.com/cars";

    const [brand, setBrand] = useState([]);

    useEffect(() => {
        fetch(api)
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                throw new Error("Błąd wczytania danych")
            })
            .then(data => {
                data.map(el => {
                   return setBrand(prev => [...prev, el.make])
                })
            })
            .catch((err) => console.log(err))
    }, [])

    const allBrands = [];

    // const [model, setModel] = useState("");
    // const [year, setYear] = useState("");

        const check = () => {
            for (let i = 0; i <= brand.length; i++) {
                if (brand[i] !== brand[i + 1]) {
                    allBrands.push(brand[i]);
                }
            }
        }
        check();


    return (
        <>
            <Header/>

            <select>
                {brand ? allBrands.map( el => {
                    return (
                        <option>{ el }</option>
                    )
                }) : "Loading..."}
            </select>

            <Footer />
        </>
    )
}

export default Client;