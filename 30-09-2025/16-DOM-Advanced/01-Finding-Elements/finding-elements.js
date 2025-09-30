// 🔍 FINDING ELEMENTS - Learn how to find HTML elements with JavaScript

console.log("=== FINDING ELEMENTS DEMO ===");

// Get the output area to show results
const output = document.getElementById("output");

// Function to show results
function showResult(message) {
    output.innerHTML += `<p class="text-success">✅ ${message}</p>`;
    console.log(message);
}

// Function to clear results
function clearResults() {
    output.innerHTML = "";
    // Remove all highlighting
    const highlighted = document.querySelectorAll(".found-element");
    highlighted.forEach(el => el.classList.remove("found-element"));
}

// 1. Find element by ID
document.getElementById("find-by-id").addEventListener("click", function() {
    clearResults();
    
    // Find the element with ID "special-paragraph"
    const paragraph = document.getElementById("special-paragraph");
    
    if (paragraph) {
        // Highlight the found element
        paragraph.classList.add("found-element");
        
        showResult(`Found element by ID: "${paragraph.id}"`);
        showResult(`Text content: "${paragraph.textContent}"`);
        showResult(`Tag name: ${paragraph.tagName}`);
    }
});

// 2. Find elements by class name
document.getElementById("find-by-class").addEventListener("click", function() {
    clearResults();
    
    // Find all elements with class "my-class"
    const elements = document.getElementsByClassName("my-class");
    
    showResult(`Found ${elements.length} elements with class "my-class"`);
    
    // Loop through and highlight each one
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("found-element");
        showResult(`Element ${i + 1}: ${elements[i].textContent}`);
    }
});

// 3. Find elements by tag name
document.getElementById("find-by-tag").addEventListener("click", function() {
    clearResults();
    
    // Find all <li> elements
    const listItems = document.getElementsByTagName("li");
    
    showResult(`Found ${listItems.length} <li> elements`);
    
    // Highlight each list item
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].classList.add("found-element");
        showResult(`List item ${i + 1}: ${listItems[i].textContent}`);
    }
});

// 4. Find with querySelector (modern way)
document.getElementById("find-with-query").addEventListener("click", function() {
    clearResults();
    
    // Find first element with class "my-class"
    const firstButton = document.querySelector(".my-class");
    if (firstButton) {
        firstButton.classList.add("found-element");
        showResult(`First .my-class element: ${firstButton.textContent}`);
    }
    
    // Find all paragraphs
    const allParagraphs = document.querySelectorAll("p");
    showResult(`Found ${allParagraphs.length} paragraphs total`);
    
    // Find element by ID using querySelector
    const titleById = document.querySelector("#main-title");
    if (titleById) {
        titleById.classList.add("found-element");
        showResult(`Title found by querySelector: ${titleById.textContent}`);
    }
});

// 5. Reset everything
document.getElementById("reset-all").addEventListener("click", function() {
    clearResults();
    showResult("All highlights cleared! ✨");
});

// Show initial message
showResult("Click the buttons above to see how to find HTML elements! 🎯");