import React from 'react'
import { useState } from "react"
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, } from 'react-native';
import { registerApi } from '../../services/authentication';
import {
    validationUserName,
    validationEmail,
    validationPassword,
    validationRePassword,
} from "../../utils/Validations";

const UserRegisterScreen = ({ navigation }: any) => {
    const [userName, setUserName] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("")

    const [userNameError, setUserNameError] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [rePasswordError, setRePasswordError] = useState<string>("")

    const [isValidUserName, setIsValidUserName] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
    const [isValidRePassword, setIsValidRePassword] = useState<boolean>(false)

    const handleRegister = async () => {
        const checkUserName = validationUserName(userName)
        const checkEmail = validationEmail(email)
        const checkPassword = validationPassword(password)
        const checkRePassword = validationPassword(rePassword)
        const checkRePasswordNotMatch = validationRePassword(password, rePassword)
        let hasError = false
        
        if (checkUserName !== null) {
            setUserNameError(checkUserName)
            setIsValidUserName(true)
        }

        if (checkEmail !== null) {
            setEmailError(checkEmail)
            setIsValidEmail(true)
            hasError = true
        }
        if (checkPassword !== null) {
            setPasswordError(checkPassword)
            setIsValidPassword(true)
            hasError = true
        }
        if (checkRePassword !== null) {
            setRePasswordError(checkRePassword)
            setIsValidRePassword(true)
            hasError = true
        }
        if (checkRePasswordNotMatch !== null) {
            setRePasswordError(checkRePasswordNotMatch)
            setIsValidRePassword(true)
            hasError = true
        }

        if (!hasError) {
            setUserNameError("")
            setIsValidUserName(false)
            setEmailError("")
            setIsValidEmail(false)
            setPasswordError("")
            setIsValidPassword(false)
            setRePasswordError("")
            setIsValidRePassword(false)
        }
        try {
            const registerResponse = await registerApi({ 
                userName,
                email,
                password,
                userType: 1,
            });
            alert("Đăng ký thành công")
            navigation.navigate('Login')
            const { data } = registerResponse
        } catch(err) {
            alert(err)
        }
    }

    const navigate = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Image
                resizeMode="cover"
                source={require('../../assets/logoApp.png')}
            />
            <Text style={styles.mainText}>Đăng ký để đọc sách - miễn phí</Text>

            <View style={styles.formRegister}>
                <View style={[styles.inputField, isValidUserName && styles.fieldError]}>
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Tên đăng nhập"
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
                <View style={[styles.inputField, isValidEmail && styles.fieldError]}>
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value);
                            if (email !== "") {
                                setEmailError("");
                                setIsValidEmail(false);
                            }
                        }}
                    />
                </View>
                {isValidEmail ? (<Text style={styles.textError}>{emailError}</Text>) : null}
                <View style={[styles.inputField, isValidPassword && styles.fieldError]}>
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Mật khẩu"
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
                <View style={[styles.inputField, isValidPassword && styles.fieldError]}>
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Nhập lại mật khẩu"
                        placeholderTextColor="#aaa"
                        secureTextEntry={true}
                        value={rePassword}
                        onChangeText={(value) => {
                            setRePassword(value);
                            if (rePassword !== "") {
                                setRePasswordError("");
                                setIsValidRePassword(false);
                            }
                        }}
                    />
                </View>
                {isValidRePassword ? (<Text style={styles.textError}>{rePasswordError}</Text>) : null}
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => {handleRegister()}}
                >
                    <Text style={styles.lable}>
                        Đăng kí
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.login } onPress={navigate} >
                    <Text style={styles.subText}>Nếu bạn đã có tài khoản?</Text>
                    <Text style={styles.subTexts}> Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        width: "100%",
    },
    mainText: {
        fontSize: 30,
        marginVertical: 20
    },
    formRegister: {
        flex: 0.8,
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
    inputFields: {
        backgroundColor: "#fafafa",
        padding: 8,
        borderRadius: 9,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
    },
    password: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fafafa",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 9,
        marginTop: 30,
    },
    textError: {
        color: "red",
        fontSize: 12,
        textAlign: "left",
        marginLeft: 6,
        marginTop: 5
    },
    fieldError: {
        borderColor: "red",
    },
    registerButton: {
        justifyContent: "center",
        marginTop: 20,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: "#ff6122",
        borderWidth: 1,
        borderColor: "#ff6122",
    },
    lable: {
        textAlign: "center",
        fontSize: 15,
        color: "#fff",
        fontWeight: "600",
    },
    login: {
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
        fontSize:17
    }
});
export default UserRegisterScreen  