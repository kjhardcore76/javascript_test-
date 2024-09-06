import {qs, qsa, log} from './utility.js'
import {registerValidate, registerBook, printBookArr, bindDeleteHandler, sortArr, searchArr} from './business.js'

const bookArr = []

qs('#register-btn').addEventListener('click', e=> {
  let category = qs('#category').value
  let bookName = qs('#bookname').value
  let bookPrice = parseInt(qs('#bookprice').value)
  let validated = registerValidate(bookArr, category, bookName, bookPrice)
  if(!validated) return
  registerBook(bookArr, category,bookName,bookPrice)
  printBookArr(bookArr)
})

qs('#sort-select').addEventListener('change', e=>{
  let copyArr = [...bookArr]
  if(!e.target.value) return
  sortArr(copyArr, e.target.value)
  printBookArr(copyArr)  
})

qs('#search-btn').addEventListener('click', e => {
  let keyword = qs('#search-input').value
  searchArr(bookArr, keyword)
})