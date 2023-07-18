import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

export default function List() {
  const formik = useFormik({
    initialValues: {
      bookName: '',
      bookAuthor: '',
      read: 'No',
      takenDate: getCurrentDate(),
      returnDate: getReturnDate(),
    },
    onSubmit: (values) => {
      const newBook = {
        bookName: values.bookName,
        bookAuthor: values.bookAuthor,
        read: values.read,
        takenDate: values.takenDate,
        returnDate: values.returnDate,
      };
      localStorage.setItem('books', JSON.stringify([...booksArr, newBook]));
      setBooksArr([...booksArr, newBook]);
    },
  });

  const [booksArr, setBooksArr] = useState([]);
  const [readUpdate, setReadUpdate] = useState(false);

  const removeBook = (index) => {
    if (booksArr) {
      const newArray = booksArr.filter((book, bookIndex) => {
        return bookIndex !== index;
      });

      localStorage.setItem('books', JSON.stringify(newArray));
      setBooksArr(newArray);
    }
  };

  const saveLocal = () => {
    localStorage.setItem('books', JSON.stringify(booksArr));
  };

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) setBooksArr(JSON.parse(storedBooks));
  }, []);

  // Helper function to get the current date in YYYY-MM-DD format
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${year}-${month}-${day}`;
  }

  // Helper function to get the return date as 14 days from the current date
  function getReturnDate() {
    const now = new Date();
    now.setDate(now.getDate() + 14);
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <form className="bookForm" onSubmit={formik.handleSubmit}>
        <label htmlFor="bookName">Book Title</label>
        <input
          id="bookName"
          name="bookName"
          type="text"
          placeholder="Book Title"
          maxLength="40"
          onChange={formik.handleChange}
          value={formik.values.bookName}
          required
        />

        <label htmlFor="bookAuthor">Author</label>
        <input
          id="bookAuthor"
          name="bookAuthor"
          type="text"
          placeholder="Book Author"
          maxLength="30"
          onChange={formik.handleChange}
          value={formik.values.bookAuthor}
          required
        />

        <label htmlFor="takenDate">Taken Date</label>
        <input
          id="takenDate"
          name="takenDate"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.takenDate}
          required
          disabled
        />

        <label htmlFor="returnDate">Return Date</label>
        <input
          id="returnDate"
          name="returnDate"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.returnDate}
          required
          disabled
        />

        <label>Read</label>
        <select
          id="read"
          name="read"
          value={formik.values.read}
          onChange={formik.handleChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input id="submit" type="submit" value="ADD NEW BOOK" />
      </form>

      <table>
        <tbody>
          <tr>
            <th>Book Name</th>
            <th>Book Author</th>
            <th>Taken Date</th>
            <th>Return Date</th>
            <th>Returned (Yes/No)</th>
            <th colSpan="2">Status</th>
          </tr>
          {booksArr
            ? booksArr.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.bookName}</td>
                    <td>{item.bookAuthor}</td>
                    <td>{item.takenDate}</td>
                    <td>{item.returnDate}</td>
                    <td>{item.read}</td>
                    <td id="settings">
                      <button
                        onClick={() => {
                          item.read === 'Yes'
                            ? (item.read = 'No')
                            : (item.read = 'Yes');
                          saveLocal();
                          setReadUpdate(!readUpdate);
                        }}
                      >
                        {item.read === 'Yes' ? 'Still reading' : 'Returned'}
                      </button>

                      <button onClick={() => removeBook(index)}>Remove</button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}
