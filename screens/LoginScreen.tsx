import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import TextInput from '../components/TextInput';
import { Text, View } from '../components/Themed';
import { checkLogin, login, register } from '../services/Api';

export default function TabOneScreen({ navigation }: StackScreenProps<any>) {
  const [username, setusername] = React.useState({ value: '', error: false });
  const [password, setPassword] = React.useState({ value: '', error: false });
  const [loading, setLoading] = React.useState<boolean>();

  React.useEffect(() => {
    // makeApi().then(() => {
      checkLogin().then((status) => {
        if (status) {
          navigation.replace('logged');
        } else {
          setLoading(false)
        }

      })
}, []);

  const _onLoginPressed = async () => {
    if (loading) return
    if (!username.value || (!password.value || password.value.length < 5)) {
      if (!username.value) setusername({ ...username, error: true });
      if ((!password.value || password.value.length < 5)) setPassword({ ...password, error: true });
    return;
    }

    setLoading(true)
    const res = await login(username.value, password.value).catch(() => {
      setusername({ ...username, error: true });
      setPassword({ ...password, error: true });
    })
    if (res) navigation.replace('logged')
    else {
      setusername({ ...username, error: true });
      setPassword({ ...password, error: true });
    }
    setLoading(false)
  };
  const _onRegisterPressed = async () => {
    if (!username.value || (!password.value || password.value.length < 5)) {
      if (!username.value) setusername({ ...username, error: true });
      if ((!password.value || password.value.length < 5)) setPassword({ ...password, error: true });
    return;
    }

    setLoading(true)
    const res = await register(username.value, password.value)
    if (res) navigation.replace('logged')
    setLoading(false)
  };
  

  if (loading === undefined) {
    return (
      <ActivityIndicator style={styles.loading} size='large' />
    )
  }
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Authenticate</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TextInput
          label="Username"
          returnKeyType="next"
          value={username.value}
          onChangeText={text => setusername({ value: text, error: false })}
          error={!!username.error}
          autoCapitalize="none"
          autoCompleteType="username"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: false })}
          error={!!password.error}
          secureTextEntry
        />

        <View style={styles.buttons}>
          <Button mode="contained" onPress={_onLoginPressed}>
            Login
          </Button>
          <Button mode="outlined" onPress={_onRegisterPressed}>
            Register
          </Button>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    marginHorizontal: '10%',
    width: '90%',
    marginVertical: 30,
    maxWidth: 800,
    justifyContent: 'space-evenly',    
  },
  loading: {
    marginTop: '10%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
