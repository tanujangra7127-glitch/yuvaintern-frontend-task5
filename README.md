
# Week 5 Task: Single Page Application (SPA) Simulation

## Project Overview
FlowSpace is a responsive Single Page Application simulation built
using HTML, CSS, and JavaScript. It demonstrates client-side routing,
dynamic content rendering, and browser history management without
reloading the entire page during internal navigation.

## Features
- Home, About, Services, and Contact pages
- Client-side routing using the History API
- Dynamic content rendering with JavaScript
- Browser Back and Forward button support
- Responsive layout for mobile and desktop
- Animated transitions between views
- Contact form validation
- Custom 404 page for unknown routes
- Semantic HTML and accessibility features

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript
- History API and DOM manipulation

## Folder Structure
week-5-spa/
- index.html
- style.css
- script.js
- README.md
- technical-report.md

## How to Run
1. Download or clone the repository.
2. Open index.html in a browser.
3. Navigate through Home, About, Services, and Contact.
4. Test the browser Back and Forward buttons.

For deployment, configure the hosting service to serve index.html
for application routes such as /about and /services. Without this
fallback, direct requests to those paths may return a 404 error.

## Testing
- Verify that navigation updates the URL without a full page reload.
- Test browser Back and Forward buttons.
- Test all navigation links and the 404 page.
- Test form validation with missing and invalid input.
- Test the layout on mobile and desktop screen sizes.

## Limitations
The contact form is a front-end demonstration and does not transmit
or store submitted data. The project uses predefined page content
rather than loading content from a remote API.

## Author
Week 5 Web Development Task
