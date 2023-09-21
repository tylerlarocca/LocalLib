function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrowedBooks = books.filter(book => {
    const latestBorrow = book.borrows[0];
    return !latestBorrow.returned;
  });
  return borrowedBooks.length;
}

function getMostCommonGenres(books) {
  // store genreCounts
  const genreCounts = {};
  // count occurance of genre counts in books
  books.forEach(book => {
    const genre = book.genre;
    if (genreCounts[genre]) {
      genreCounts[genre]++;
    } else {
      genreCounts[genre] = 1;
    }
  });

  //Convert genre counts into array of objects
  const genreArray = Object.keys(genreCounts).map(genre => ({
    name: genre,
    count: genreCounts[genre],
  }));

  // Sort the genreArray by count in order and return top 5
  return genreArray
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);
}

function getMostPopularBooks(books) {
  // Create an empty array to store book popularity data
  const bookPopularity = [];

  // Count the number of borrows for each book and store the data in bookPopularity
  books.forEach(book => {
    const borrowCount = book.borrows.length;
    bookPopularity.push({
      name: book.title,
      count: borrowCount,
    });
  });

  // Sort bookPopularity by count in descending order and return the top 5
  return bookPopularity
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getMostPopularAuthors(books = [], authors = []) {
  const mostPopularBooksSliced = books
    .sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length)
    .slice(0, 5);
  const result = mostPopularBooksSliced.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: book.borrows.length,
    };
  });
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
