import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const AdminCode = ({ navigation }: any) => {
  const [adminCode, setAdminCode] = useState('');

  const handleCodeSubmit = () => {
    if (adminCode === '1') {
      navigation.navigate('AdminRegister');
    } else {
      // Handle incorrect code
      alert('Incorrect admin code');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter your provided admin code</Text>
      <TextInput
        style={styles.input}
        placeholder="Admin code"
        keyboardType="numeric"
        value={adminCode}
        onChangeText={(value) => {
          setAdminCode(value);
      }}
      />
      <Button title="Submit" onPress={handleCodeSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AdminCode;
