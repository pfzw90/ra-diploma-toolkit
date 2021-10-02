import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '../reducers/cartReducer';
import CategoriesReducer from '../reducers/categoriesReducer';
import filterReducer from '../reducers/filterReducer';
import itemDetailsReducer from '../reducers/itemDetailsReducer';
import itemsReducer from '../reducers/itemsReducer';
import SearchReducer from '../reducers/searchReducer';
import topSalesReducer from '../reducers/topSalesReducer';
import cartItemsReducer from '../reducers/cartItemsReducer';
import orderFormReducer from '../reducers/orderFormReducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartitems'],
};

const rootReducer = combineReducers({
  search: SearchReducer,
  categories: CategoriesReducer,
  filter: filterReducer,
  topsales: topSalesReducer,
  item: itemDetailsReducer,
  items: itemsReducer,
  cart: cartReducer,
  cartitems: cartItemsReducer,
  orderform: orderFormReducer,
});

const persistRoot = persistReducer(rootPersistConfig, rootReducer);
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(persistRoot, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
