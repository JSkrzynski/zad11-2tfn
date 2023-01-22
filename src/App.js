import './style.css';
import React, {useState, useEffect} from "react";
import axios from 'axios';

import Meals from "./components/Meals";

function App() {
    const [meals, setMeals] = useState([]);
    const [renderDetails, setRenderDetails] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectCategory, setSelectCategory] = useState(null);
    const [selectCountry, setSelectCountry] = useState(null);

    async function fetchRandomMeals() {
        for (let i = 0; i < 10; i++) {
            await axios("https://www.themealdb.com/api/json/v1/1/random.php")
                .then((response) => {
                    setMeals(meals => [...meals, response.data.meals[0]]);
                })
                .catch(error => {
                    console.log(error);
                    setError(error);
                })
        }
    }

    useEffect(() => {
        fetchRandomMeals().finally(() => setLoading(false));
    }, []);

    if (loading) return <h1>loading...</h1>;
    if (error) return <pre>{JSON.stringify(error)}</pre>;

    return (
        <>
            <Meals
                meals={meals}
                setMeals={(newMeals) => setMeals(newMeals)}
                setError={(e) => setError(e)}
                setLoading={(l) => setLoading(l)}
                setRenderDetails={(r) => {setRenderDetails(r)}}
                renderDetails={renderDetails}
                setSelectCategory={(cat) => {setSelectCategory(cat)}}
                selectCategory={selectCategory}
                setSelectCountry={(country) => {setSelectCountry(country)}}
                selectCountry={selectCountry}
            />
        </>
    );
}

export default App;
