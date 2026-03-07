const mainSection = document.getElementById('main-section');
const formSection = document.getElementById('form-section');
const addBookmarkButton = document.getElementById('add-bookmark-button');
const addBookmarkBtnForm = document.getElementById('add-bookmark-button-form');
const categoryName = document.querySelector('.category-name');
const categoryDropdown = document.getElementById('category-dropdown');
const closeFormButton = document.getElementById('close-form-button');
const nameEl = document.getElementById('name');
const urlEl = document.getElementById('url');
const bookmarkListSection = document.getElementById('bookmark-list-section');
const viewCategoryButton = document.getElementById('view-category-button');
const categoryList = document.getElementById('category-list');
const closeListButton = document.getElementById('close-list-button');
const deleteBookmarkButton = document.getElementById('delete-bookmark-button');


// ✅ Get bookmarks from localStorage
function getBookmarks() {
  const stored = localStorage.getItem("bookmarks");

  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    const isValid = parsed.every(bookmark =>
      bookmark &&
      typeof bookmark === "object" &&
      typeof bookmark.name === "string" &&
      typeof bookmark.category === "string" &&
      typeof bookmark.url === "string"
    );

    return isValid ? parsed : [];
  } catch {
    return [];
  }
}

// ✅ Toggle form
function displayOrCloseForm() {
  mainSection.classList.toggle('hidden');
  formSection.classList.toggle('hidden');
}


// ✅ Toggle category list
function displayOrHideCategory() {
  mainSection.classList.toggle('hidden');
  bookmarkListSection.classList.toggle('hidden');
}


// ✅ Show form
addBookmarkButton.addEventListener('click', () => {
  categoryName.innerText = categoryDropdown.value;
  displayOrCloseForm();
});


// ✅ Close form
closeFormButton.addEventListener('click', () => {
  displayOrCloseForm();
});


// ✅ Add bookmark
addBookmarkBtnForm.addEventListener('click', () => {
  const bookmarks = getBookmarks();

  bookmarks.push({
    name: nameEl.value,
    category: categoryDropdown.value,
    url: urlEl.value
  });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // reset inputs
  nameEl.value = '';
  urlEl.value = '';

  displayOrCloseForm();
});


// ✅ View category
viewCategoryButton.addEventListener('click', () => {
  const selectedCategory = categoryDropdown.value;
  categoryName.innerText = selectedCategory;

  const bookmarks = getBookmarks();
  const filtered = bookmarks.filter(
    bookmark => bookmark.category === selectedCategory
  );

  categoryList.innerHTML = '';

  if (filtered.length === 0) {
    categoryList.innerHTML = '<p>No Bookmarks Found</p>';
  } else {
    filtered.forEach(bookmark => {
      categoryList.innerHTML += `
        <div>
          <input 
            type="radio"
            id="${bookmark.name}"
            name="bookmark-option"
            value="${bookmark.name}"
          />
          <label for="${bookmark.name}">
            <a href="${bookmark.url}" target="_blank">
              ${bookmark.name}
            </a>
          </label>
        </div>
      `;
    });
  }

  displayOrHideCategory();
});


// ✅ Close category list
closeListButton.addEventListener('click', () => {
  displayOrHideCategory();
});


// ✅ Delete bookmark
deleteBookmarkButton.addEventListener('click', () => {
  const selectedRadio = document.querySelector(
    'input[name="bookmark-option"]:checked'
  );

  if (!selectedRadio) return;

  const selectedCategory = categoryDropdown.value;
  const selectedName = selectedRadio.value;

  let bookmarks = getBookmarks();

  // Remove only the selected bookmark in the selected category
  bookmarks = bookmarks.filter(bookmark =>
    !(bookmark.name === selectedName &&
      bookmark.category === selectedCategory)
  );

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // 🔄 Re-render category list after deletion
  viewCategoryButton.click();
});