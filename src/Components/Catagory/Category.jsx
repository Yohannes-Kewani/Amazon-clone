import React from "react";
import { categoryInfos } from "./CategoryFullInfos.jsx";
import CategoryCard from "./CategoryCard";
import classes from './Category.module.css'
function Category() {
  return (
    <section className={classes.category_container}>
      {categoryInfos.map((info) => (
        <CategoryCard data={info} />
      ))}
    </section>
  );
}

export default Category;
