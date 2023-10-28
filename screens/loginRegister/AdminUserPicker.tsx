import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';


const AdminUserPicker = ({ navigation }: any) => {
  const navigateToAdminCodeScreen = () => {
    navigation.navigate('AdminCode');
  };

  const navigateToAdminRegisterScreen = () => {
    navigation.navigate('UserRegister', { userType: 1 });
  };

  const navigateToUserRegisterScreen = () => {
    navigation.navigate('UserRegister', { userType: 2 });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Who are you?</Text>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={navigateToAdminCodeScreen}
          style={{
            marginRight: 20,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Image
            source={require('../../assets/Admin.png')}
            style={{ width: 80, height: 80 }}
          />
          <Text style={{ textAlign: 'center' }}>Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToAdminRegisterScreen}
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Image
            source={require('../../assets/User.png')}
            style={{ width: 80, height: 80 }}
          />
          <Text style={{ textAlign: 'center' }}>User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminUserPicker;
