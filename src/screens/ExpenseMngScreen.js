import {useDispatch, useSelector} from 'react-redux';
import {
  addExpense,
  updateExpense,
  deleteExpense,
  fetchExpense as fetchExpensesReducer,
} from '../redux/reducers/ExpenseMngReducer';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {
  deleteExpenseApi,
  fetchExpense as fetchExpensesApi,
  updateExpenseApi,
  addExpenseApi,
} from '../redux/actions/ExpenseMngAction';

const ExpenseMngScreen = () => {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [incomeDate, setIncomeDate] = useState('');
  const [incomeType, setIncomeType] = useState('income');
  const [amount, setAmount] = useState('');

  const [idEdit, setIdEdit] = useState(null);

  const listExpense = useSelector(state => state.listExpenseStore.listExpense);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const resultAction = await dispatch(fetchExpensesApi());
      if (fetchExpensesApi.fulfilled.match(resultAction)) {
        console.log('Fetch successful:', resultAction.payload);
      } else {
        console.error('Fetch failed:', resultAction.payload);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddExpense = () => {
    let data = {
      id: id ? id : Math.random().toString(),
      title,
      description,
      incomeDate,
      incomeType,
      amount: parseFloat(amount),
    };

    if (idEdit) {
      dispatch(updateExpenseApi({id: idEdit, data: data}))
        .then(result => {
          console.log('Expense updated successfully!');
          setIdEdit(null);
          dispatch(fetchExpensesApi());
        })
        .catch(error => {
          console.error('Error updating expense:', error);
        });
    } else {
      dispatch(addExpenseApi(data)).then(() => dispatch(fetchExpensesApi()));
    }
    resetForm();
  };

  const handleEditExpense = (
    id,
    title,
    description,
    incomeDate,
    incomeType,
    amount,
  ) => {
    setId(id);
    setTitle(title);
    setDescription(description);
    setIncomeDate(incomeDate);
    setIncomeType(incomeType);
    setAmount(amount.toString());
    setIdEdit(id);
  };

  const resetForm = () => {
    setId(null);
    setTitle('');
    setDescription('');
    setIncomeDate('');
    setIncomeType('income');
    setAmount('');
  };

  const handleDeleteExpense = async id => {
    dispatch(deleteExpenseApi(id))
      .then(result => {
        console.log('Expense deleted successfully');
        dispatch(fetchExpensesApi());
      })
      .catch(error => console.error('Error deleting expense', error));
  };

  const totalIncome = listExpense
    .filter(expense => expense.incomeType === 'income')
    .reduce((acc, expense) => acc + expense.amount, 0);

  const totalExpense = listExpense
    .filter(expense => expense.incomeType === 'expense')
    .reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 25, color: 'black', alignSelf: 'center'}}>
        Expense Management
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 5,
        }}>
        <Text style={{color: 'green'}}>Income: {totalIncome}</Text>
        <Text style={{color: 'red'}}>Expense: {totalExpense}</Text>
      </View>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <TextInput
        placeholder="Income Date"
        value={incomeDate}
        onChangeText={setIncomeDate}
        style={styles.input}
      />

      <View
        style={{
          flexDirection: 'row',
          marginStart: 16,
        }}>
        <Text>Type: </Text>
        <TouchableOpacity onPress={() => setIncomeType('income')}>
          <Text
            style={{
              color: incomeType === 'income' ? 'blue' : 'black',
              marginHorizontal: 10,
            }}>
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIncomeType('expense')}>
          <Text style={{color: incomeType === 'expense' ? 'blue' : 'black'}}>
            Expense
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        title={id ? 'Update Expense' : 'Add Expense'}
        onPress={handleAddExpense}
      />

      <FlatList
        data={listExpense}
        renderItem={({item}) => {
          console.log('Render Items: ', item);
          return (
            // Thêm return ở đây
            <View style={{borderBottomWidth: 1, paddingBottom: 5}}>
              <Text>ID: {item.id}</Text>
              <Text>Title: {item.title}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Income Date: {item.incomeDate}</Text>
              <Text
                style={{
                  color: item.incomeType === 'income' ? '#00ff00' : '#ff0000',
                }}>
                Income Type: {item.incomeType}
              </Text>
              <Text>Amount: {item.amount}</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => handleDeleteExpense(item.id)}
                  style={{width: 20, height: 20}}>
                  <Image
                    source={require('../image/bin.png')}
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    handleEditExpense(
                      item.id,
                      item.title,
                      item.description,
                      item.incomeDate,
                      item.incomeType,
                      item.amount,
                    )
                  }
                  style={{width: 20, height: 20, marginStart: 10}}>
                  <Image
                    source={require('../image/pencil.png')}
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

export default ExpenseMngScreen;

const styles = StyleSheet.create({
  input: {borderWidth: 1, marginHorizontal: 16, marginBottom: 5},
  list: {
    flex: 1,
    margin: 10,
  },
});
