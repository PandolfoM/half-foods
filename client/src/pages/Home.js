import React, { useState } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { searchFoodProducts, searchFoodProducts2 } from "../utils/api";

function Home() {
  const [searchedFood, setSearchedFood] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  let food;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      searchFoodProducts(searchInput).then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("something went wrong");
          }
        }).then(function (data) {
          food = data

          let foodData = food.results.map(food => ({
            foodId: food.id
          }))

          for (let i = 0; i < foodData.length; i++) {
            let foodIds = foodData[i].foodId
            return searchFoodProducts2(foodIds)
          }
        }).then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("something went wrong");
          }
        }).then(function (data) {
          
          console.log(food, data);
          let foodData = food.results.map(food => ({
            foodId: food.id,
            foodName: food.name,
            foodImage: food.image,
          }))
          setSearchedFood(foodData)
        }).catch (function (err) {
          console.error(err)
        })


      // const { results } = await response.json();

      // const foodData = results.map((food) => ({
      //   foodId: food.id,
      //   foodName: food.name,
      //   foodImage: food.image,
      // }));

      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            placeholder="Search"
            value={searchInput}
            name="search"
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </form>
      <h2>{searchedFood.length ? `${searchedFood.length} results:` : null}</h2>
      <ul>
        {searchedFood.map((food) => {
          return (
            <li key={food.foodId}>
              {food.foodImage ? (
                <img
                  src={`https://spoonacular.com/cdn/ingredients_250x250/${food.foodImage}`}
                  alt={food.foodName}
                />
              ) : null}
              <h5>{food.foodName}</h5>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
