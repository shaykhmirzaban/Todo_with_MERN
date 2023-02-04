import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import URL_NAME from './config';

const App = () => {
  const [data, setData] = useState();
  const [flag, setFlag] = useState(true);
  const [currentV, setCurrentV] = useState('');
  const [boolean, setBoolean] = useState(false);
  const [key, setKey] = useState('');
  const [inputFieldV, setInputFieldV] = useState('');
  const [valueRecive, setValueRecive] = useState(false);

  // get all data
  const getData = async () => {
    try {
      const res = await axios.get(URL_NAME);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setValueRecive(false);
    }
  };

  useEffect(() => {
    setValueRecive(true);
    getData();
  }, [flag]);

  // create data
  const createTodo = () => {
    if (!currentV) {
      ToastAndroid.show('Please fill input field', ToastAndroid.SHORT);
      return;
    }
    const objToSend = {
      todo: currentV,
    };
    axios.post(URL_NAME, objToSend).then(res => {
      if (res.data.message) {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        setCurrentV('');
        setFlag(!flag);
      } else {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      }
    });
  };

  // update data
  const updateTodo = e => {
    setKey(e._id);
    setInputFieldV(e.todo);
    setBoolean(true);
  };

  const updateTodo1 = () => {
    let objToSend = {
      id: key,
      todo: inputFieldV,
    };
    axios.put(URL_NAME, objToSend).then(res => {
      if (res.data.status) {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        setBoolean(false);
        setFlag(!flag);
      } else {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      }
    });
  };

  // delete data from database
  const deleteTodo = e => {
    axios
      .delete(`${URL_NAME}/${e}`)
      .then(res => {
        if (res.data.status) {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
          setFlag(!flag);
        } else {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        ToastAndroid.show(err.data.message, ToastAndroid.SHORT);
      });
  };

  return (
    <View style={{backgroundColor: '#000', flex: 1}}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      {/* heading */}
      <View
        style={{
          padding: 10,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 22,
            color: '#fff',
            fontWeight: 'bold',
            textDecorationColor: '#eee',
            textDecorationStyle: 'solid',
            textDecorationLine: 'underline',
          }}>
          Your Todo
        </Text>
      </View>

      {/* form area */}
      <View
        style={{
          marginVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TextInput
          placeholder="Enter your text"
          keyboardType="default"
          style={{
            width: '75%',
            padding: 10,
            backgroundColor: '#ccc',
            fontSize: 17,
            color: '#000',
            borderRadius: 10,
          }}
          onChangeText={e => setCurrentV(e)}
          value={currentV}
        />

        <TouchableOpacity
          onPress={createTodo}
          style={{
            width: '15%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffdb00',
            borderRadius: 10,
            marginLeft: 10,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      {/* data rander */}
      {valueRecive ? (
        <ActivityIndicator
          size={'large'}
          color={'#eee'}
          animating={valueRecive}
        />
      ) : (
        <View>
          {/* small title */}
          <View style={{paddingHorizontal: 15}}>
            <Text style={{color: '#eee'}}>All Todo Item</Text>
          </View>

          {/* style={{
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }} */}
          {/* render todo element */}
          <View>
            <ScrollView
              style={{width: '100%', height: '83%'}}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {data &&
                data.length > 0 &&
                data.map(val => {
                  return (
                    <View
                      key={val._id}
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 2,
                        borderBottomColor: '#eee',
                        borderBottomStyle: 'solid',
                        paddingVertical: 15,
                      }}>
                      <Text style={{color: '#eee', fontSize: 18}}>
                        {val.todo}
                      </Text>
                      {/* functional button */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => updateTodo(val)}
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: '#eee',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon name="edit" size={35} color="#00c208" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteTodo(val._id)}
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: '#eee',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10,
                          }}>
                          <Icon name="delete" size={35} color="#cc3a04" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}

              {!data.length > 0 && (
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 30,
                  }}>
                  <Text style={{color: '#eee'}}>Empty</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      )}

      {/* model */}
      <Modal animationType="slide" transparent={true} visible={boolean}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Enter your value"
              style={styles.inputFieldStyle}
              value={inputFieldV}
              onChangeText={e => setInputFieldV(e)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => updateTodo1()}>
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#ffdb00',
  },
  textStyle: {
    width: 100,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputFieldStyle: {
    width: 250,
    height: 50,
    backgroundColor: '#eee',
    color: '#000',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default App;
