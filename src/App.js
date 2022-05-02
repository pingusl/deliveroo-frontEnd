import Header from "./components/header";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3200/");
        //  console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        //console.log(data);
        // console.log(response.data.restaurant.name);
        // console.log(data);
        // data.restaurant.map((item, index) => {
        //   return console.log(item);
        // });
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading === true ? (
    <h1>En cours de chargement</h1>
  ) : (
    <div className="App">
      <Header />
      <section className="banner">
        <div className="restaurant">
          <div className="restaurant-name">{data.restaurant.name}</div>
          <div className="restaurant-text">{data.restaurant.description}</div>
        </div>
        <div>
          <img
            className="restaurant-picture"
            src={data.restaurant.picture}
            alt="resto"
          />
        </div>
      </section>
      <section className="categories">
        {data.categories.map((categorie, categorieKey) => {
          console.log(categorie);

          return (
            <div>
              <div className="categorie-name" key={categorieKey}>
                {categorie.name}
              </div>
              <div
                className="categorie-meals"
                key={categorie.name + categorieKey}
              >
                {categorie.meals.map((meal, mealKey) => {
                  // console.log(meal);
                  return (
                    <div className="categorie-meal" key={mealKey}>
                      <section>
                        <legend>{meal.title}</legend>
                        <article>{meal.description}</article>
                        <p>{meal.price}</p>
                        {meal.popular}
                      </section>
                      <div>
                        <img className="meal-picture" src={meal.picture} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default App;
