import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { addTosLibraryApi, getBooksApi } from '../../services/authentication';
import { decode } from 'jsonwebtoken';
const AdminScreen = ({navigation }: any) => {
    const [search, setSearch] = useState<string>("")
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

    const navigateToLibrary = () => {
        navigation.navigate('Library');
    }

    const navigateToAdminCodeScreen = (bookTitle: any) => {
        navigation.navigate('AdminBookScreen', { bookTitle });

    }
    useEffect(() => {
        getBooksApi().then((response) => {
            setBooks(response.data);
        }).catch((error) => {
            console.error("Không lấy được sách", error);
        });
    }, []);

    useEffect(() => {
        filterBooks(books, search);
    }, [search, books]);

    const filterBooks = (books, query) => {
        const filtered = books.filter((book) => {
            return book.title.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredBooks(filtered);
    };

    const addingBooks = async () => {
        
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Trang chủ</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.contentSearch}>
                    <Image
                        source={require('../../assets/IconSearch.png')}
                        style={styles.contentSearchImage}
                    />
                    <TextInput
                        placeholder='Tìm kiếm'
                        style={styles.contentSearchText}
                        value={search}
                        onChangeText={(value) => {
                            setSearch(value);
                            filterBooks(books, value);
                        }}
                    />
                </View>
                <View style={styles.contentMain}>
                    <FlatList
                        data={filteredBooks}
                        keyExtractor={(item) => item?.id.toString()}
                        renderItem={({ item: book }) => (
                            <TouchableOpacity onPress={() => navigateToAdminCodeScreen(book.title)}>
                                <View style={styles.bookBox}>
                                    <Text style={styles.bookTitle}>{book.title}</Text>
                                    <Text style={styles.bookInfo}>Author: {book.author}</Text>
                                    <Text style={styles.bookInfo}>Year: {book.year}</Text>
                                    <Text style={styles.bookInfo}>Category: {book.category}</Text>
                                    <TouchableOpacity style={styles.addButtonInner} onPress={() => addingBooks}>
                                        <Text style={styles.addButtonInnerLabel}>+</Text>
                                    </TouchableOpacity>                                
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={navigateToLibrary} >
                    <Text style={styles.footerButtonText}>Danh sách đọc</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        width: "100%",
    },
    header: {
        flex: 0.7,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#ff6122"
    },
    headerText: {
        fontSize: 30,
        fontWeight: "500",
        color: "#fff",
        paddingLeft: 10, 
    },
    logoutButton: {
        marginLeft: 10,
    },
    logoutButtonImage: {
        width: 44,
        height: 44,
    },
    content: {
        flex: 6,
        width: "100%",
    },
    contentSearch: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "#c8cdd0",
    },
    contentSearchImage: {
        width: 25,
        height: 25,
        marginVertical: 7,
        marginHorizontal: 7,
    },
    contentSearchText: {
        fontSize: 15,
    },
    contentMain: {
        borderRadius: 20,
    },
    footer: {
        flex: 1,
        width: "100%",
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    footerButton: {
        backgroundColor: "#ff6122",
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    footerButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
    },
    bookBox: {
        backgroundColor: "#f2f2f2",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    bookInfo: {
        fontSize: 16,
        marginTop: 5,
    },
    addButtonInner: {
        position: 'absolute',
        top: 5,
        right: 10,
        backgroundColor: '#ff6122',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonInnerLabel: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },

})
export default AdminScreen;