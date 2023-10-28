import { useState } from "react"
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
import {
    validationUserName,
    validationPassword,
} from "../../utils/Validations";
import { loginApi, setAccessToken } from "../../services/authentication";
import jwt_decode from "jwt-decode";

const LoginScreen = ({ navigation }: any) => {
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [userNameError, setUserNameError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")

    const [isValidUserName, setIsValidUserName] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false)

    const handleLogin = async () => {
        const checkUserName = validationUserName(userName)
        const checkPassword = validationPassword(password)

        if (checkUserName !== null) {
            setUserNameError(checkUserName)
            setIsValidUserName(true)
        }
        if (checkPassword !== null) {
            setPasswordError(checkPassword);
            setIsValidPassword(true);
        } else {
            setUserNameError("");
            setIsValidUserName(false);
            setPasswordError("");
            setIsValidPassword(false);
        }

        try {

            const loginResponse = await loginApi({
                userName,
                password,
            })
            
            const { data } = loginResponse
            console.log(data)
            const result = await setAccessToken(data?.token)
            let decoded = jwt_decode(data?.token)
            console.log(decoded)
            let userType = decoded?.user_type
            if(userType == 1) {
                navigation.navigate('Admin');
                console.log("Đăng nhập thành công!")
            }else if(userType ==2 ){
                navigation.navigate('User');
                console.log("Đăng nhập thành công!")
            } else {
                alert("Lỗi khi đăng nhập")
            }
        }
        catch (err) {
            alert(err)
        }
    };

    const navigateRegister = () => {
        navigation.navigate('AdminUser');
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoApp}>
                <Image
                    resizeMode="cover"
                    source={require('../../assets/logoApp.png')}
                />
            </View>
            <View style={styles.formLogin}>
                <View style={[styles.inputField, isValidUserName && styles.fieldError]}>
                    <TextInput
                        style={styles.inputsField}
                        placeholder="Username"
                        placeholderTextColor="#aaa"
                        value={userName}
                        onChangeText={(value) => {
                            setUserName(value);
                            if (userName !== "") {
                                setUserNameError("");
                                setIsValidUserName(false);
                            }
                        }}
                    />
                </View>
                {isValidUserName ? (<Text style={styles.textError}>{userNameError}</Text>) : null}
                <View style={[styles.inputField, isValidPassword && styles.fieldError]}>
                    <TextInput
                        style={styles.inputsField}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(value) => {
                            setPassword(value);
                            if (password !== "") {
                                setPasswordError("");
                                setIsValidPassword(false);
                            }
                        }}
                    />
                </View>
                {isValidPassword ? (<Text style={styles.textError}>{passwordError}</Text>) : null}

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => {
                        handleLogin();
                    }}
                >
                    <Text style={styles.lable}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.register} onPress={navigateRegister} >
                    <Text style={styles.subText}>Nếu bạn chưa có tài khoản?</Text>
                    <Text style={styles.subTexts}> Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        width: "100%",
    },
    logoApp: {
        flex: 0.5,
        justifyContent: 'center',
    },
    formLogin: {
        flex: 2,
    },
    inputField: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fafafa",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 9,
        marginTop: 15,
    },
    inputsField: {
        backgroundColor: "#fafafa",
        padding: 8,
        borderRadius: 9,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
    },
    fieldError: {
        borderColor: "red",
    },
    textError: {
        color: "red",
        fontSize: 12,
        textAlign: "left",
        marginLeft: 6,
    },
    lable: {
        textAlign: "center",
        fontSize: 15,
        color: "#fff",
        fontWeight: "600",
    },
    loginButton: {
        justifyContent: "center",
        marginTop: 20,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: "#ff6122",
    },
    registerButton: {
        backgroundColor: "#ff6122",
        borderWidth: 1,
        borderColor: "#ff6122",
    },
    register: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    subText: {
        fontSize: 17
    },
    subTexts: {
        fontWeight: '700',
        textDecorationLine: 'underline',
        fontSize: 17
    }
});
export default LoginScreen