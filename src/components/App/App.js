import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Books from '../Books/books';
import Categories from '../Categories/categories';
import Header from '../Header/header';
import BookAdd from '../Books/BookAdd/bookAdd';
import BookEdit from '../Books/BookEdit/bookEdit';
import LibraryService from "../../repository/libraryRepository";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header />
                <main>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/books/add"} exact
                                   element={<BookAdd
                                        categories={this.state.categories}
                                        authors={this.state.authors}
                                        onAddBook={this.addBook} />} />
                            <Route path={"/books/edit/:id"} exact
                                   element={<BookEdit
                                       categories={this.state.categories}
                                       authors={this.state.authors}
                                       onEditBook={this.editBook}
                                       book={this.state.selectedBook} />} />
                            <Route path={"/books"} exact
                                   element={<Books
                                        books={this.state.books}
                                        onDelete={this.deleteBook}
                                        onEdit={this.getBook}
                                        onMark={this.markAsTaken} />} />
                            <Route path={"/categories"} exact
                                   element={<Categories
                                       categories={this.state.categories} />} />
                            <Route path={"/"} exact
                                   element={<Navigate to="/books" />} />
                        </Routes>
                    </div>
                </main>
            </Router>
        )
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    loadCategories = () => {
        LibraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    deleteBook = (id) => {
        LibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    addBook = (name, category, author, availableCopies) => {
        LibraryService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    getBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id, name, category, author, availableCopies) => {
        LibraryService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    markAsTaken = (id) => {
        LibraryService.markBookAsTaken(id)
            .then(() => {
                this.loadBooks();
            })
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }
}

export default App;
