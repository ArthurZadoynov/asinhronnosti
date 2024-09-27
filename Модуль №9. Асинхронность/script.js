const categorySelect = document.getElementById('category-select');
const filterBtn = document.getElementById('filter-btn');
const limitBtn = document.getElementById('limit-btn');
const productList = document.getElementById('productList');

filterBtn.addEventListener('click', () => {
  stepLimit = 6;
  limitProducts(categorySelect.value, stepLimit)
  let countProducts = 6;
});

async function fetchProducts(category, limit){
  try {
    let apiUrl = 'https://fakestoreapi.com/products';
   
  if (category) {
    apiUrl += '/category/' + category;
  }
  if (limit) {
    apiUrl += '?limit=' + limit;
  }
  if (categorySelect.value == '')
    return limitProducts(categorySelect.value, stepLimit)
  await fetch(apiUrl)
  .then((response) => response.json())
  .then((products) => allProducts(products))
  } catch (err) {
    console.error('Произошла ошибка при получении товаров:', err);
  }

}
limitProducts ('', '6');


function allProducts(products){
  productList.innerHTML= "";
  products.forEach(product => {
    const listItem = document.createElement('div');
    listItem.id = 'itemId';
    productList.appendChild(listItem);

    const imageItem = document.createElement('img')
    imageItem.src = product.image;
    listItem.appendChild(imageItem)

    const deleteItem = document.createElement('button');
    deleteItem.innerHTML = "&#x2715;";
    deleteItem.className = "btn";
    listItem.appendChild(deleteItem);

    const titleItem = document.createElement('h2');
    titleItem.innerHTML = product.title;
    listItem.appendChild(titleItem);

    const descItem = document.createElement('p');
    descItem.innerHTML = product.description;
    listItem.appendChild(descItem);

    const priceItem = document.createElement('h3');
    priceItem.innerHTML = `${product.price} $`;
    listItem.appendChild(priceItem);

    const categoriesItem = document.createElement('p');
    categoriesItem.innerText = ('category: ') + product.category;
    listItem.appendChild(categoriesItem);
    categoriesItem.id = 'categoriesItem';

    const deleteBtns = document.querySelectorAll(".btn");

    deleteBtns.forEach(btn => {
      btn.addEventListener('click', deleteFunction);
    });
  })
};

let stepLimit = 6;
let LimitValue = stepLimit;
let countProducts = 6;

async function limitProducts(category, limit){
  let divisor = 6;
  try {
    let apiUrl = 'https://fakestoreapi.com/products';
    if (category) {
      apiUrl += '/category/' + category;
    }
    if (limit) {
    apiUrl += '?limit=' + limit;
  }
  await fetch(apiUrl)
  .then((response) => response.json())
  .then((products) => allProducts(products))
  } catch(err) {
    console.error('Произошла ошибка при получении лимита товаров:', err);
  }
  const countProducts = productList.getElementsByTagName('div').length;
  
  if (!Math.floor (countProducts/divisor) || stepLimit != countProducts) {
    document.querySelector('#limit-btn').style.visibility = 'hidden';
  } else {
    document.querySelector('#limit-btn').style.visibility = 'visible';
  }
};

 limitBtn.addEventListener('click', () => {
    stepLimit += LimitValue;
    limitProducts(categorySelect.value, stepLimit);
    let countProducts = productList.getElementsByTagName('div').length;
  });

  async function getCategories(){
    try{
    await  fetch('https://fakestoreapi.com/products/categories')
      .then(res=>res.json())
      .then(categories => listCategories(categories))
    } catch (err){
      console.error('Произошла ошибка при получении категорий:', err);
    }
  };
  
  function listCategories(categories){
    categorySelect.innerHTML = '';
    categorySelect.innerHTML += '<option value="">All</option>';
      categories.forEach(category => {
        categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
    });
  };
  
  getCategories ();

async function deleteFunction() {
  try {
  await fetch('https://fakestoreapi.com/products/6', {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(json => console.log(json))
    alert('Товар удален');
  } catch (err) {
    console.error('Произошла ошибка при удалении товара:', err);
  }
};

const formAddCard = document.querySelector('.formAddCard')
// const addBtn = document.querySelector('#addBtn');
formAddCard.addEventListener('submit', (event) => {
  addBtnFunc ();
  event.preventDefault()
  event.target.reset();
});



async function addBtnFunc() {
  try {
  await fetch('https://fakestoreapi.com/products', {
    method: "POST",
    body: JSON.stringify(
      {
        title: document.querySelector('#title').value,
        price: parseFloat(document.querySelector('#price').value),
        description: document.querySelector('#description').value,
        category: document.querySelector('#category').value
      }
    )
  })
    .then(res => res.json())
    .then(json => console.log(json))
    alert('Товар успешно добавлен');
  } catch(err) {
    console.error('Произошла ошибка при добавлении товара:', err);
  }
};