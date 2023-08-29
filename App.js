import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const App = () => {
  const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;
  const [array, setArray] = useState(Array(10).fill({}));
  const [stepCount, setStepCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateArray();
  }, []);

  const updateArray = () => {
    const newData = array.map(item => {
      return {value: generateRandomNumber(), isFlip: false};
    });
    setArray(newData);
  };

  const updateFlip = (newIndex, item) => {
    if (stepCount === 20) {
      Alert.alert('You Are Not Allow Flip More Card.');
    } else {
      if (item.isFlip) {
        let newData = array.map((e, index) =>
          newIndex === index ? {...e, isFlip: false} : e,
        );
        setArray(newData);
        setStepCount(stepCount + 1);
      } else {
        let newData = array.map((e, index) =>
          newIndex === index ? {...e, isFlip: true} : e,
        );
        setArray(newData);
        setStepCount(stepCount + 1);
      }
    }
  };

  const resetData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    updateArray();
    setStepCount(0);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Memory Game</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <FlatList
            data={array}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => updateFlip(index, item)}
                  style={styles.boxView}>
                  {item.isFlip && <Text style={styles.text}>{item.value}</Text>}
                </TouchableOpacity>
              );
            }}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={3}
          />
        </View>
        {isLoading && (
          <View style={styles.loadingView}>
            <ActivityIndicator
              size={'large'}
              color={'red'}
              style={{alignSelf: 'center'}}
            />
          </View>
        )}
        <View style={styles.textView}>
          <Text style={styles.text}>Step Count: {stepCount}</Text>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => resetData()}>
            <Text style={styles.buttonText}>Reset Game</Text>
          </TouchableOpacity>
          {stepCount > 20 && (
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>Failed! Try Again</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  boxContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  boxView: {
    height: 100,
    justifyContent: 'center',
    width: 100,
    backgroundColor: '#9dacc4',
    marginTop: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#000',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
  },
  textView: {
    alignSelf: 'center',
    paddingTop: 20,
  },
  loadingView: {
    height: '100%',
    width: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  headerView: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center',
  },
  buttonView: {
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'red',
  },
});
