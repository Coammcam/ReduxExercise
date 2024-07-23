import {createAsyncThunk} from '@reduxjs/toolkit';
import {addExpense} from '../reducers/ExpenseMngReducer';

const api = 'https://669664420312447373c25a15.mockapi.io/expensemanagerment';

export const fetchExpense = createAsyncThunk(
  'expense/fetchExpense',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addExpenseApi = createAsyncThunk(
  'expense/addExpenseApi',
  async (objExpense, thunkAPI) => {
    // console.log(objExpense);
    try {
      const res = await fetch(api, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objExpense),
      });
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateExpenseApi = createAsyncThunk(
  'expense/updateExpenseApi',
  async (objUpdate, thunkAPI) => {
    try {
      const res = await fetch(`${api}/${objUpdate.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objUpdate.data),
      });

      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteExpenseApi = createAsyncThunk(
  'expense/deleteExpenseApi',
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`${api}/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        return id;
      } else {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
