var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  grabCursor: true,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let error = 0;
let emailpattern = /[a-zA-Z0-9_.]{2,20}[@][a-zA-Z]{2,10}[.][a-zA-Z]{2,5}/;
let fullname = document.getElementById("fullname");
let subject = document.getElementById("subject");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let message = document.getElementById("message");
var regPhone=/^\d{10}$/;                                        
var regName = /\d+$/g;  

//declaration of error messages
let error_name = document.getElementById("error_name");
function formvalidation() {
  validateName();
  validateSubject();
  validateEmail();
  validatePhone();
  validateMessage();
  if (error == 0) {
    alert("Message sent successfully");
  }
}
function validateName()
{
  if (fullname.value == "") {
    error_name.innerHTML = "Please enter your name";
    error = 1;
  }
  else if (regName.test(fullname.value)) {
    error_name.innerHTML = "Invalid name";
    error = 1;
  }
  else {
    error_name.innerHTML = "";
    error=0;
  }
}
function validateSubject()
{
  if (subject.value == "") {
    error_subject.innerHTML = "Please enter your subject";
    error = 1;
  }
  
  else {
    error_subject.innerHTML = "";
    error=0;
  }
}
function validateEmail(){
  if (email.value == "") {
    error_email.innerHTML = "Please enter your email";
    error = 1;
  }
  else if (!emailpattern.test(email.value)) {
    error_email.innerHTML = "Invalid email address";
    error = 1;
  }
  else{
    error_email.innerHTML = "";
    error=0;
  }
}
function validatePhone(){
  if (phone.value == " ") {
    error_phone.innerHTML = "Please enter your phone number";
    error = 1;
  }
  else if (!regPhone.test(phone.value)) {
    error_phone.innerHTML = "Invalid phone number";
  }
  else{
    error_phone.innerHTML = "";
    error=0;
  }
}
function validateMessage(){
  if (message.value == "") {
    error_message.innerHTML = "Please enter your message";
    error = 1;
  }
  else{
    error_message.innerHTML = "";
    error=0;
  }
}


function handleSubmitBlog(e) {
  let inputEl = document.getElementById('blogImage');
    let file = inputEl.files[0];
    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.addEventListener('load', () => {
      let images = fr.result

      var ourform = document.getElementById("blogInput");
      var title = ourform["title"].value;
      var description = ourform["description"].value;

      if (localStorage.getItem("blogs") == null) {
        let array = [];
        let blog = {
          id: 1,
          title,
          images,
          description
        }
        array.push(blog);
        localStorage.setItem("blogs", JSON.stringify(array));
        window.alert("New Blog added successfuly");


      } else {

        let array = JSON.parse(localStorage.getItem("blogs"));
        let blog = {
          id: (array.length + 1),
          title,
          images,
          description
        }
        array.push(blog);
        localStorage.setItem("blogs", JSON.stringify(array));
        window.alert("Blog added successfuly");

      }
    })
  let editBlog = (blogId) => {
    console.log(blo)
    let array = JSON.parse(localStorage.getItem("blogs"));
    array.map((item) => {
      if (blogId == item.id) {
        item.title = "New Value"
      }
    })
    localStorage.setItem("blogs", JSON.stringify(array));
  }
}

let getBlogs = () => {
  //localStorage.removeItem("blogs");
  var result = localStorage.getItem("test");

  var fromStorage = localStorage.getItem("blogs");
  var blogsResult = JSON.parse(fromStorage);
  if (blogsResult) {
    document.getElementById("blogOutputs").innerHTML = blogsResult.map((item) =>`<div class="blogCard"><img src="${item.images}"/><h5>${item.title}</h5><p>${item.description}</p></div>`);
  }

}
getBlogs();
//console.log(localStorage.getItem("blogs"));
/* <button onclick="editBlog(${item.id})">Edit</button> */
// function sendEmail(){
//   Email.send({
//     Host : "smtp.elasticemail.com",
//     Username : "ericsibomana433@gmail.com",
//     Password : "93C573948108E2EA07F1EF092FE5B8BC6835",
//     To : 'tmmethode1@gmail.com',
//     From : email,
//     Subject : subject,
//     Body : message
// }).then(
//   message => alert(message)
// );
// }
