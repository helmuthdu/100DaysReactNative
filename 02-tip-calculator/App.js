import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Header, Input, Slider, Text, ThemeProvider } from 'react-native-elements';
import { MoneyInput } from './MoneyInput';

export default class App extends React.Component {
  state = {
    value: 0,
    tip: 0.1
  };

  // Later on in your component
  async componentDidMount() {
    await Font.loadAsync({
      ...Ionicons.font
    });
  }

  render() {
    const { tip, value } = this.state;
    return (
      <ThemeProvider>
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'Tip Calculator', style: { color: '#fff', fontSize: 16, fontWeight: '700' } }}
          />
          <View style={styles.content}>
            <View style={styles.input}>
              <MoneyInput
                keyboardType="numeric"
                maskType="money"
                currencySymbol="$"
                currencySeparator=","
                placeholder="$0.00"
                style={styles.inputText}
                onChangeText={v =>
                  this.setState({
                    value: Number(v)
                  })
                }
                value={value}
              />
            </View>
            <View>
              <Text style={styles.text}>
                Tip ({Math.round(tip * 10000) / 100}%):${Math.round(value * tip * 100) / 100}
              </Text>
            </View>
            <View>
              <Text style={styles.text}>Total: ${Math.round(value * (1 + tip) * 100) / 100}</Text>
            </View>
            <View style={styles.slider}>
              <Slider step={0.01} value={tip} onValueChange={v => this.setState({ tip: Number(v) })} />
            </View>
          </View>
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1
  },
  content: {
    flex: 1,
    width: '100%',
    padding: 20,
    alignItems: 'flex-end'
  },
  slider: {
    width: '100%',
    padding: 20
  },
  input: {
    width: '100%',
    padding: 10
  },
  inputText: {
    width: '100%',
    padding: 10,
    fontSize: 62,
    textAlign: 'right'
  },
  text: {
    width: '100%',
    padding: 10,
    fontSize: 24
  }
});
