import { publicSend, UserSend } from "../Axios";
import {
  getLogFailure,
  getLogStart,
  getLogSuccess,
  getSignFailure,
  getSignStart,
  getSignSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./AuthSlice";
import { AddCartFailure, AddCartProduct } from "./CartSlice";

import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "./ProductSlice";

//Add products

export const AddProducts = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await publicSend.post("/api/products/", product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(addProductFailure());
  }
};

export const getProducts = async (product, dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await UserSend.post("/api/products/all", product);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getProductFailure());
  }
};

export const LogIn = async (dispatch, user) => {
  dispatch(getLogStart());
  try {
    const res = await publicSend.post("/api/auth/login", {
      user,
    });
    dispatch(getLogSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getLogFailure());
  }
};
export const signIn = async (dispatch, user) => {
  dispatch(getSignStart());
  try {
    const res = await publicSend.post("/api/auth/signIn", {
      user,
    });
    dispatch(getSignSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getSignFailure());
  }
};
export const UpdateUser = async (updateUser, id, dispatch) => {
  dispatch(updateUserStart());

  try {
    const res = await publicSend.put("/api/users/" + id, updateUser);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(updateUserFailure());
  }
};

export const AddCart = async (
  userId,
  quantity,
  productId,
  products,
  price,
  dispatch
) => {
  try {
    const res = await UserSend.post("/api/cart/", {
      userId,
      quantity,
      productId,
    });

    dispatch(AddCartProduct({ products, price, quantity }));
  } catch (err) {
    console.log(err);
    dispatch(AddCartFailure());
  }
};
