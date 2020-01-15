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

  let form = document.querySelector(".add-toy-form");
  //event listener for add new toy button
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(e)
    addThisToyForm(e)
    // e.target.reset();
    // toyForm.style.display = 'none'

  })

  getToys();
  
})

//get Data
const getToys = () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(json => getToy(json));
}

//get ONE toy
const getToy = (json) => {
  json.forEach(toy => {
    toyCard(toy)
  })
}
// POST new toy to DB
addThisToyForm = (e) => {
  let toyName = e.target["name"].value;   // input location
  let toyImage = e.target["image"].value;

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName, 
      image: toyImage,
      likes: 0
    })
  }).then(res => res.json()).then(json => {
    toyCard(json)
    // console.log(json);
  }) 
}


//make singleToyCard
toyCard = (toy) => {
  let toyDisplayArea = document.getElementById("toy-collection");
  let toyCard = document.createElement("div");
  toyCard.classList.add("card");
  
  let toyImg = document.createElement("img");
  toyImg.src = toy.image;
  toyImg.classList.add("toy-avatar")
  
  let toyName = document.createElement("h2");
  toyName.textContent = toy.name;
  
  let likeCount = document.createElement("p");
  likeCount.innerText = `${toy.likes} likes`;  // prints out toy likes in way that can l8r ++
  
  let likeButton = document.createElement("button");
  likeButton.classList.add("like-btn");
  likeButton.textContent = "Like";
  likeButton.addEventListener("click", () => { // addEventListener in card b/c it already has it
    toy.likes++ //increment likes
    likeCount.innerText = `${toy.likes} likes` // render new likes to screen. 

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes
      })
    })
  })
  

  toyDisplayArea.appendChild(toyCard);
  toyCard.appendChild(toyImg);
  toyCard.appendChild(toyName);
  toyCard.appendChild(likeCount);
  toyCard.appendChild(likeButton);

}

