function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOutBook = books.filter((book) => !book.borrows[0].returned);
  const returnedBook = books.filter((book) => book.borrows[0].returned);
  return [checkedOutBook, returnedBook];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map(borrow => {
    const account = accounts.find(account => account.id === borrow.id);
    return {...account, returned: borrow.returned};
  });
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
