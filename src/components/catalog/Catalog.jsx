import React from 'react';
import Search from '../search/Search.jsx';
import Categories from './categories/Categories.jsx';
import Items from './items/Items.jsx';

export default function Catalog() {
  return (
  <React.Fragment>
  <section className="catalog">
    <h2 className="text-center">Каталог</h2>
    <Search prefix="catalog" />
    <Categories/>
    <Items/>
  </section>
  </React.Fragment>
  );
}
