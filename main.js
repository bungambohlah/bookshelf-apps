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

const key = "books";

function validate(value, type) {
  if (type === "id") {
    const valid = new Date(value).getTime() > 0;
    if (!valid) throw new Error("masukkan data id (timestamp) dengan benar");
  }

  return true;
}

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
function stringifyStorageArray(v) {
  try {
    if (!Array.isArray(v)) throw new Error("data stringify harus berupa array");

    window.localStorage.setItem(key, JSON.stringify(v));
  } catch (error) {
    return error.message;
  }
}

const inputBook = document.getElementById("inputBook");
function addBook(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());

  // set data id with timestamps
  data.id = Date.now();

  if (!data.inputBookIsComplete) data.inputBookIsComplete = false;
  else if (data.inputBookIsComplete) data.inputBookIsComplete = true;
  console.log(data);

  stringifyStorage(data);
  getBooks();

  alert(`Telah berhasil ditambahkan.`);
  event.target.reset();
}
inputBook.addEventListener("submit", addBook);

function getBooks() {
  const books = parseStorage();

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

function setIncompleteHtml(bookIncomplete = []) {
  try {
    if (!Array.isArray(bookIncomplete))
      throw new Error("data harus bernilai array");

    let bookIncompleteHtml = ``;
    const html = `<article class="p-4 rounded-lg shadow-xl bg-slate-100">
            <h3 class="text-gray-900 text-xl leading-tight font-medium mb-4">$title</h3>
            <div class="flex space-x-4">
              <p class="w-1/2 text-gray-700 text-base">Oleh: $author</p>
              <div class="w-1/2">
                <button title="Selesai dibaca" type="button" onclick="readedBook($id)" 
                  class="text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </button>
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

function setCompleteHtml(bookComplete = []) {
  try {
    if (!Array.isArray(bookComplete))
      throw new Error("data harus bernilai array");

    let bookCompleteHtml = ``;
    const html = `<article class="p-4 rounded-lg shadow-xl bg-slate-100">
          <h3 class="text-gray-900 text-xl leading-tight font-medium mb-4">$title</h3>
          <div class="flex space-x-4">
            <p class="w-1/2 text-gray-700 text-base">Oleh: $author</p>
            <div class="w-1/2">
              <button title="Belum Selesai dibaca" type="button" onclick="revertBook($id)"
                class="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-2 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z">
                  </path>
                </svg>
              </button>
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

function removeBook(id) {
  try {
    validate(id, "id");

    let books = parseStorage();
    const currentBook = books.filter((x) => x.id === id).shift();
    if (!currentBook) window.alert(`Buku dengan id ${id} tidak ditemukan`);
    if (currentBook) {
      const title = `${currentBook.inputBookTitle} (${currentBook.inputBookYear})`;
      if (window.confirm(`Apakah anda yakin untuk hapus ${title} ?`)) {
        books = books.filter((x) => x.id !== id);
        stringifyStorageArray(books);
      }
    }

    getBooks();
  } catch (error) {
    return error.message;
  }
}

function readedBook(id) {
  try {
    validate(id, "id");

    let books = parseStorage();
    const indexBook = books.findIndex((x) => x.id === id);
    if (indexBook < 0) window.alert(`Buku dengan id ${id} tidak ditemukan`);
    if (indexBook >= 0) {
      const currentBook = books[indexBook];
      const title = `${currentBook.inputBookTitle} (${currentBook.inputBookYear})`;
      if (window.confirm(`Apakah anda selesai membaca ${title} ?`)) {
        books[indexBook].inputBookIsComplete = true;
        stringifyStorageArray(books);
      }
    }

    getBooks();
  } catch (error) {
    return error.message;
  }
}

docReady(function () {
  // DOM is loaded and ready for manipulation here
  getBooks();
});
