// Correct: Fetch the template's content for cloning
const userCardTemplate = document.querySelector("[data-user-template]").content; // Issue: Missing `.content` in previous code
// Container to append user cards
const userCardContainer = document.querySelector("[data-user-cards-container]");
// Input for user search
const searchInput = document.querySelector("[data-search]");

// Array to hold user data along with the associated DOM elements
let users = [];

// Listen for input events on the search field
searchInput.addEventListener("input", e => {
  // Convert input to lowercase for case-insensitive search
  const value = e.target.value.toLowerCase();

  // Loop through each user and toggle visibility
  users.forEach(user => {
    // Determine if user should be visible based on search query
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);

    // Toggle the 'hide' class based on visibility
    user.element.classList.toggle("hide", !isVisible);
  });
});

// Fetch user data from API
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => {
    // Populate the users array with fetched data and associate DOM elements
    users = data.map(user => {
      // Correct: Clone the template for creating a new user card
      const card = userCardTemplate.cloneNode(true).children[0]; // Issue: Used `textContent` in previous code

      // Find elements within the card for header and body
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");

      // Populate the header and body
      header.textContent = user.name;
      body.textContent = user.email;

      // Append the card to the container
      userCardContainer.append(card); // Issue: Appended to the wrong container in previous code

      // Return the user data along with the associated DOM element for future reference
      return { name: user.name, email: user.email, element: card };
    });
  });
