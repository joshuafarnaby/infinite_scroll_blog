const blogContainer = document.getElementById('blog-container');
// const blogPosts = document.querySelectorAll('.blog-post');

const filterInput = document.getElementById('filter-input');

const loaderIcon = document.getElementById('loading');

let limit = 5;
let page = 1;

displayPosts();

async function fetchPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await response.json();

  return data;
}

async function displayPosts() {
  const posts = await fetchPosts();
  posts.forEach((post) => {
    const newPost = document.createElement('div');
    newPost.classList.add('blog-post');
    newPost.innerHTML = `
    <div class="post-number">${post.id}</div>
    <div class="info">
      <h3 class="blog-title">${post.title}</h3>
      <p class="blog-body">${post.body}</p>
    </div>
    `;

    blogContainer.appendChild(newPost);
  });
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.blog-post');

  posts.forEach((post) => {
    const title = post.querySelector('.blog-title').innerText.toUpperCase();
    const body = post.querySelector('.blog-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

function toggleLoader() {
  loaderIcon.classList.add('show');
  setTimeout(() => {
    loaderIcon.classList.remove('show');
  }, 500);
}

window.addEventListener('scroll', () => {
  if (innerHeight + pageYOffset >= document.body.offsetHeight - 2) {
    toggleLoader();
    page++;
    setTimeout(() => {
      displayPosts();
    }, 500);
  }
});

filterInput.addEventListener('input', filterPosts);
