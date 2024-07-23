import {createSlice} from '@reduxjs/toolkit';
import {
  fetchExpense,
  deleteExpenseApi,
  addExpenseApi,
  updateExpenseApi,
} from '../actions/ExpenseMngAction';

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
    
  },
  extraReducers: builder => {
    builder
      // fetch expense
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.listExpense = action.payload;
      })
      .addCase(fetchExpense.rejected, (state, action) => {
        console.log('Fetch expense rejected', action.error.message);
      })
      // add expense
      .addCase(addExpenseApi.fulfilled, (state, action) => {
        state.listExpense.push(action.payload);
      })
      .addCase(addExpenseApi.rejected, (state, action) => {
        console.log('Add expense rejected', action.error.message);
      })
      // update expense
      .addCase(updateExpenseApi.fulfilled, (state, action) => {
        const {id, title, description, incomeDate, incomeType, amount} =
          action.payload;

        const expense = state.listExpense.find(row => row.id === id);
        if (expense) {
          expense.title = title;
          expense.description = description;
          expense.incomeDate = incomeDate;
          expense.incomeType = incomeType;
          expense.amount = amount;
        }
      })
      .addCase(updateExpenseApi.rejected, (state, action) => {
        console.log('Update expense rejected:', action.error.message);
      })
      // delete expense
      .addCase(deleteExpenseApi.fulfilled, (state, action) => {
        state.listExpense = state.listExpense.filter(
          row => row.id !== action.payload,
        );
      })
      .addCase(deleteExpenseApi.rejected, (state, action) => {
        console.log('Delete expense rejected', action.error.message);
      });
  },
});

export const {addExpense, updateExpense} = expenseSlice.actions;
export default expenseSlice.reducer;
