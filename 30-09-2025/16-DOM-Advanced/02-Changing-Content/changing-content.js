// 📝 CHANGING CONTENT - Learn how to modify HTML elements with JavaScript

console.log("=== CHANGING CONTENT DEMO ===");

// Get elements we'll work with
const log = document.getElementById("log");

// Function to log actions
function logAction(message) {
    const time = new Date().toLocaleTimeString();
    log.innerHTML = `<p class="text-success mb-1">[${time}] ${message}</p>` + log.innerHTML;
    console.log(message);
}

// 1. Change text content
document.getElementById("change-text").addEventListener("click", function() {
    const title = document.getElementById("demo-title");
    const text = document.getElementById("demo-text");
    
    // Change text content (safe way - no HTML)
    title.textContent = "✨ New Title Changed by JavaScript!";
    text.textContent = "This text was completely replaced using JavaScript's textContent property.";
    
    // Add visual feedback
    title.parentElement.classList.add("changed");
    
    logAction("Changed text content using textContent property");
});

// 2. Change HTML content
document.getElementById("change-html").addEventListener("click", function() {
    const htmlDiv = document.getElementById("html-content");
    
    // Change HTML content (can include HTML tags)
    htmlDiv.innerHTML = `
        <h5 class="text-success">🎉 New HTML Content!</h5>
        <p><strong>Bold text</strong> and <em>italic text</em></p>
        <ul>
            <li>HTML can include lists</li>
            <li>And other elements</li>
        </ul>
    `;
    
    // Add visual feedback
    htmlDiv.parentElement.classList.add("changed");
    
    logAction("Changed HTML content using innerHTML property");
});

// 3. Change styles
document.getElementById("change-style").addEventListener("click", function() {
    const styleBox = document.getElementById("style-demo");
    
    // Change multiple style properties
    styleBox.style.backgroundColor = "#007bff";
    styleBox.style.color = "white";
    styleBox.style.fontSize = "20px";
    styleBox.style.borderRadius = "15px";
    styleBox.style.transform = "scale(1.1)";
    styleBox.style.textContent = "🎨 Styles Changed!";
    
    // Change text too
    styleBox.textContent = "🎨 Styles Changed!";
    
    // Add visual feedback to parent
    styleBox.parentElement.classList.add("changed");
    
    logAction("Changed styles: background, color, font-size, border-radius, transform");
});

// 4. Change multiple elements at once
document.getElementById("change-multiple").addEventListener("click", function() {
    const spans = document.querySelectorAll(".demo-span");
    const colors = ["primary", "success", "danger"];
    
    spans.forEach((span, index) => {
        span.textContent = `Updated ${index + 1}`;
        span.className = `demo-span badge bg-${colors[index]} m-1`;
    });
    
    // Add visual feedback to parent
    spans[0].parentElement.classList.add("changed");
    
    logAction(`Changed ${spans.length} elements at once using forEach`);
});

// 5. Add new content
document.getElementById("add-content").addEventListener("click", function() {
    const htmlDiv = document.getElementById("html-content");
    
    // Create new element
    const newElement = document.createElement("div");
    newElement.className = "alert alert-info mt-2";
    newElement.innerHTML = `
        <strong>📦 New Element Created!</strong><br>
        This element was created with JavaScript and added to the page.
        <small class="d-block mt-1">Created at: ${new Date().toLocaleString()}</small>
    `;
    
    // Add it to the page
    htmlDiv.appendChild(newElement);
    
    // Add visual feedback
    htmlDiv.parentElement.classList.add("changed");
    
    logAction("Created and added new element using createElement and appendChild");
});

// 6. Reset everything
document.getElementById("reset-content").addEventListener("click", function() {
    // Reset title and text
    document.getElementById("demo-title").textContent = "Original Title";
    document.getElementById("demo-text").textContent = "This is the original text content.";
    
    // Reset HTML content
    document.getElementById("html-content").innerHTML = "<p>Original HTML content</p>";
    
    // Reset styles
    const styleBox = document.getElementById("style-demo");
    styleBox.style.backgroundColor = "";
    styleBox.style.color = "";
    styleBox.style.fontSize = "";
    styleBox.style.borderRadius = "";
    styleBox.style.transform = "";
    styleBox.textContent = "Style Demo Box";
    
    // Reset spans
    const spans = document.querySelectorAll(".demo-span");
    spans.forEach((span, index) => {
        span.textContent = `Span ${index + 1}`;
        span.className = "demo-span badge bg-secondary m-1";
    });
    
    // Remove all visual feedback
    const changedElements = document.querySelectorAll(".changed");
    changedElements.forEach(el => el.classList.remove("changed"));
    
    // Clear log
    log.innerHTML = '<p class="text-muted">Actions will be logged here...</p>';
    
    logAction("🔄 Everything reset to original state!");
});

// Initial message
logAction("🚀 Ready! Click buttons to see content changes in action!");