import {configureStore} from '@reduxjs/toolkit';
import ExpenseMngReducer from '../reducers/ExpenseMngReducer';

export default configureStore({
  reducer: {
    listExpense: ExpenseMngReducer,
  },
});

