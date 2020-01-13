let addToy = false

// PATCH STEP 5
// create global variable for PATCH
editedLikes = null

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
  
  // Call on functions with .addEventListener and POST requests here

  // GET STEP 2
  // add toys fetch function
  fetchToys();

  // POST STEP 3
  // LOAD submit button for adding a new toy
  submitToy();
})

// GET STEP 1
// make fetch request to fetch all toys from API
// fetch() request returns a Promise
// pass on json data to showToys function to display the toy data
fetchToys = () => {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => showToys(json))
}

// GET STEP 3
// Iterate through toys array to get each toy
// pass on to makeToyCard function to create a card for each toy
const showToys = (toyArray) => {
  toyArray.forEach(toy => makeToyCard(toy))
}

// GET STEP 4
// create card div to hold toy info
// append each HTML element to the "card" div
// THIS DISPLAYS ON DOM(front-end)
const makeToyCard = (toy) => {
  let div = document.createElement("div")
  div.classList.add("card")

  let h2 = document.createElement("h2")
  h2.textContent = toy.name

  let img = document.createElement("img")
  img.classList.add("toy-avatar")
  img.src = toy.image

  let p = document.createElement("p")
  p.textContent = `${toy.likes} likes`

  let likeButton = document.createElement("button")
  likeButton.classList.add("like-btn")
  likeButton.textContent = "Like"

  // PATCH STEP 1
  // add .addEventListener to the Like button
  likeButton.addEventListener("click", () => {
    // console.log(event)
    likeToy(toy)
    // pass in each toy

  // PATCH STEP 2
  // create new div box each time a toy is liked
  editedLikes = div

    })
  // DELETE STEP 2 
  // create delete button
  let deleteButton = document.createElement("button")
  // deleteButton.setAttribute("delete-btn", toy.id)
  deleteButton.classList.add("delete-btn")
  deleteButton.textContent = "Delete"
  deleteButton.addEventListener("click", () => {
    deleteToy(toy.id)
    div.remove();
    // console.log(event)
  })

  // add each element to the makeToyCard div 
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)

  // PATCH STEP 3
  // append like button to toy div
  div.appendChild(likeButton)

  // DELETE STEP 3
  // append delete button to toy div
  div.appendChild(deleteButton)

  // pass each toy card div to a new function to append to "toy-collection" div
  // console.log(div)
  appendCard(div)

  // PATCH STEP 4
  // return div to display a new card on the new patched page
  return div
}

// GET STEP 5
// select "toy-collection" div from index.html
// append toy card to "toy-collection" div
const appendCard = (card) => {
  let toyCollection = document.getElementById("toy-collection")
  toyCollection.appendChild(card)
}

// POST STEP 1
// select form and add submit button
// need to add submitToy(); to "DOMContentloaded" 
const submitToy = () => {
  let addToyForm = document.getElementById("add-toy-form")
  addToyForm.addEventListener("submit", event => {
    event.preventDefault()
    // console.log(event)
    postToy(event)
  })
}

// POST STEP 2
// new toy card to API(back-end)
const postToy = (event) => {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify( {
      // name: console.log(event.target.name.value)
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    } )
  }) 
  .then(resp => resp.json())
  .then(json => makeToyCard(json))
}

// PATCH STEP 6
// update number of likes in API(back-end)
const likeToy = (toy) => {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify( {
      likes: toy.likes +1 // increment Likes by 1
    } )
  })
  .then(resp => resp.json())
  .then(json => {
    editedLikes.replaceWith(makeToyCard(json))
    // update Likes count by replacing old toy card div with a new one
  })
}

// DELETE STEP 1
// delete toy object from API(back-end)
const deleteToy = (toy) => {
  fetch(`http://localhost:3000/toys/${toy}`, {
    method: "DELETE"
  })
}