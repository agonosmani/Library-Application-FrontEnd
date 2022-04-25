import React, {Component} from "react";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

class Books extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5
        }
    }

    render() {

        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const books = this.getBooksPage(offset, nextPageOffset);

        return (
            <div className={"container mm-4 mt-5 text-center"}>
                <div className={"row"}>
                    <div className={"row"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Author</th>
                                <th scope={"col"}>Available Copies</th>
                            </tr>
                            </thead>
                            <tbody>
                                {books}
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <Link className="btn btn-block btn-dark w-50" to={"/books/add"}>Add New Book</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactPaginate previousLabel={"back"}
                               nextLabel={"next"}
                               breakLabel={<a href="/#">...</a>}
                               breakClassName={'page-item'}
                               breakLinkClassName={'page-link'}
                               pageClassName={'page-item ml-1'}
                               pageLinkClassName={'page-link'}
                               previousClassName={'page-item'}
                               previousLinkClassName={'page-link'}
                               nextClassName={'page-item'}
                               nextLinkClassName={'page-link'}
                               pageCount={pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination m-4 justify-content-center "}
                               activeClassName={"active"}
                />
            </div>
        );
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page : selected
        })
    }

    getBooksPage = (offset, nextPageOffset) => {
        return this.props.books.map((term) => {
            return (
                <tr>
                    <td>{term.name}</td>
                    <td>{term.category}</td>
                    <td>{term.author.name} {term.author.surname}</td>
                    <td>{term.availableCopies}</td>
                    <td className={"text-right"}>
                        <a title={"Delete"} className={"btn btn-danger"}
                           onClick={() => this.props.onDelete(term.id)}>
                            Delete
                        </a>
                        <Link className={"btn btn-info mx-2"}
                              onClick={() => this.props.onEdit(term.id)}
                              to={`/books/edit/${term.id}`}>
                            Edit
                        </Link>
                        {this.markAsTakenButton(term.availableCopies, term.id)}
                    </td>
                </tr>
            );
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }

    markAsTakenButton = (copies, id) => {
        if(copies <= 0) {
            return (
                <a title={"Mark As Taken"} className={"btn btn-secondary"}>
                    Mark As Taken
                </a>
            )
        } else {
            return (
                <a title={"Mark As Taken"} className={"btn btn-warning"}
                   onClick={() => this.props.onMark(id)}>
                    Mark As Taken
                </a>
            )
        }
    }
}

export default Books;