import Header from "./components/header";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [basket, setBasket] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3200/");

        setData(response.data);
        setIsLoading(false);
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
      <div className="main">
        <section className="categories">
          {data.categories.map((categorie, categorieKey) => {
            // console.log(categorie);

            return (
              <div key={categorieKey}>
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
                      <div
                        className="categorie-meal"
                        key={meal.id}
                        onClick={(event) => {
                          event.preventDefault();
                          alert(`le menu a été cliqué!`);
                        }}
                      >
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
        <section className="panier">
          <button className="valid-bt">Valider mon panier</button>
        </section>
      </div>
    </div>
  );
}

export default App;
