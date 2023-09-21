function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => (
    a.name.last.toLowerCase() < b.name.last.toLowerCase() ? -1 : 1
  ));
}

function getTotalNumberOfBorrows(account, books) {
  const result = books.reduce((acc, book) => {
    if (book.borrows.some(borrow => borrow.id === account.id)) {
      acc++
    }
    return acc
  }, 0)
  return result
}

function getBooksPossessedByAccount(account, books, authors) {
  const checkedOutBooks = books.filter(book => {
    const latestBorrow = book.borrows[0];
    return !latestBorrow.returned && latestBorrow.id === account.id;
  });
  return checkedOutBooks.map(book => {
    const author = authors.find(author => author.id === book.authorId);
    return {
      ...book,
      author,
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
