let addToy = false
let likedToyCard = null

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  let form = document.getElementsByClassName('add-toy-form')[0]
  form.onsubmit = e => submitToy(e)
  getToys();
})

const getToys = () => {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => makeMultipleToyCards(json))
}

const makeMultipleToyCards = json => {
  json.forEach(toy => makeToyCard(toy))
}

const makeToyCard = toy => {
  let div = document.createElement('div')
  div.classList.add("card")
  let h2 = document.createElement('h2')
  h2.inner Text = toy.name
  let img = document.createElement('img')
  img.src = toy.image
  img.classList.add("toy-avatar")
  img.height = 150
  let p = document.createElement('p')
  p.innerText = toy.likes
  let button = document.createElement('button') 
  button.classList.add("like-btn")
  button.innerText = "Like"

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  button.onclick = () => {
    likedToyCard = div
    likeToy(toy)
  }

  document.getElementById('toy-collection').appendChild(div)
  return div
}


const submitToy = e => {
  e.preventDefault();
  let newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0  
  }

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  })
    .then(resp => resp.json())
    .then(json => makeToyCard(json))
}

const likeToy = toy => {
  // toy.likes ++
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes + 1
    })
  })
    .then(resp => resp.json())
    .then(json => likedToyCard.replaceWith(makeToyCard(json)))
}
