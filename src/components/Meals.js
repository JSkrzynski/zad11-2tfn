import React from "react";

import Details from "./Details";
import DisplayMeals from "./DisplayMeals";
import axios from "axios";

export default function Meals({
                                  meals, setMeals = f => f, setError = f => f, setLoading = f => f,
                                  setRenderDetails = f => f, renderDetails,
                                  setSelectCategory = f => f, selectCategory, setSelectCountry = f => f, selectCountry
                              }) {

    async function fetchMealsBySelected(type, value) {
        let url;
        switch (type) {
            case "category":
                url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + value;
                break;
            case "country":
                url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + value;
                break;
        }

        setLoading(true);

        await axios(url)
            .then((response) => {
                for (const mealKey in response.data.meals) {
                    setMeals(meals => [...meals, response.data.meals[mealKey]]);
                }
            })
            .catch(error => {
                console.log(error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <>
            {renderDetails !== -1 ?
                <Details
                    id={renderDetails}
                    meals={meals}
                    showDetails={id => {
                        setRenderDetails(id)
                    }}
                    setError={setError}
                />
                :
                <DisplayMeals
                    meals={meals}
                    setMeals={newMeals => setMeals(newMeals)}
                    renderDetails={setRenderDetails}
                    showDetails={id => {
                        setRenderDetails(id)
                    }}
                    setCategory={category => {
                        setSelectCategory(category);
                        setSelectCountry(null);
                        setMeals([]);
                        fetchMealsBySelected('category', category);
                    }}
                    selectCategory={selectCategory}
                    setCountry={country => {
                        setSelectCountry(country);
                        setSelectCategory(null);
                        setMeals([]);
                        fetchMealsBySelected('country', country)
                    }}
                    selectCountry={selectCountry}
                    setCategoryAndCountryNull={() => {
                        setSelectCategory(null);
                        setSelectCountry(null);
                    }}
                />
            }
        </>
    );
}