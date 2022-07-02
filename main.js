// this function is used while document / window (DOM) is ready to use
function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

// define key as localStorage's key
const key = "books";

// this function is used to validate params or books
function validate(value, type) {
  if (type === "id") {
    const valid = new Date(value).getTime() > 0;
    if (!valid) throw new Error("masukkan data id (timestamp) dengan benar");
  }

  return true;
}

// this function is used to get list of books from localStorage
function parseStorage() {
  let books = [];
  try {
    const booksRaw = window.localStorage.getItem(key) || "[]";
    books = JSON.parse(booksRaw) || [];
  } catch (error) {
    books = [];
  }

  return books;
}
// this function is used to add new item on current list of books and set to localStorage
function stringifyStorage(v) {
  try {
    if (typeof v !== "object")
      throw new Error("data stringify harus berupa objek");

    const books = parseStorage() || [];
    if (Array.isArray(books)) books.push(v);

    window.localStorage.setItem(key, JSON.stringify(books));
  } catch (error) {
    return error.message;
  }
}
// this function is used to set (re-create) list of books as array and full set to localStorage
function stringifyStorageArray(v) {
  try {
    if (!Array.isArray(v)) throw new Error("data stringify harus berupa array");

    window.localStorage.setItem(key, JSON.stringify(v));
  } catch (error) {
    return error.message;
  }
}

// add function to handle add book and add submit event listener to inputBook form
const inputBook = document.getElementById("inputBook");
function addBook(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());

  // set data id with timestamps
  data.id = Date.now();

  if (!data.inputBookIsComplete) data.inputBookIsComplete = false;
  else if (data.inputBookIsComplete) data.inputBookIsComplete = true;

  stringifyStorage(data);
  getBooks();

  Swal.fire({
    icon: "success",
    title: "Telah berhasil ditambahkan.",
    showConfirmButton: false,
    timer: 1500,
  });
  event.target.reset();
}
inputBook.addEventListener("submit", addBook);

// this function is handle to get books and render it to two specified list of books (complete & incomplete's lists)
function getBooks(search) {
  let books = parseStorage();

  if (typeof search === "string") {
    books = books.filter((x) => {
      const newSearch = search.toUpperCase();
      const title = `${x.inputBookTitle} (${x.inputBookYear})`;
      return title.toUpperCase().indexOf(newSearch) >= 0;
    });
  }

  const bookIncomplete = books.filter((x) => !x.inputBookIsComplete);
  const bookComplete = books.filter((x) => x.inputBookIsComplete);

  // render bookIncomplete to incompleteBookshelfList
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const bookIncompleteHtml = setIncompleteHtml(bookIncomplete);
  incompleteBookshelfList.innerHTML = "";
  incompleteBookshelfList.innerHTML = bookIncompleteHtml;

  // render bookComplete to completeBookshelfList
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );
  const bookCompleteHtml = setCompleteHtml(bookComplete);
  completeBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = bookCompleteHtml;

  return true;
}

// this function is used to render incomplete books list
function setIncompleteHtml(bookIncomplete = []) {
  try {
    if (!Array.isArray(bookIncomplete))
      throw new Error("data harus bernilai array");

    let bookIncompleteHtml = ``;
    const html = `<article class="p-4 rounded-lg shadow-xl bg-slate-100">
            <h3 class="text-gray-900 text-xl leading-tight font-medium mb-4">$title</h3>
            <div class="flex space-x-4">
              <p class="w-1/2 text-gray-700 text-base">Oleh: $author</p>
              <div class="w-1/2 grid sm:grid-cols-2 md:grid-cols-3 sm:gap-2">
                <div class="w-4/12">
                  <button title="Selesai dibaca" type="button" onclick="readedBook($id)" 
                    class="text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </button>
                </div>
                <div class="w-4/12">
                  <button title="Ubah buku" type="button" onclick="showEditBook($id)"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </button>
                </div>
                <div class="w-4/12">
                  <button title="Hapus buku" type="button" onclick="removeBook($id)"
                    class="text-white bg-rose-700 hover:bg-rose-800 focus:ring-2 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>`;

    bookIncompleteHtml = bookIncomplete.map((x) => {
      const title = `${x.inputBookTitle} (${x.inputBookYear})`;
      const author = x.inputBookAuthor;
      const id = x.id;
      return html
        .replaceAll("$author", author)
        .replaceAll("$title", title)
        .replaceAll("$id", id);
    });

    bookIncompleteHtml = bookIncompleteHtml.join("");
    if (!bookIncompleteHtml.length)
      bookIncompleteHtml = `<h3 class="text-rose-700 text-sm leading-tight italic">Tidak ada buku yang belum selesai dibaca</h3>`;

    return bookIncompleteHtml;
  } catch (error) {
    console.error(error.message);
  }
}

