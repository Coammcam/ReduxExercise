import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  listExpense: [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense(state, action) {
      state.listExpense.push(action.payload);
    },
    updateExpense(state, action) {
      const index = state.listExpense.findIndex(
        expense => expense.id === action.payload.id,
      );
      if (index !== -1) {
        state.listExpense[index] = action.payload;
      }
    },
    deleteExpense(state, action) {
      state.listExpense = state.listExpense.filter(
        expense => expense.id !== action.payload.id,
      );
    },
  },
});

export const {addExpense, updateExpense, deleteExpense} = expenseSlice.actions;
export default expenseSlice.reducer;
