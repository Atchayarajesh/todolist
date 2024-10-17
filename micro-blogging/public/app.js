const postsContainer = document.getElementById("postsContainer");
const submitPostButton = document.getElementById("submitPost");
const charCountDisplay = document.getElementById("charCount");
const postContentInput = document.getElementById("postContent");

let posts = [];
let isDarkMode = false;

// Update character count display
postContentInput.addEventListener("input", () => {
    const remainingChars = 200 - postContentInput.value.length;
    charCountDisplay.textContent = `${remainingChars} characters remaining`;
});

// Function to render posts
function renderPosts() {
    postsContainer.innerHTML = "";
    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        
        postElement.innerHTML = `
            <strong>${post.username}</strong> <span class="timestamp">${post.timestamp}</span>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image" />` : ""}
            <div class="reactions">
                <button onclick="reactToPost(${index}, '❤️')">❤️ ${post.reactions.heart}</button>
                <button onclick="reactToPost(${index}, '😂')">😂 ${post.reactions.laugh}</button>
                <button onclick="reactToPost(${index}, '😢')">😢 ${post.reactions.sad}</button>
                <button onclick="reactToPost(${index}, '😡')">😡 ${post.reactions.angry}</button>
                <button onclick="reactToPost(${index}, '👍')">👍 ${post.reactions.thumbsUp}</button>
                <button onclick="reactToPost(${index}, '👎')">👎 ${post.reactions.thumbsDown}</button>
            </div>
            <button onclick="toggleCommentForm(${index})">Comment (${post.comments.length})</button>
            <div class="comment-form" id="comment-form-${index}" style="display:none;">
                <input type="text" id="comment-${index}" placeholder="Add a comment" />
                <button onclick="addComment(${index})">Submit</button>
            </div>
            <div class="comments">
                ${post.comments.map(comment => `<p class="comment">${comment}</p>`).join("")}
            </div>
            <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
        `;
        
        postsContainer.appendChild(postElement);
    });
}

// Function to delete a post
function deletePost(index) {
    posts.splice(index, 1); // Remove the post from the array
    updateLocalStorage(); // Update local storage after deletion
    renderPosts(); // Re-render the posts
}

// Function to toggle comment form visibility
function toggleCommentForm(index) {
    const form = document.getElementById(`comment-form-${index}`);
    form.style.display = form.style.display === "none" ? "block" : "none";
}

// Function to add comment to post
function addComment(index) {
    const commentInput = document.getElementById(`comment-${index}`);
    if (commentInput.value) {
        posts[index].comments.push(commentInput.value);
        commentInput.value = "";
        updateLocalStorage(); // Update local storage after adding a comment
        renderPosts();
    }
}

// Function to react to a post
function reactToPost(index, reaction) {
    const reactions = posts[index].reactions;

    switch (reaction) {
        case '❤️':
            reactions.heart++;
            break;
        case '😂':
            reactions.laugh++;
            break;
        case '😢':
            reactions.sad++;
            break;
        case '😡':
            reactions.angry++;
            break;
        case '👍':
            reactions.thumbsUp++;
            break;
        case '👎':
            reactions.thumbsDown++;
            break;
        default:
            break;
    }

    updateLocalStorage(); // Update local storage after reacting
    renderPosts();
}

// Function to submit a post
submitPostButton.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const content = postContentInput.value;
    const imageInput = document.getElementById("postImage");
    const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null;
    
    const timestamp = new Date().toLocaleString();
    const newPost = {
        username,
        content,
        image,
        timestamp,
        reactions: {
            heart: 0,
            laugh: 0,
            sad: 0,
            angry: 0,
            thumbsUp: 0,
            thumbsDown: 0
        },
        comments: []
    };
    
    posts.push(newPost);
    postContentInput.value = "";
    imageInput.value = "";
    charCountDisplay.textContent = "200 characters remaining"; // Reset character count display
    updateLocalStorage(); // Store the new post in local storage
    renderPosts();
});

// Function to toggle dark mode
document.getElementById("toggleTheme").addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
});

// Save posts to local storage
function updateLocalStorage() {
    localStorage.setItem('microblogPosts', JSON.stringify(posts));
}

// Load posts from local storage when the page loads
window.addEventListener("load", () => {
    const storedPosts = localStorage.getItem('microblogPosts');
    if (storedPosts) {
        posts = JSON.parse(storedPosts);
        renderPosts();
    }
});



    
 
