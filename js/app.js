// Define Global Variables which I will need all the way long.

const allPageSections = document.querySelectorAll("section");
const navbar_Ul = document.getElementById("navbar__list");
// End Global Variables

// Building nav

// Looping through all section
for (let section of allPageSections) {
  //creating li dynamically for each section
  let li = document.createElement("li");
  // Defining and linking each li item to each section using (data-nav) and (id) attributes
  li.innerHTML = `<a href="#${section.id}" class='menu__link'>${section.dataset.nav}</a>`;
  // appending li items to the parent Ul
  navbar_Ul.appendChild(li);
}

// Adding (your-active-class) to the section in viewport

function activeSecInView() {
  for (let section of allPageSections) {
    // Getting getBoundingClient for the section
    let sectionDOMRect = section.getBoundingClientRect();
    // console.log(sectionDOMRect.top);
    // setting conditions to make sure that section is in viewport
    if (
      sectionDOMRect.top < window.innerHeight && //section start to enter viewport
      sectionDOMRect.top > 0 && //  excludes other sections
      sectionDOMRect.top < 100 // enough part of section is appearing
    ) {
      section.classList.add("your-active-class"); //adding active class

      //Add an active state to navigation items when a section is in the viewport.
      const liLinks = document.querySelectorAll("li a"); // select links
      for (let link of liLinks) {
        // looping through links
        if (link.innerText == section.dataset.nav) {
          // unique to each list item
          link.classList.add("active"); //adding class to the meant list item
        } else {
          link.classList.remove("active"); // removing from other link items
        }
      }
    } else {
      // removing (your-active-class) from other sections
      section.classList.remove("your-active-class");
    }
    // hiding navbar while not scrolling is paused
    setTimeout(function () {
      // use setTimeout to check when no longer scrolling
      navbar_Ul.style.display = "none"; // make nav disappear after 7 seconds
    }, 7000);
    navbar_Ul.style.display = "block"; // appear again upon scrolling
  }
}
window.addEventListener("scroll", activeSecInView); // add scroll eventlistener to window and call the function.

// Scroll to section on link click
navbar_Ul.addEventListener("click", (e) => {
  //add click event listener to the nav list
  //   console.log(e.target);
  e.preventDefault(); //prevent default action
  for (let section of allPageSections) {
    //loop through sections
    //find the one whose data-nav matches the event target innerText
    if (e.target.innerText == section.dataset.nav) {
      section.scrollIntoView({ behavior: "smooth" }); // Scroll to the section smoothly
    }
  }
});
