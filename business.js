import { qs, qsa, log } from './utility.js'

export const registerValidate = (bookArr, category, bookName, bookPrice) => {
  console.log(bookArr);
  if (!category) {
    alert('카테고리를 선택하세요')
    return false
  }
  if (!bookName) {
    alert('책이름을 입력하세요')
    return false
  }
  if (!bookPrice) {
    alert('책가격을 숫자로 입력하세요')
    return false
  }
  if (bookArr.filter(book => book.category === category && book.bookName === bookName).length) {
    alert('같은 카테고리에 동일한 책이 등록되어 있습니다')
    return false
  }
  return true
}

export const registerBook = (bookArr, category, bookName, bookPrice) => {
  let id = Date.now()
  bookArr.push({ id, category, bookName, bookPrice })
}

export const printBookArr = (bookArr) => {
  qs('#book-list-tbody').innerHTML = ''
  bookArr.forEach(book => {
    let { id, category, bookName, bookPrice } = book
    qs('#book-list-tbody').insertAdjacentHTML('beforeend', `
      <tr> 
        <td>${id}</td> 
        <td>${category}</td> 
        <td>${bookName}</td> 
        <td>${bookPrice}원</td> 
        <td><button value="${id}">삭제</button></td> 
      </tr>
    `)
    bindDeleteHandler(bookArr)
  })
}

export const bindDeleteHandler = (bookArr) => {
  qsa('#book-list-tbody button').forEach(btn => {
    btn.addEventListener('click', e => {
      let id = parseInt(e.target.value)
      let idx = bookArr.findIndex(book => book.id === id)
      bookArr.splice(idx, 1)
      printBookArr(bookArr)
    })
  })
}

export const sortArr = (copyArr, sortby) => {
  copyArr.sort((a, b) => {
    return (sortby === 'ascending') ? a.bookPrice - b.bookPrice : b.bookPrice - a.bookPrice
  })
}

export const searchArr = (bookArr, keyword) => {
  return bookArr.filter(book => book.bookName.includes(keyword))
}