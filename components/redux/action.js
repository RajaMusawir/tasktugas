export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
export const addItemToCart = (item) => ({
    type: 'ADD_ITEM_TO_CART',
    payload: item,
})

export const SET_THEME = 'SET_THEME';
export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});
