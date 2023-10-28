import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, SafeAreaView, Text, Alert, TouchableOpacity, } from 'react-native';
import { validateTieuDe, validateTacGia, validateNam, validateMoTa, validateTheLoai, validateDangSach } from '../../utils/SachValidations';
import * as DocumentPicker from 'expo-document-picker';
import { addBookApi } from '../../services/authentication';
const AddScreen = ({ navigation }: any) => {
    const [TieuDe, setTieuDe] = useState('sample');
    const [TacGia, setTacGia] = useState('nam');
    const [Nam, setNam] = useState('2023');
    const [TheLoai, setTheLoai] = useState('truyen');
    const [Sach, setSach] = useState('');

    const navigate = () => {
        navigation.navigate('Home');
    }

    // const handlePickPdf = async () => {
    //     // let result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    //     // if (!result.canceled) {
    //     //     setSach(result.assets[0].uri);
    //     // }
    //     console.log(Sach)
    // };
    const handlePickPdf = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
            console.log(result)
            if (!result.canceled) {
            setSach(result.assets[0].uri);
          }
        } catch (error) {
          console.log('Error picking file:', error);
        }
    };
    const uploadBook = async () => {
        const formData = new FormData();
        formData.append('tacGia', TacGia);
        formData.append('tieuDe', TieuDe);
        formData.append('nam', Nam);
        formData.append('theLoai', TheLoai);
        formData.append('sach', {
            uri: Sach
        } as any);
        console.log(formData)
        try {
            const response = await addBookApi({ formData })
            console.log('Book uploaded successfully', response.data);
        } catch (error) {
            console.error('Error uploading book:', error);
        }
    }

    const handleSubmit = () => {
        if (
            !validateTieuDe(TieuDe) ||
            !validateTacGia(TacGia) ||
            !validateNam(Nam) ||
            !validateTheLoai(TheLoai)
        ) {
            Alert.alert('Validation Error', 'Hãy điền vào hết chỗ trống');
            if (!validateNam(Nam)) {
                Alert.alert('Validation Error', 'Năm chưa tồn tại');
                return;
            }
            return;
        }
        if (Sach) {
            uploadBook();
            // navigation.navigate('Admin');
        } else {
            console.log('No file uploaded');
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.logoApp}>
                    <Image resizeMode="cover" source={require('../../assets/logoApp.png')} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.placeholder}>Tiêu Đề Sách</Text>
                    <TextInput style={styles.input} value={TieuDe} onChangeText={setTieuDe} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.placeholder}>Tác Giả</Text>
                    <TextInput style={styles.input} value={TacGia} onChangeText={setTacGia} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.placeholder}>Năm ra mắt</Text>
                    <TextInput style={styles.input} value={Nam} onChangeText={setNam} keyboardType="numeric" />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.placeholder}>Thể Loại Sách</Text>
                    <TextInput style={styles.input} value={TheLoai} onChangeText={setTheLoai} />
                </View>
                <View style={[styles.inputContainer, styles.pdfContainer]}>
                    <Text style={styles.placeholder}>PDF</Text>
                    <TouchableOpacity style={styles.pdfButton} onPress={handlePickPdf}>
                        <Text style={styles.pdfButtonText}>Select a PDF</Text>
                    </TouchableOpacity>
                    <Text>{Sach}</Text>
                </View>
                <Button title="Đăng tải" onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginBottom: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        height: 70,
        position: 'relative',
    },
    placeholder: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        position: 'absolute', // Add this line to make the position of the placeholder absolute
        top: -10, // Adjust this value to position the placeholder text outside the input box
        left: 10,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
    },
    logoApp: {
        justifyContent: 'center',
        marginBottom: 100,
        left: 50,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    pdfContainer: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginBottom: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        height: 80,
        position: 'relative',
    },
    pdfButton: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        marginLeft: 10,
    },
    pdfButtonText: {
        textAlign: 'center',
    },
    pdfText: {
        marginLeft: 10,
    },
});

export default AddScreen;
