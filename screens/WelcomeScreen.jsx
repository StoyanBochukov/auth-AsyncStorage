import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {

  const [message, setMessage] = useState('')

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
     const getData = async () => {
      const { data } = await axios.get(`https://react-native-auth-edf57-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=${token}`);
      setMessage(data)
      console.log(data);
     }
     getData();
  }, [setMessage, token])
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});