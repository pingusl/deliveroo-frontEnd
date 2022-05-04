import Header from "./components/header";
import plus from "./img/deliveroo-plus-bt.png";
import minus from "./img/deliveroo-minus-bt.png";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [basket, setBasket] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState("Votre panier est vide");
  //const [quantity, setQuantity] = useState(1);
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
                          //----basket copy----//
                          const newBasket = [...basket];
                          //----Trouve l'objet dans lequel est contenu le id avec la methode find()----//
                          const isItemAlreadyInBasket = basket.find(
                            (item) => item.id === meal.id
                          );

                          //----Y a t il un enregistrement dans le basket avec id du menu cliquer----//
                          console.log(isItemAlreadyInBasket);

                          if (isItemAlreadyInBasket === undefined) {
                            //----Si l'id du menu n'existe pas dans le ticket, Ajouter le meal au Basket
                            newBasket.push({
                              id: meal.id,
                              price: Number(meal.price),
                              title: meal.title,
                              quantity: 1,
                            });
                          } //----Si la clef quantity existe, ajouter 1 a la valeur de quantity
                          else isItemAlreadyInBasket.quantity++;

                          // meal.quantity
                          //   ? //----Si la clef quantity existe, ajouter 1 a la valeur de quantity
                          //     console.log((meal.quantity = meal.quantity + 1))
                          //   : //----Si la clef quantity n'existe pas, la creer avec une valeur 1
                          //     (meal.quantity = 1);

                          // console.log(newBasket[mealKey]);

                          setBasket(newBasket);
                          let totalize = 0;
                          //---- Calcul du sous-total----//
                          newBasket.map((item, key) => {
                            // let type = typeof item.price;
                            // console.log(Number(item.price));
                            totalize = totalize + Number(item.price);
                            setSubTotal(totalize);
                          });
                          //----Calcul du montant total----//
                          //console.log(totalize);

                          setTotal(totalize + 2.5); //Articles + delivery
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
          <div className="ticket-list">
            {basket.map((item, key) => {
              return (
                <section className="basket-row" key={key}>
                  <span className="counter">
                    <img className="img-bt" src={plus} />
                    <p> {item.quantity} </p>
                    <img className="img-bt" src={minus} />
                  </span>
                  <span className="text">{item.title}</span>
                  <span className="amount">{item.price} €</span>
                </section>
              );
            })}
          </div>
          {total === "Votre panier est vide" ? (
            <div></div>
          ) : (
            <div className="ticket-billing">
              <div className="sub-total">
                <span className="text">Sous-Total</span>
                <span className="amount"> {subTotal} €</span>
              </div>
              <div className="delivery-charge">
                <span className="text">Frais de livraison</span>
                <span className="amount"> 2.50 €</span>
              </div>
              <div className="total">
                <span className="text">Total</span>
                <span className="amount"> {total} €</span>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
