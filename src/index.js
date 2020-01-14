let addToy = false


// Loaded Chain
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {toyForm.style.display = 'block'} else {toyForm.style.display = 'none'}
  })
  document.getElementById('add-toy-form').onsubmit = e => submitNewForm(e)
  document.getElementById('edit-confirm').onclick = e => clickEditConfirm(e)
  document.getElementById('edit-cancel').onclick = e => clickEditCancel(e)
  window.onclick = e => windowClick(e)
  getAllToys().then(toys => toys.forEach(displayToyCard))
})


// Fetches:
const getAllToys = () => fetch("http://localhost:3000/toys").then(r => r.json())
const getToy = id => fetch(`http://localhost:3000/toys/${id}`).then(r => r.json())
const postToy = toy => fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {"Content-Type": "application/json", "Accept": "application/json"},
  body: JSON.stringify(toy)
  }).then(r => r.json())
const patchToy = toy => fetch(`http://localhost:3000/toys/${toy.id}`, {
  method: "PATCH",
  headers: {"Content-Type": "application/json", "Accept": "application/json"},
  body: JSON.stringify(toy)
  }).then(r => r.json())
const deleteToy = id => fetch(`http://localhost:3000/toys/${id}`, {
  method: "DELETE",
  headers: {"Content-Type": "application/json", "Accept": "application/json"}
  }).then(r => r.json())


// Events:
const clickLike = e => likeToy(e.target.parentNode.parentNode.id)
const clickEdit = e => editToy(e)
const clickDelete = e => deleteToy(e.target.parentNode.parentNode.id).then(e.target.parentNode.parentNode.remove())
const submitNewForm = e => {
  e.preventDefault()
  postToy({name: e.target.name.value, image: e.target.image.value, likes: 0}).then(displayToyCard)
}
const clickEditConfirm = e => {
  e.preventDefault()
  let form = e.target.parentNode.parentNode
  patchToy({id: form.toyId.value, name: form.name.value, image: form.image.value}).then(toy => {
    displayToyCard(toy)
    closeModal()
  })
}
const clickEditCancel = e => {
  e.preventDefault()
  closeModal()
}
const windowClick = e => {if (e.target == document.getElementById('edit-modal')) {closeModal()}}


// Helpers:
const displayToyCard = toy => {
  document.querySelector('form').reset()
  let div = document.createElement('div'),
      h2 = document.createElement('h2'),
      img = document.createElement('img'),
      p = document.createElement('p'),
      btnDiv = document.createElement('div')
      btnLike = document.createElement('button'),
      btnEdit = document.createElement('button'),
      btnDel = document.createElement('button'),
      oldCard = document.getElementById(toy.id)
  div.className = "card"
  div.id = toy.id
  h2.innerText = toy.name
  img.src = toy.image
  img.className = "toy-avatar"
  p.innerText = toy.likes
  btnLike.innerText = "Like!"
  btnLike.onclick = e => clickLike(e)
  btnEdit.innerText = "Edit!"
  btnEdit.onclick = e => clickEdit(e)
  btnDel.innerText = "Delete!"
  btnDel.onclick = e => clickDelete(e)
  btnDiv.appendChild(btnLike)
  btnDiv.appendChild(btnEdit)
  btnDiv.appendChild(btnDel)
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(btnDiv)
  oldCard ? oldCard.replaceWith(div) : document.getElementById('toy-collection').appendChild(div)
}
const likeToy = id => {
  getToy(id).then(toy => {
    toy.likes++
    patchToy(toy).then(displayToyCard)
  })
}
const editToy = e => {
  let form = document.getElementById('edit-form')
  getToy(e.target.parentNode.parentNode.id).then(toy => {
    form.toyId.value = toy.id
    form.name.value = toy.name
    form.image.value = toy.image
    document.getElementById('edit-modal').style.display = "block"
  })
}
const closeModal = () => {
  document.getElementById('edit-modal').style.display = "none"
  document.getElementById('edit-form').reset()
}