 document.addEventListener("DOMContentLoaded", function () {
      const blogForm = document.getElementById("blogForm");
      const blogList = document.getElementById("blogList");
      const posts = [];

      blogForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const imageFile = document.getElementById("image").files[0];
        const videoFile = document.getElementById("video").files[0];

        if (!title || !content || !imageFile || !videoFile) {
          alert("Please fill in all the required fields.");
          return;
        }

        createBlogPost(title, content, imageFile, videoFile);
        blogForm.reset();
      });

      function createBlogPost(title, content, imageFile, videoFile) {
        const reader = new FileReader();

        reader.onload = function (event) {
          const imageSrc = event.target.result;

          const videoReader = new FileReader();
          videoReader.onload = function (event) {
            const videoSrc = event.target.result;

            const blogPost = {
              title: title,
              content: content,
              imageSrc: imageSrc,
              videoSrc: videoSrc,
            };

            posts.push(blogPost);
            displayBlogPosts();
          };
          videoReader.readAsDataURL(videoFile);
        };
        reader.readAsDataURL(imageFile);
      }

      function displayBlogPosts() {
        blogList.innerHTML = "";
        posts.forEach((post, index) => {
          const blogPost = document.createElement("div");
          blogPost.classList.add("blog-post");
          blogPost.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <img src="${post.imageSrc}" alt="${post.title}">
            <video controls>
              <source src="${post.videoSrc}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
          `;
          blogList.appendChild(blogPost);
        });

        // Add event listeners for edit and delete buttons
        const editButtons = document.querySelectorAll(".edit-btn");
        const deleteButtons = document.querySelectorAll(".delete-btn");

        editButtons.forEach((button) => {
          button.addEventListener("click", handleEditButtonClick);
        });

        deleteButtons.forEach((button) => {
          button.addEventListener("click", handleDeleteButtonClick);
        });
      }

      function handleEditButtonClick(event) {
        const index = event.target.dataset.index;
        const post = posts[index];
        // You can implement an edit modal or form to update the post
        // For simplicity, we'll just use prompt for editing the title and content.
        const newTitle = prompt("Enter the new title:", post.title);
        const newContent = prompt("Enter the new content:", post.content);
        if (newTitle && newContent) {
          posts[index].title = newTitle;
          posts[index].content = newContent;
          displayBlogPosts(); // Refresh the posts display
        }
      }

      function handleDeleteButtonClick(event) {
        const index = event.target.dataset.index;
        posts.splice(index, 1);
        displayBlogPosts(); // Refresh the posts display
      }

      // Initial display of blog posts
      displayBlogPosts();
    });
  
  