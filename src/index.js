let addToy = false
let toyDisplayArea = document.getElementById("toy-collection");
editedNode = null 

document.addEventListener("DOMContentLoaded", ()=>{ 
  getToys();

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', e =>{
        e.preventDefault()
      // console.log(e)
        postToy(e.target) //???Q4 
      })
    } else {
      toyForm.style.display = 'none'
    }
    //event listener for add new toy button 
    //retrive the date from event 
    // function(e) or (e) => {} they all work the same as function 
    console.log("when i been loaded ")
   toyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // console.log(e.target.image.value)
      // console.log(e)
      // let toyName = e.target.name.value
      // let toyImage = e.target.image.value
      addThisToy(e) 
 
  })
     //we only need this one ???
})})

function postToy(data){   
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({//??? Q1
      "name": data.name.value,
      "image": data.image.value,
      "like": 0
    })
  })
  .then(res => res.json())
  .then((data) => {
    let new_data = toyCard(data) //???Q2
    toyDisplayArea.appendChild(new_data);  //????Q3
  })
}




//get all the toys from the data

getToys = () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => getToy(toys) )
}
//add a new toy to the display 
addThisToy = (e) => {

  fetch("http://localhost:3000/toys", {
  method: "POST", 
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },     // post second step 
  body: JSON.stringify({
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0   // retrive the data first step 
  })

}).then(res => res.json())
.then(data => toyCard(data))
  } //append child to the DOM thrid step 


//each toy 
getToy = (toys) =>{
toys.forEach(toy =>{
  toyCard(toy)
 })
}


function like(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method:  "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      // likes: parseInt(e.target.previousElementSibling.innerText)+1 
      "likes": toy.likes + 1 
     
    })
  })
    .then(res => res.json())
    .then(data => {editedNode.replaceWith(toyCard(data))
    })
  
  
}

//toy card 
toyCard = (toy) => {
  let toyDisplayArea = document.getElementById("toy-collection");

  let div = document.createElement("div");
  div.classList.add("card");

  let img = document.createElement("img");
  img.src = toy.image;
  img.classList.add("toy-avatar");

  let toyTitle = document.createElement("h2");
  toyTitle.textContent = toy.name;

  let likeCount = document.createElement("p");
  
  
  likeCount.innerText = `${toy.likes} likes`;
  
  
  let likeButton = document.createElement("button");
  likeButton.classList.add("like-btn");
  likeButton.textContent = "like ";
  likeButton.addEventListener("click", (e) => {

    // console.log(e)
    // console.log(parseInt(e.target.previousElementSibling.innerText));
   like(toy)
   editedNode = div
  })

  toyDisplayArea.appendChild(div);
  div.appendChild(img);
  div.appendChild(toyTitle);
  div.appendChild(likeCount);
  div.appendChild(likeButton);
   
 return div
  
}







