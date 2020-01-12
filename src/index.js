let addToy = false
let toyURL = "http://localhost:3000/toys"
editedNode = null

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

  fetchToyObjects()
  submitToy()
})

// fetch toy url and turn into readable stream
fetchToyObjects= () => {
  fetch(toyURL)
  .then(res => res.json())
  .then(json => showToyObjects(json))

}

// iterate over each toy that was fetched
const showToyObjects = toyArray => {
  toyArray.forEach(toy => makeToyCard(toy))
}

// make toy card


const makeToyCard = toy => {
 let div = document.createElement('div')
 div.classList.add('card')

 let h2 = document.createElement('h2')
 h2.innerText = toy.name

 let img = document.createElement('img')
 img.src = toy.image
 img.classList.add('toy-avatar')

 let p = document.createElement('p')
 p.innerText = (`${toy.likes} likes`)

 let likeButton = document.createElement('button')
 likeButton.classList.add('like-btn')
 likeButton.innerText = "Like"
 likeButton.addEventListener("click", e => {
  //  console.log(e)
   likeToy(toy)
   editedNode = div
 })

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(likeButton)
  

  appendCard(div)
  return div

}

const likeToy = (toy) => {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes + 1
    })
    })
    .then(res => res.json())
    .then(data => {
      editedNode.replaceWith(makeToyCard(data))
  })
}

// append toy card to toy div
const appendCard = card => {
  toyCollectionDiv = document.getElementById('toy-collection')
  toyCollectionDiv.appendChild(card)
}


// add new toy (with a callback to makeToyCard)
// eventually call appendCard function at the end
//start with submit button
const submitToy = () => {
let newToyForm = document.getElementById('new-toy-form')
newToyForm.addEventListener("submit", e => {
  e.preventDefault()
  postToy(e)
  })
}

//and then add to database
const postToy = e => {
  fetch(toyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(json => makeToyCard(json))
}