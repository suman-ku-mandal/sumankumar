// script.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // --- Theme Persistence ---
    // 1. Check for a saved theme in localStorage on page load.
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.classList.add(savedTheme);
    } else {
        // Optional: Check for user's OS preference if no theme is saved
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            htmlElement.classList.add('dark-mode');
        }
    }

    // --- Theme Toggle Logic ---
    // 2. Add click event listener to the toggle button.
    themeToggle.addEventListener('click', () => {
        // Toggle the 'dark-mode' class on the <html> element.
        if (htmlElement.classList.contains('dark-mode')) {
            htmlElement.classList.remove('dark-mode');
            // Save the preference to localStorage.
            localStorage.setItem('theme', 'light-mode'); // Or just remove the item
        } else {
            htmlElement.classList.add('dark-mode');
            // Save the preference to localStorage.
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // --- Smooth Page Transitions with View Transitions API ---
    // This part is mostly handled by CSS, but JS can be used for more complex scenarios.
    // For this project, we are relying on the browser's native handling via the meta tag
    // and CSS, so no extra JS is needed for the basic cross-fade and morph effects.
    // This confirms that we are using a modern, efficient approach.
});
