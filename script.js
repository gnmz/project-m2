const lists = document.querySelector(`.tasks__list`);
const element = document.querySelector('.tasks__item');
const check = document.querySelector('.check');
const removeItem = document.querySelector('.delete');
const filter = document.querySelector('.filter');
const inputValue = document.querySelector('.input-text');
const filterUp = document.querySelector('.filter-up');


//создаем новый элемент start

function newElement() {
    const li = document.createElement('li');
    const inputText = document.createElement('input');
    li.className = 'tasks__item';
    li.draggable = true;
    inputText.className = 'input-text';
    const newCheck = check.cloneNode(true);
    const close = removeItem.cloneNode(true);
    // добавляем обработчик удаления задачи start
    close.addEventListener('click', () => { 
      li.remove();
    })
    // добавляем обработчик удаления задачи end
    //обработчик зачеркивания
    // newCheck.addEventListener('click', () => {
    //   inputText.style.textDecoration = 'line-through';
    // })
    // обработчик зачеркивания
    li.append(newCheck);
    li.append(inputText);
    li.append(close);
    lists.append(li);
}
//создаем новый элемент end

// добавляем обработчик удаления первой задачи start
removeItem.addEventListener('click', () => {
  element.remove();
});
// добавляем обработчик удаления первой задачи end

// drag & drop start

lists.addEventListener(`dragstart`, (evt) => {
  evt.target.style.backgroundColor = '#FFDC40';
  evt.target.style.mixBlendMode = 'multiply';
  evt.target.classList.add(`selected`);
  evt.target.style.color = 'black';
  evt.target.classList.add(`border`);
});

lists.addEventListener(`drag`, (evt) => {
  evt.target.classList.add(`selected`);
  evt.target.style.backgroundColor = '#E4E4E4';
  evt.target.style.color = 'white';
  evt.target.style.borderBottom = '2px solid #833AE0';
  evt.target.classList.remove(`border`);
});

lists.addEventListener(`dragend`, (evt) => {
  evt.target.style.backgroundColor = 'white';
  evt.target.classList.remove(`selected`);
  evt.target.style.color = 'black';
  evt.target.style.borderBottom = 'none';
});

lists.addEventListener(`dragover`, (evt) => {
  evt.preventDefault();
  
  let activeElement = lists.querySelector(`.selected`);
  let currentElement = evt.target;
  let isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`tasks__item`);
    
  if (!isMoveable) {
    return;
  }
  
  let nextElement;
  
  if (currentElement === activeElement.nextElementSibling) {
    nextElement = currentElement.nextElementSibling;
} else {
    nextElement = currentElement;
}
		
	lists.insertBefore(activeElement, nextElement);
});
// drag & drop end

// изменение значка фильтра при нажатии и сортировка start

filter.addEventListener('click', () => {
  if(filter.style.display = 'block') {
    filter.style.display = 'none';
    filterUp.style.display = 'block';
  }
  let newArr = [];
  let inputValues = document.querySelectorAll('.input-text');

  for ( let i = 0; i < inputValues.length; i++){
    newArr.push(inputValues[i].value);
  }
  newArr.sort((a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
});
  for (let k = 0; k < newArr.length; k++) {
    inputValues[k].value = newArr[k];
  }
});
filterUp.addEventListener('click', () => {
  if (filterUp.style.display = 'block') {
    filterUp.style.display = 'none';
    filter.style.display = 'block';
  }
  let newArr = [];
  let inputValues = document.querySelectorAll('.input-text');

  for ( let i = 0; i < inputValues.length; i++){
    newArr.push(inputValues[i].value);
  }
  newArr.sort((a, b) => {
    if (a < b) {
        return 1;
    }
    if (a > b) {
        return -1;
    }
    return 0;
});
  for (let k = 0; k < newArr.length; k++) {
    inputValues[k].value = newArr[k];
  }
});

// изменение значка фильтра при нажатии и сортировка  end

// check.addEventListener('click', () => {
//   inputValue.style.textDecoration = 'line-through';
// })