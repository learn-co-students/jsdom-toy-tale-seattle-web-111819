let toyURL = 'http://localhost:3000/toys'
let addToy = false

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
  const newToyForm = document.getElementById("new-toy-form")
  newToyForm.addEventListener("submit", (e) => addNewToy(e))
  fetchToys()  
})

fetchToys = () => {
  fetch(toyURL)
  .then(res => res.json())
  .then(toys => displayToys(toys))
}

displayToys = (toys) => {
  toys.forEach(toy => {
    makeToyCard(toy)
  })
}

makeToyCard = (toy) => {
  // console.log(toy)
  let toyCollection = document.getElementById('toy-collection')
  
  const div = document.createElement('div')
  div.className = 'card'

  const h2 = document.createElement('h2')
  h2.innerText = toy.name
  
  const img = document.createElement('img')
  img.src = toy.image
  img.classList.add('toy-avatar')

  const p = document.createElement('p')
  p.innerText = toy.likes

  const button = document.createElement('button')
  button.innerText = "Like"

  div.append(h2)
  div.append(img)
  div.append(p)
  div.append(button)
  toyCollection.appendChild(div)
}

addNewToy = (e) => {
  e.preventDefault()
  // console.log("Name Value" ,e.target['name'].value)
  // console.log("Image value", e.target['image'].value)
  fetch(toyURL, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: e.target['name'].value,
      image: e.target['image'].value,
      likes: 0
    })
  }).then(res => res.json()).then(response => makeToyCard(response))
}


// old code
// let addToy = false

// document.addEventListener("DOMContentLoaded", ()=>{
//   const addBtn = document.querySelector('#new-toy-btn')
//   const toyForm = document.querySelector('.container')
//   addBtn.addEventListener('click', () => {
//     // hide & seek with the form
//     addToy = !addToy
//     if (addToy) {
//       toyForm.style.display = 'block'
//     } else {
//       toyForm.style.display = 'none'
//     }
//   })

//   fetchToys()

//   document.querySelector('form').addEventListener("submit", event => {
//     event.preventDefault()
//     //console.log(event.target['name'].value)
    
//     const newToy = {
//       "name": event.target['name'].value,
//       "img": event.target['img'].value
//     }
//     postToy(newToy).then(toy => addNewToy(toy))
//   })
// })

// function addNewToy(toy){
//   const toyCollection = document.querySelector('#toy-collection')
//   const div = makeToyCard(toy)
//   toyCollection.appendChild(div)
// }

// function showToys(toysArray) {
//   toysArray.map(toy => {
//     addNewToy(toy)
//   })
// }

// fetchToys = () => {
//   fetch('http://localhost:3000/toys')
//   .then( res => res.json())
//   .then(response => showToys(response))
// }


// function makeToyCard(toy) {
//   const div = document.createElement('div')
//   div.className = 'card'

//   const h2 = document.createElement('h2')
//   h2.innerText = toy.name
  
//   const img = document.createElement('img')
//   img.src = toy.image
//   img.classList.add('toy-avatar')

//   const p = document.createElement('p')
//   p.innerText = toy.likes

//   const button = document.createElement('button')
//   button.innerText = "Like"

//   div.append(h2)
//   div.append(img)
//   div.append(p)
//   div.append(button)
  
//   return div

//   }

// const postToy = toy  => {
//   return fetch('http://localhost:3000/toys', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(toy)
//   }).then( res => res.json())
//     .then(response => addNewToy(response))
// }
