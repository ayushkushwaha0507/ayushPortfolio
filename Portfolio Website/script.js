AOS.init();

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav');

window.onscroll=()=>{
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop -150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height ){
            navLinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header nav a [href*='+ id+ ']').classList.add('active');

            })
        }
    })
}

menuIcon.onclick =() =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


// String
var initialPath = `M 10 100 Q 250 100 990 100`;
var finalPath = `M 10 100 Q 250 100 990 100`;

var string = document.querySelector("#string");

string.addEventListener("mousemove", function(dets) {
    var boundingRect = string.getBoundingClientRect();
    var clampedX = Math.min(Math.max(dets.clientX, boundingRect.left), boundingRect.right);
    var clampedY = Math.min(Math.max(dets.clientY, boundingRect.top), boundingRect.bottom);
    
    initialPath = `M 10 100 Q ${clampedX - boundingRect.left} ${clampedY - boundingRect.top} 990 100`;
    gsap.to("svg path", {
        attr: { d: initialPath },
        duration: 0.1,  // Adjusted duration for faster movement
        ease: "power1.out"  // Smoother animation easing
    });
});

string.addEventListener("mouseleave", function() {
    gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 0.6,  // Adjusted duration for faster return
        ease: "elastic.out(1, 0.2)"  // More controlled return easing
    });
});


// Cursor Move
var cursor = document.querySelector("#cursor");

document.addEventListener("mousemove", function(event) {
    gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.4, // Adjusted duration for faster movement
        ease: "power1.out" // Smooth easing function
    });
});



// Text Animation
function breakTheText(){
    var h1 = document.querySelector("h1")
    var h1text = h1.textContent

    var splittedText = h1text.split("")
    var halfValue = splittedText.length/2

    var clutter =""

    splittedText.forEach(function(elem,idx){
        if(idx<halfValue){
            clutter +=`<span class="a">${elem}</span>`
        }else{
            clutter +=`<span class="b">${elem}</span>`
            
        }
    })
    h1.innerHTML=clutter
}
breakTheText()
gsap.from("h1 .a",{
    y:80,
    duration:0.9,
    delay:0.8,
    stagger:0.20,
    opacity:0
})
gsap.from("h1 .b",{
    y:80,
    duration:0.9,
    delay:0.8,
    stagger:-0.20,
    opacity:0
})

// Google Sheet connect code
var scriptURL = "https://script.google.com/macros/s/AKfycbzUiNNbJ0e5pwPmYCzusgkGFgMrHVvftIMNpuggKN-Xeorz2VHIx02bQjL8bExApVKUoA/exec";
var form = document.forms['google-sheet'];

form.addEventListener('submit', e => {
  e.preventDefault();

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      showCustomAlert("Thank You!", "Your message has been sent successfully!");
      form.reset();
    })
    .catch(error => {
      showCustomAlert("Error!", "Something went wrong. Please try again.");
      console.error('Error!', error.message);
    });
});

// Function to show custom alert
function showCustomAlert(title, message) {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('custom-alert');
  alertDiv.innerHTML = `<h2>${title}</h2><p>${message}</p>`;
  document.body.appendChild(alertDiv);

  // Remove the alert after 5 seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}
