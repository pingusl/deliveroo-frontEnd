import Header from "./components/header";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [basket, setBasket] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState("Votre panier est vide");
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

  // useEffect(() => {

  // });

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
                        onClick={() => {
                          const newBasket = [...basket];
                          newBasket.push(meal);
                          setBasket(newBasket);
                          //---- Calcul du montant total----//
                          newBasket.map((item, key) => {
                            // let type = typeof item.price;
                            // console.log(Number(item.price));
                            setSubTotal(subTotal + Number(item.price));
                          });
                          console.log(subTotal);
                          setTotal(subTotal + 2.5);
                        }}
                      >
                        <section>
                          <legend>{meal.title}</legend>
                          <article>{meal.description}</article>
                          <p>{meal.price}</p>
                          {meal.popular}
                        </section>
                        <div>
                          <img
                            className="meal-picture"
                            src={meal.picture}
                            alt={meal.title}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
        <section className="basket">
          <button className="valid-bt">Valider mon panier</button>
          <div className="ticket">
            {basket.map((item, key) => {
              return (
                <section className="basket-row" key={key}>
                  <span>{item.id}</span>
                  <span>{item.title}</span>
                  <span>{item.price}€</span>
                </section>
              );
            })}
          </div>
          <div className="total">{total}</div>
        </section>
      </div>
    </div>
  );
}

export default App;
