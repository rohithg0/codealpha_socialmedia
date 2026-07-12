const userId = localStorage.getItem("userId");

if (!userId) {
    alert("Please login first");
    window.location.href = "index.html";
}

const API = "https://codealpha-tasks-apqo.onrender.com";

async function createPost() {

    const content = document.getElementById("postContent").value;
    const image = document.getElementById("postImage").files[0];

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("content", content);

    if (image) {
        formData.append("image", image);
    }

    await fetch(`${API}/post`, {
        method: "POST",
        body: formData
    });

    document.getElementById("postContent").value = "";
    document.getElementById("postImage").value = "";

    loadPosts();
}

async function likePost(postId) {

    await fetch(`${API}/like/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId
        })
    });

    loadPosts();
}

async function addComment(postId) {

    const text = document.getElementById(`comment-${postId}`).value;

    await fetch(`${API}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            postId,
            userId,
            text
        })
    });

    loadPosts();
}

async function loadPosts() {

    const res = await fetch(`${API}/posts`);
    const posts = await res.json();

    let html = "";

    posts.forEach(post => {

        html += `
        <div class="post">

            <div class="username">
                👤 ${post.userId.username}
            </div>

            <div class="content">
                ${post.content}
            </div>

           ${post.image ? `
<div class="post-image">
    <img src="${post.image}">
</div>
` : ""}

            <div class="likes">
                ❤️ ${post.likes.length} Likes
            </div>

            <button class="like-btn"
                onclick="likePost('${post._id}')">
                Like
            </button>

            <div class="comment-section">

                <input
                    type="text"
                    id="comment-${post._id}"
                    placeholder="Write a comment..."
                >

                <button onclick="addComment('${post._id}')">
                    Comment
                </button>

            </div>

        </div>
        `;
    });

    document.getElementById("posts").innerHTML = html;
}

function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    window.location.href = "index.html";
}

loadPosts();