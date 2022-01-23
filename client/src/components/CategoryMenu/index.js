import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES, QUERY_DIETS } from "../../utils/queries";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_DIETS,
  UPDATE_CURRENT_DIETS,
} from "../../utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import { idbPromise } from "../../utils/helpers";

function CategoryMenu() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { categories, diets, currentCategory, currentDiet } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const { data: dietData } = useQuery(QUERY_DIETS);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    }

    if (dietData) {
      dispatch({
        type: UPDATE_DIETS,
        diets: dietData.diets,
      });
      dietData.diets.forEach((diet) => {
        idbPromise("diets", "put", diet);
      });
    }
  }, [categoryData, dietData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  const handleDietClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_DIETS,
      currentDiet: id,
    });
  };

  return (
    <div>
      <h2>All Products:</h2>
      <Dropdown as="ul">
        <DropdownButton as="li" variant="success" title={"Categories"} size="sm">
          {categories.map((item) => (
            <Dropdown.Item
              key={item._id}
              onClick={() => {
                handleClick(item._id);
              }}>
              {item.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton as="li" variant="success" title={"Dietary Preference"} size="sm">
          {diets.map((item) => (
            <Dropdown.Item
              key={item._id}
              onClick={() => {
                handleDietClick(item._id);
              }}>
              {item.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        {currentDiet || currentCategory ? (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              handleDietClick("");
              handleClick("");
            }}>
            Clear
          </Button>
        ) : null}
      </Dropdown>
    </div>
  );
}

export default CategoryMenu;
