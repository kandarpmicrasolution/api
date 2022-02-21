import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "../../helpers/axios";

import initialStates from "./state";

export const getCustomer = createAsyncThunk("customer", async () => {
  try {
    const response = await axios.get(
      "http://192.168.0.194:9000/api/v1/customer"
    );
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    // return rejectWithValue(error.response.data)
  }
});

// // createCustomer
export const createCustomer = createAsyncThunk('createCustomer', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://192.168.0.194:9000/api/v1/customer', data)

        return response
    } catch (error) {
        if (!error.response) {
            throw error
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(error.response.data)
    }
})

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStates,
  extraReducers: {
    [getCustomer.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCustomer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.getCustomer = action.payload;
    },
    [getCustomer.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.errorMessage;
    },
    [createCustomer.pending]: (state, action) => {
      state.status = "loading";
    },
    [createCustomer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.createCustomer = action.payload;
    },
    [createCustomer.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.errorMessage;
    },
  },
});

const { reducer } = customerSlice;
export default reducer;
