// Loaded Chain
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('new-toy-btn').onclick = e => clickNew(e)
  document.getElementById('modal-confirm').onclick = e => clickModalConfirm(e)
  document.getElementById('modal-cancel').onclick = e => clickModalCancel(e)
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
const windowClick = e => {if (e.target == document.getElementById('modal')) {closeModal()}}
const clickModalCancel = e => closeModal()
const clickNew = e => addToy()
const clickLike = e => likeToy(e.target.parentNode.parentNode.id)
const clickEdit = e => editToy(e.target.parentNode.parentNode.id)
const clickDelete = e => deleteToy(e.target.parentNode.parentNode.id).then(e.target.parentNode.parentNode.remove())
const clickModalConfirm = e => {
  let form = document.getElementById('modal-form')
  toy = {id: form.toyId.value, name: form.name.value, image: form.image.value}
  toy.id ? patchToy(toy).then(displayToyCard) : postToy({...toy, likes: 0}).then(displayToyCard)
}


// Helpers:
const displayToyCard = toy => {
  closeModal()
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
const addToy = () => {
  document.getElementById('modal-title').innerText = "Add Toy:"
  document.getElementById('modal').style.display = "block"
}
const editToy = id => {
  document.getElementById('modal-title').innerText = "Edit Toy:"
  let form = document.getElementById('modal-form')
  getToy(id).then(toy => {
    form.toyId.value = toy.id
    form.name.value = toy.name
    form.image.value = toy.image
    document.getElementById('modal').style.display = "block"
  })
}
const closeModal = () => {
  document.getElementById('modal').style.display = "none"
  document.getElementById('modal-form').reset()
}