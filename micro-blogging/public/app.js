const postsContainer = document.getElementById("postsContainer");
const submitPostButton = document.getElementById("submitPost");

let posts = [];

// Function to render posts
function renderPosts() {
    postsContainer.innerHTML = "";
    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        
        postElement.innerHTML = `
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
                ${post.comments.map(comment => `<p>${comment}</p>`).join("")}
            </div>
        `;
        
        postsContainer.appendChild(postElement);
    });
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
    renderPosts();
}

// Event listener for submitting a post
submitPostButton.addEventListener("click", () => {
    const content = document.getElementById("postContent").value;
    const imageInput = document.getElementById("postImage");
    const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null;

    if (content) {
        posts.push({
            content: content,
            image: image,
            reactions: {
                heart: 0,
                laugh: 0,
                sad: 0,
                angry: 0,
                thumbsUp: 0,
                thumbsDown: 0
            },
            comments: []
        });
        
        document.getElementById("postContent").value = "";
        imageInput.value = "";
        renderPosts();
    }
});
