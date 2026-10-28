
const app = document.getElementById("app");
const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();

const pages = {
    "/": {
        title: "Home",
        render: () => `
            <section class="hero">
                <p class="eyebrow">SINGLE PAGE APPLICATION</p>
                <h1>One application.<br><span>Endless possibilities.</span></h1>
                <p class="hero-text">
                    Explore a modern web experience with smooth navigation,
                    dynamic content, and no unnecessary page reloads.
                </p>
                <a href="/services" class="button" data-link>
                    Explore Services →
                </a>
            </section>

            <section class="features">
                <article class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h2>Fast Navigation</h2>
                    <p>Move between sections without reloading the page.</p>
                </article>
                <article class="feature-card">
                    <div class="feature-icon">🎨</div>
                    <h2>Clean Design</h2>
                    <p>Experience a modern and responsive interface.</p>
                </article>
                <article class="feature-card">
                    <div class="feature-icon">🔗</div>
                    <h2>Smart Routing</h2>
                    <p>Keep browser history and URLs in sync.</p>
                </article>
            </section>
        `
    },

    "/about": {
        title: "About Us",
        render: () => `
            <section class="page-content">
                <p class="eyebrow">WHO WE ARE</p>
                <h1>About FlowSpace</h1>
                <p class="intro">
                    FlowSpace is a demonstration project built to show
                    how a Single Page Application works using core
                    web technologies.
                </p>
                <div class="content-card">
                    <h2>Our Mission</h2>
                    <p>
                        Our goal is to create a smooth, accessible and
                        responsive browsing experience. We use HTML for
                        structure, CSS for presentation, and JavaScript
                        for dynamic navigation.
                    </p>
                </div>
            </section>
        `
    },

    "/services": {
        title: "Services",
        render: () => `
            <section class="page-content">
                <p class="eyebrow">WHAT WE OFFER</p>
                <h1>Our Services</h1>
                <p class="intro">
                    Explore the core features demonstrated by this
                    single page application.
                </p>
                <div class="content-grid">
                    <article class="content-card">
                        <h2>Web Development</h2>
                        <p>Build structured and responsive web interfaces.</p>
                    </article>
                    <article class="content-card">
                        <h2>UI Design</h2>
                        <p>Create clean layouts and engaging user experiences.</p>
                    </article>
                    <article class="content-card">
                        <h2>SPA Routing</h2>
                        <p>Navigate between views without full page reloads.</p>
                    </article>
                    <article class="content-card">
                        <h2>Responsive Design</h2>
                        <p>Adapt layouts to mobile, tablet and desktop screens.</p>
                    </article>
                </div>
            </section>
        `
    },

    "/contact": {
        title: "Contact",
        render: () => `
            <section class="page-content">
                <p class="eyebrow">GET IN TOUCH</p>
                <h1>Contact Us</h1>
                <p class="intro">
                    Send a sample message using the form below.
                    This demonstration does not send data to a server.
                </p>

                <form class="contact-form" id="contact-form">
                    <label for="name">
                        Your Name
                        <input id="name" name="name" type="text"
                            autocomplete="name" required>
                    </label>

                    <label for="email">
                        Email Address
                        <input id="email" name="email" type="email"
                            autocomplete="email" required>
                    </label>

                    <label for="message">
                        Message
                        <textarea id="message" name="message"
                            required></textarea>
                    </label>

                    <button class="button" type="submit">Submit Message</button>
                    <p class="form-message" id="form-message"
                        role="status" aria-live="polite"></p>
                </form>
            </section>
        `
    }
};

function normalizePath(path) {
    if (!path || path === "/") return "/";
    return path.replace(/\/+$/, "");
}

function renderPage(path, shouldFocus = true) {
    const currentPath = normalizePath(path);
    const page = pages[currentPath];

    if (!page) {
        document.title = "Page Not Found | FlowSpace";

        app.innerHTML = `
            <section class="page-content">
                <p class="eyebrow">ERROR 404</p>
                <h1>Page not found</h1>
                <p class="intro">
                    Sorry, the page you requested does not exist.
                </p>
                <a href="/" class="button" data-link>Return Home</a>
            </section>
        `;
    } else {
        document.title = `${page.title} | FlowSpace`;
        app.innerHTML = `
            <div class="page-content">
                ${page.render()}
            </div>
        `;
    }

    document.querySelectorAll(".navigation a[data-link]").forEach(link => {
        const linkPath = normalizePath(
            new URL(link.href, window.location.origin).pathname
        );

        const isActive = page && linkPath === currentPath;

        link.classList.toggle("active", Boolean(isActive));

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    if (shouldFocus) {
        app.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "auto" });
    }
}

// Intercept internal links while preserving normal browser behavior
document.addEventListener("click", event => {
    const link = event.target.closest("a[data-link]");

    if (!link) return;

    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank"
    ) {
        return;
    }

    const url = new URL(link.href, window.location.origin);

    if (url.origin !== window.location.origin) return;

    event.preventDefault();

    const nextPath = normalizePath(url.pathname);

    if (nextPath !== normalizePath(window.location.pathname)) {
        history.pushState({}, "", nextPath);
        renderPage(nextPath);
    }
});

// Handle browser Back and Forward buttons
window.addEventListener("popstate", () => {
    renderPage(window.location.pathname);
});

// Handle contact form submission without refreshing the page
app.addEventListener("submit", event => {
    if (event.target.id !== "contact-form") return;

    event.preventDefault();

    const form = event.target;

    if (!form.reportValidity()) return;

    const name = form.elements.name.value.trim();
    const message = document.getElementById("form-message");

    if (!name) {
        message.textContent = "Please enter your name.";
        return;
    }

    message.textContent =
        `Thank you, ${name}! Your sample message was processed locally.`;

    form.reset();
});

// Render the page matching the current URL on initial load
renderPage(window.location.pathname, false);
