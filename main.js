const dots = document.querySelectorAll(".dot-container button");
const images = document.querySelectorAll(".image-container img")

let i =0;
let j =4;

function next(){
    document.getElementById("content" + (i+1)).classList.remove("active");
    i=(j + i + 1) % j;
    document.getElementById("content" + (i+1)).classList.add("active");
    indicator(i+ 1);
}
function prev(){
    document.getElementById("content" +(i+1)).classList.remove("active");
    i=(j + i - 1) % j;
    document.getElementById("content"+(i+1)).classList.add("active");
    indicator(i+ 1);
}

function indicator(num){
    dots.forEach(function(dot){
        dot.style.backgroundColor= "transparent";   
    });
    document.querySelector(".dot-container button:nth-child("+num+")").style.backgroundColor=  "rgb(175, 133, 80)";
}
function dot(index){
    images.forEach(function(image){
        image.classList.remove("active");
    });
    document.getElementById("content"+ index).classList.add("active");
    i= index - 1;
    indicator(index);
}

// --------------------------json-----------------------------------------
function jsondata(){
   var first=document.getElementById("first");
   var last=document.getElementById("last");
   var email=document.getElementById("email");
   var message=document.getElementById("message");
   var obj=[{Firstname:first.value , Lastname:last.value , Email:email.value , Message:message.value, }];
   var jsonforma=JSON.stringify(obj);
    document.getElementById("Json").innerHTML= jsonforma;
    console.log(jsonforma);

}
// --------------------------darkmode--------------------------------
window.onload=function(){

   const toggle = document.getElementById('toggledark');
   const body = document.querySelector('body');

toggle.addEventListener('click', function(){

    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.background="white";
        body.style.color='black';
        body.style.transition= "2s";
        // document.getElementById('Json').style.borderColor="black";
    }
    else{
       
        body.style.background="black";
        body.style.color="white";
        body.style.transition= "2s";
        // document.getElementById('Json').style.borderColor="white";
        
    }
});


  }

// -----------------------------fetch--------------------------------

const postSection = document.querySelector('#posts');
const postTemplate = document.querySelector('#post-template');

getData()
  .catch(err => console.error(err));

async function getData() {
  const postStream = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await postStream.json();
  let i = 0;

  // throw 'Get Data Error';
  // console.log(posts);

  posts.forEach(post => {
    i++;
    if(i < 10) {
      const title = post.title;
      const body = post.body;

      fetch('https://unsplash.it/300/200')
        .then(res => res.blob())
        .then(blob => {
          const newPost = document.importNode(postTemplate.content, true);
          const postTitle = newPost.querySelector('.post__title');
          const postBody = newPost.querySelector('.post__body');
          const postImg = newPost.querySelector('.post__img');

          // throw 'Image Fetch Error';

          postImg.src = URL.createObjectURL(blob);
          postTitle.innerText = title;
          postBody.innerText = body;
          postSection.appendChild(newPost);
        })
        .catch(err => console.error(err));
    }
  })
}