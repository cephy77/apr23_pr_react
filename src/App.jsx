import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductList } from './components/ProductList/ProductList';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(categoryItem => (
    categoryItem.id === product.categoryId
  ));
  const user = usersFromServer.find(userItem => (
    category.ownerId === userItem.id
  ));

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [userFilter, setUserFirler] = useState(null);

  const visibleProducts = products.filter((product) => {
    if (userFilter) {
      return product.user.name === userFilter;
    }

    return product;
  });

  const resetAllFilters = () => {
    setUserFirler(null);
  };

  const handleSelectUser = (userName) => {
    if (userFilter !== userName) {
      setUserFirler(userName);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={classNames({
                  'is-active': userFilter === null,
                })}
                onClick={() => {
                  handleSelectUser(null);
                }}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames({
                    'is-active': userFilter === user.name,
                  })}
                  onClick={() => {
                    handleSelectUser(user.name);
                  }}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>
              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetAllFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <ProductList products={visibleProducts} />
      </div>
    </div>
  );
};
