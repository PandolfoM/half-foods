import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";

function CategoryMenu() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Shop by Category:</h2>
      <Dropdown>
        <Dropdown.Toggle variant="success">
          Categories
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categories.map((item) => (
            <Dropdown.Item key={item._id} onClick={() => {handleClick(item._id)}}>{item.name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default CategoryMenu;
