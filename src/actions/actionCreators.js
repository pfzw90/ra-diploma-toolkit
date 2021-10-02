import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { store } from '../store/index';

// helpers
const testImage = (image) => new Promise((resolve) => {
  const img = new Image();
  const clear = () => clearTimeout(imageWaiting);
  let imageWaiting = setTimeout(() => {
    clear();
    resolve(null);
  }, 5000);

  img.src = image;
  img.onerror = () => resolve(null);
  img.onload = () => resolve(image);
});

const testImages = async (images) => {
  const testResults = await Promise.allSettled(images.map((image) => testImage(image)));
  return testResults;
};

const fetchItemData = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}/${id}`);
  const data = await response.json();
  return data;
};

const fetchItems = async (url, params) => {
  const response = await fetch(url + ((params) ? `?${new URLSearchParams(params)}` : ''));
  const data = await response.json();
  const result = await Promise.all(data.map(async (item) => {
    const images = await testImages(item.images);
    const workingImg = images.find((i) => i.value !== null);
    return { ...item, img: (workingImg) ? workingImg.value : null };
  }));
  return result;
};

// filter
export const changeCategory = createAction('filter/changeCategory');
export const resetCategory = createAction('filter/resetCategory');
export const setOffset = createAction('filter/setOffset');
export const resetOffset = createAction('filter/resetOffset');
export const initSearch = createAction('filter/initSearch');
export const resetQuery = createAction('filter/resetQuery');

// search
export const changeSearch = createAction('search/changeSearch');
export const toggleSearchOpacity = createAction('search/toggleSearchOpacity');

// items
export const resetItems = createAction('items/resetItems');
export const getItems = createAsyncThunk(
  'items/getItems',
  async (params) => {
    const result = await fetchItems(process.env.REACT_APP_ITEMS_URL, params);
    return result;
  },
);

// itemdetails
export const selectSize = createAction('itemdetails/selectSize');
export const changeQuantity = createAction('itemdetails/changeQuantity');
export const toggleDeleteCartItem = createAction('cartitems/toggleDeleteCartItem');
export const addCartTooltip = createAction('itemdetails/addCartTooltip');

export const getItemDetails = createAsyncThunk(
  'itemdetails/getItemDetails',
  async (id) => {
    const data = await fetchItemData(id);
    return {
      ...data,
      avaliableSizes: data.sizes.reduce(
        (prev, curr) => ((curr.avalible) ? [...prev, curr.size] : prev), [],
      ),
    };
  },
);

// cart items
export const addToCart = createAction('cartitems/addToCart');
export const clearCart = createAction('cartitems/clearCart');
export const removeDeleted = createAction('cartitems/removeDeleted');

// cart
export const fetchPrices = createAsyncThunk(
  'cart/fetchPrices',
  async (items) => {
    const data = await Promise.all(items.map(async (i) => fetchItemData(i.id)));
    return data;
  },
);

// orderform
export const changeOrderForm = createAction('orderform/changeOrderForm');
export const checkPhone = createAction('orderform/checkPhone');
export const checkAddress = createAction('orderform/checkAddress');
export const updateOrderStatus = createAction('orderform/updateOrderStatus');
export const sendOrderRequest = createAsyncThunk(
  'orderform/sendOrderRequest',
  async (order) => {
    await fetch(process.env.REACT_APP_ORDER_URL, { method: 'POST', body: JSON.stringify(order) });
    updateOrderStatus('success');
    setTimeout(() => {
      store.dispatch(updateOrderStatus('idle'));
      store.dispatch(clearCart());
    }, 1500);
  },
);

// top sales
export const getTopSales = createAsyncThunk(
  'topsales/fetchTopSales',
  async () => {
    const result = await fetchItems(process.env.REACT_APP_TOP_SALES_URL);
    return result;
  },
);

// categories
export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    const response = await fetch(process.env.REACT_APP_CATEGORIES_URL);
    const data = await response.json();
    return data;
  },
);
