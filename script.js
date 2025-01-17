// Wait for the document to load before running the script
document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded!");

    // Add smooth scrolling for navigation links
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault(); // Prevent default link behavior
            const sectionId = link.getAttribute("href").substring(1); // Get section ID
            const section = document.getElementById(sectionId);

            // Scroll smoothly to the section
            section.scrollIntoView({ behavior: "smooth" });
        });
    });
});
