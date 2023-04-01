let elForm = select ("#form")
let selectName = select("#selectId")
let elList = select("#list")
let createTemp = select("#tempLi").content
let modalTemplate = select("#modalTemp").content
let key = "58ed228a"

elForm.addEventListener("submit", evt =>{
  evt.preventDefault()
  elList.innerHTML = ` <div class="spinner-border text-blue" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>`;
  let{searchInp} = evt.target.elements
  
  getApi(searchInp.value.trim(),key)
  searchInp.value = null
  
})

async function getApi (searchInp,key){
  let data = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${searchInp}`)
  .then((res)=> res.json())
  .then ((data)=> {
    console.log(data);
    return data.Search
  })
  .catch((error)=> console.log(error))
  
  renderFunc(data,elList)
  console.log(data);
}


function renderFunc(array,element){
  
  element.innerHTML = null;
  array ? array.forEach(film => {
    let template = createTemp.cloneNode(true)
    
    let li = select("li",template)
    let img = select("img",template)
    let h2 = select("h2",template)
    let p = select("p",template)
    let btn = select("button",template)
    
    // console.log(li,img,h2, p,btn);
    img.src = film.Poster;
    h2.textContent = film.Title;
    p.textContent = film.Year;
    btn.dataset.id = film.imdbID;
    li.append(img,h2, p,btn)
    element.append(li)
    btn.addEventListener("click",evt =>{
      let filmId = evt.target.dataset.id
      let cloneTemp = modalTemplate.cloneNode(true)
      // console.log(cloneTemp);
      let cloneFilm =array.find((item) => item.imdbID== filmId)
      // console.log(cloneFilm);
      
      let tempModal = select("#modal",cloneTemp)
      let img = select("img",cloneTemp)
      let h2 = select("h2",cloneTemp)
      let h3 = select("h3",cloneTemp)
      let p = select("p",cloneTemp)
      
      img.src = cloneFilm.Poster;
      // console.log( iframe.src);
      h2.textContent = cloneFilm.Title
      // h3.textContent = `Genres : ${cloneFilm.genres.join(",  ")}`
      p.textContent = cloneFilm.overview
      document.querySelector("body").append(tempModal)
      
      
      element.append(li)
      
    });
  }) : null
}
function delBtn(){
  const modalTempa  = document.getElementById("modal");
  modalTempa.remove();
}
// renderFunc(data,elList)


// function renderGenre (array,element){
//   let genreArr = []
//   array.forEach(film => {
//     film.genres.forEach(genre =>{
//       !genreArr.includes(genre) ? genreArr.push(genre) : null
//     })
//   });

//   genreArr.forEach(genre=> {
//     let newOption = create("option")
//     newOption.textContent = genre;
//     newOption.value = genre;
//     element.append(newOption)
//   })
// }
// // renderGenre (data,selectName)

// function renderFunc(array,element){
//   element.innerHTML = null;
//   array.forEach(film =>{
//     let template = createTemp.cloneNode(true)

//     let li = select("li",template)
//     let img = select("img",template)
//     let h2 = select("h2",template)
//     let p = select("p",template)
//     let btn = select("button",template)

//     console.log(li,img,h2, p,btn);
//     img.src = film.Poster;
//     h2.textContent = film.Title;
//     p.textContent = film.Year;
//     btn.dataset.id = film.id;

//     btn.addEventListener("click",evt =>{
//       let filmId = evt.target.dataset.id
//       let cloneTemp = modalTemplate.cloneNode(true)
//       // console.log(cloneTemp);
//       let cloneFilm =array.find((item) => item.id== filmId)
//       // console.log(cloneFilm);

// --*63


//     element.append(li)
//     console.log();
//   })
// }
// // renderFunc(films,elList)

// function delBtn(){
//   const modalTempa  = document.getElementById("modal");
//   modalTempa.remove();
// }
// let key = "de6a11ad"