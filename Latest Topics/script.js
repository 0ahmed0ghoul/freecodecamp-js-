const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Back-End Development', className: 'backend' }
};

function timeAgo(timestamp) {
  const past = new Date(timestamp);
  const now = new Date();
  const diffInMs = now - past; 
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return `${diffInDays}d ago`;
  }
}

function viewCount(num) {
  if (num >= 1000) {
    return Math.floor(num / 1000) + "k";
  } else {
    return num;
  }
}

function forumCategory(id) {
  let categoryText = "General";
  let className = "general";

  if (allCategories.hasOwnProperty(id)) {
    categoryText = allCategories[id].category;
    className = allCategories[id].className;
  }

  // Single-line template literal with no extra spaces
  return `<a class="category ${className}" href="${forumCategoryUrl}${className}/${id}">${categoryText}</a>`;
}

function avatars(posters, users) {
  return posters
    .map(poster => {
      // Find the full user object by user_id
      const user = users.find(u => u.id === poster.user_id);
      if (!user) return ""; // skip if user not found

      // Replace {size} with 30 in avatar_template
      let src = user.avatar_template.replace("{size}", "30");

      // If relative path, prepend avatarUrl
      if (!src.startsWith("http")) {
        src = `${avatarUrl}${src}`;
      }

      // Return img element string
      return `<img src="${src}" alt="${user.name}" />`;
    })
    .join("");
}

const postsContainer= document.getElementById('posts-container')

function showLatestPosts(obj) {
  const { users, topic_list } = obj;
  const { topics } = topic_list;

  postsContainer.innerHTML = topics
    .map(topic => {
      const { id, title, views, posts_count, slug, posters, category_id, bumped_at } = topic;

      return `<tr>
<td><a class="post-title" href="${forumTopicUrl}${slug}/${id}">${title}</a>${forumCategory(category_id)}</td>
<td><div class="avatar-container">${avatars(posters, users)}</div></td>
<td>${posts_count - 1}</td>
<td>${viewCount(views)}</td>
<td>${timeAgo(bumped_at)}</td>
</tr>`;
    })
    .join("");
}

async function fetchData() {
  try {
    const response = await fetch(forumLatest);
    const data = await response.json();   
    showLatestPosts(data);
  } catch (error) {
    console.log(error);
  }
}