import {useDispatch, useSelector} from 'react-redux';
import {
  addExpense,
  updateExpense,
  deleteExpense,
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
import {useState} from 'react';

const ExpenseMngScreen = () => {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [incomeDate, setIncomeDate] = useState('');
  const [incomeType, setIncomeType] = useState('income');
  const [amount, setAmount] = useState('');

  const [search, setSearch] = useState('');

  const listExpense = useSelector(state => state.listExpense.listExpense);

  const dispatch = useDispatch();

  const handleAddOrUpdateExpense = () => {
    const data = {
      id: id ? id : Math.random().toString(),
      title,
      description,
      incomeDate,
      incomeType,
      amount: parseFloat(amount),
    };
    if (id) {
      dispatch(updateExpense(data));
    } else {
      dispatch(addExpense(data));
    }
    resetForm();
  };

  const resetForm = () => {
    setId(null);
    setTitle('');
    setDescription('');
    setIncomeDate('');
    setIncomeType('income');
    setAmount('');
  };

  const handleEditExpense = expense => {
    setId(expense.id);
    setTitle(expense.title);
    setDescription(expense.description);
    setIncomeDate(expense.incomeDate);
    setIncomeType(expense.incomeType);
    setAmount(expense.amount.toString());
  };

  const handleDeleteExpense = id => {
    dispatch(deleteExpense({id}));
  };

  // const toggleTaskStatus = (listExpense: ListExpense) => {};
  const totalIncome = listExpense
    .filter(expense => expense.incomeType === 'income')
    .reduce((acc, expense) => acc + expense.amount, 0);

  const totalExpense = listExpense
    .filter(expense => expense.incomeType === 'expense')
    .reduce((acc, expense) => acc + expense.amount, 0);

  const filteredExpenses = listExpense.filter(expense =>
    expense.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 25, color: 'black', alignSelf: 'center'}}>
        Expense Management
      </Text>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 50,
          paddingHorizontal: 16,
        }}>
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={{flex: 9, borderWidth: 1, marginEnd: 10}}
        />
      </View>
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
          //   justifyContent: 'space-around',
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
        onPress={handleAddOrUpdateExpense}
      />

      {/* {listExpense.map(row => (
        <View
          key={row.id}
          style={{padding: 10, margin: 10, backgroundColor: 'cyan'}}>
          <Text>
            {row.title} === {row.id}
          </Text>
        </View>
      ))} */}

      <FlatList
        data={filteredExpenses}
        renderItem={({item}) => (
          <View>
            <Text>title: {item.title}</Text>
            <Text>description: {item.description}</Text>
            <Text>incomeDate: {item.incomeDate}</Text>
            <Text
              style={{
                color: item.incomeType === 'income' ? '#00ff00' : '#ff0000',
              }}>
              incomeType: {item.incomeType}{' '}
            </Text>
            <Text>amount: {item.amount}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteExpense(item.id);
                }}
                style={{width: 20, height: 20}}>
                <Image
                  source={require('../image/bin.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleEditExpense(item);
                }}
                style={{width: 20, height: 20, marginStart: 10}}>
                <Image
                  source={require('../image/pencil.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    // marginTop: 10,
    flex: 1,
    // backgroundColor: 'red',
    margin: 10,
  },
});