// this function is used to render complete books list
function setCompleteHtml(bookComplete = []) {
  try {
    if (!Array.isArray(bookComplete))
      throw new Error("data harus bernilai array");

    let bookCompleteHtml = ``;
    const html = `<article class="p-4 rounded-lg shadow-xl bg-slate-100">
          <h3 class="text-gray-900 text-xl leading-tight font-medium mb-4">$title</h3>
          <div class="flex space-x-4">
            <p class="w-1/2 text-gray-700 text-base">Oleh: $author</p>
            <div class="w-1/2 grid sm:grid-cols-2 md:grid-cols-3 sm:gap-2">
              <div class="w-4/12">
                <button title="Belum Selesai dibaca" type="button" onclick="revertBook($id)"
                  class="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-2 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z">
                    </path>
                  </svg>
                </button>
              </div>
              <div class="w-4/12">
                <button title="Ubah buku" type="button" onclick="showEditBook($id)"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
              </div>
              <div class="w-4/12">
                <button title="Hapus buku" type="button" onclick="removeBook($id)"
                  class="text-white bg-rose-700 hover:bg-rose-800 focus:ring-2 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>`;

    bookCompleteHtml = bookComplete.map((x) => {
      const title = `${x.inputBookTitle} (${x.inputBookYear})`;
      const author = x.inputBookAuthor;
      const id = x.id;
      return html
        .replaceAll("$author", author)
        .replaceAll("$title", title)
        .replaceAll("$id", id);
    });

    bookCompleteHtml = bookCompleteHtml.join("");
    if (!bookCompleteHtml.length)
      bookCompleteHtml = `<h3 class="text-rose-700 text-sm leading-tight italic">Tidak ada buku yang selesai dibaca</h3>`;

    return bookCompleteHtml;
  } catch (error) {
    console.error(error.message);
  }
}

// this function is used to handle remove book from localStorage and re-render it
function removeBook(id) {
  try {
    validate(id, "id");

    let books = parseStorage();
    const currentBook = books.filter((x) => x.id === id).shift();
    if (!currentBook) {
      Swal.fire({
        icon: "error",
        title: `Buku tidak ditemukan.`,
        showConfirmButton: true,
        footer: `Buku dengan id: <em>${id}</em>`,
      });
    }
    if (currentBook) {
      const title = `${currentBook.inputBookTitle} (${currentBook.inputBookYear})`;
      Swal.fire({
        title: `Hapus buku ${title} ?`,
        text: `Apakah anda yakin untuk hapus buku ${title} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, hapus buku ini!",
      }).then((result) => {
        if (result.isConfirmed) {
          books = books.filter((x) => x.id !== id);
          stringifyStorageArray(books);
          getBooks();

          Swal.fire(
            `Buku ${title} telah dihapus!`,
            "Buku telah berhasil dihapus.",
            "success"
          );
        }
      });
    }
  } catch (error) {
    return error.message;
  }
}

// this function is used to move unread book list to readed book list and re-render it
function readedBook(id) {
  try {
    validate(id, "id");

    let books = parseStorage();
    const indexBook = books.findIndex((x) => x.id === id);
    if (indexBook < 0) {
      Swal.fire({
        icon: "error",
        title: `Buku tidak ditemukan.`,
        showConfirmButton: true,
        footer: `Buku dengan id: <em>${id}</em>`,
      });
    }
    if (indexBook >= 0) {
      const currentBook = books[indexBook];
      const title = `${currentBook.inputBookTitle} (${currentBook.inputBookYear})`;
      Swal.fire({
        title: `Selesai membaca buku ${title} ?`,
        text: `Apakah anda yakin pindah buku ${title} ke rak selesai dibaca ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, selesai!",
      }).then((result) => {
        if (result.isConfirmed) {
          books[indexBook].inputBookIsComplete = true;
          stringifyStorageArray(books);
          getBooks();

          Swal.fire(
            `Buku ${title} telah dipindah!`,
            "Buku telah berhasil dipindah ke rak selesai dibaca.",
            "success"
          );
        }
      });
    }
  } catch (error) {
    return error.message;
  }
}

// this function is used to move readed book list to unread book list and re-render it
function revertBook(id) {
  try {
    validate(id, "id");

    let books = parseStorage();
    const indexBook = books.findIndex((x) => x.id === id);
    if (indexBook < 0) {
      Swal.fire({
        icon: "error",
        title: `Buku tidak ditemukan.`,
        showConfirmButton: true,
        footer: `Buku dengan id: <em>${id}</em>`,
      });
    }
    if (indexBook >= 0) {
      const currentBook = books[indexBook];
      const title = `${currentBook.inputBookTitle} (${currentBook.inputBookYear})`;
      Swal.fire({
        title: `Belum Selesai membaca buku ${title} ?`,
        text: `Apakah anda yakin pindah buku ${title} ke rak belum selesai dibaca ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, belum selesai!",
      }).then((result) => {
        if (result.isConfirmed) {
          books[indexBook].inputBookIsComplete = false;
          stringifyStorageArray(books);
          getBooks();

          Swal.fire(
            `Buku ${title} telah dipindah!`,
            "Buku telah berhasil dipindah ke rak belum selesai dibaca.",
            "success"
          );
        }
      });
    }
  } catch (error) {
    return error.message;
  }
}

// add function to handle search book and add submit event listener to searchBook form
const searchBook = document.getElementById("searchBook");
function findBook(event) {
  event.preventDefault();
  const { searchBookTitle } = Object.fromEntries(
    new FormData(event.target).entries()
  );

  getBooks(searchBookTitle);
}
searchBook.addEventListener("submit", findBook);

// add a function to show popup when user click on edit book button
function showEditBook(id) {
  try {
    validate(id, "id");

    const books = parseStorage();
    const indexBook = books.findIndex((x) => x.id === id);
    const currentBook = books[indexBook];
    const title = `${currentBook.inputBookTitle} (${currentBook.inputBookYear})`;

    Swal.fire({
      title: `Ubah Buku ${title}`,
      html: `<input id="editInputBookTitle" name="editInputBookTitle" type="text" required placeholder="Judul Buku" class="block w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500" value="${currentBook.inputBookTitle}" />
            <div class="flex space-x-4">
              <input id="editInputBookAuthor" name="editInputBookAuthor" type="text" required placeholder="Penulis" class="mt-3 block w-6/12 px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500" value="${currentBook.inputBookAuthor}" />
              <input id="editInputBookYear" name="editInputBookYear" type="number" required placeholder="Tahun" class="mt-3 block w-6/12 px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500" value="${currentBook.inputBookYear}" />
            </div>`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ubah",
      focusConfirm: false,
      preConfirm: () => {
        return {
          inputBookTitle: document.getElementById("editInputBookTitle").value,
          inputBookAuthor: document.getElementById("editInputBookAuthor").value,
          inputBookYear: document.getElementById("editInputBookYear").value,
        };
      },
    }).then(({ value: formValues }) => {
      if (formValues) {
        updateBook(id, formValues);
      }
    });
  } catch (error) {
    return error.message;
  }
}

// add a function to handle edit book
function updateBook(id, data) {
  try {
    validate(id, "id");

    let books = parseStorage();
    const indexBook = books.findIndex((x) => x.id === id);
    data.id = id;
    data.inputBookIsComplete = books[indexBook].inputBookIsComplete;
    books[indexBook] = data;

    stringifyStorageArray(books);
    getBooks();

    const title = `${books[indexBook].inputBookTitle} (${books[indexBook].inputBookYear})`;
    Swal.fire({
      icon: "success",
      title: `Buku ${title} telah berhasil diubah.`,
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    return error.message;
  }
}

// call document / windows function
docReady(function () {
  // DOM is loaded and ready for manipulation here
  getBooks();
});
