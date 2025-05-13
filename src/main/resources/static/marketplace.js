// Example course data
const courses = [
  {
    title: "UI/UX Design Principles",
    instructor: "Lisa Wang",
    rating: 4.9,
    reviews: 64,
    price: "Free",
    skill: "Beginner",
    category: "Design",
    date: "725 days ago",
    tags: ["UI/UX", "Design", "User Experience"],
    description: "Learn the fundamental principles of UI/UX design and create user-centered digital experiences that delight."
  },
  {
    title: "Public Speaking: Confidence and Clarity",
    instructor: "David Brown",
    rating: 4.5,
    reviews: 178,
    price: "$39.99",
    skill: "All Levels",
    category: "Personal Development",
    date: "728 days ago",
    tags: ["Public Speaking", "Communication", "Confidence"],
    description: "Overcome fear and develop confidence in public speaking. Learn techniques for clear, impactful presentations."
  },
  {
    title: "Introduction to Data Science with Python",
    instructor: "Emma Wilson",
    rating: 4.6,
    reviews: 92,
    price: "$69.99",
    skill: "Beginner",
    category: "Data Science",
    date: "730 days ago",
    tags: ["Python", "Data Science", "Analytics"],
    description: "Start your journey into data science with Python. Learn data analysis, visualization, and basic machine learning."
  },
  {
    title: "Digital Photography Masterclass",
    instructor: "Michael Chen",
    rating: 4.7,
    reviews: 156,
    price: "$59.99",
    skill: "Intermediate",
    category: "Photography",
    date: "732 days ago",
    tags: ["Photography", "Digital", "Creative"],
    description: "Master the art of digital photography with professional techniques for composition, lighting, and editing."
  },
  {
    title: "Advanced React Patterns",
    instructor: "Sarah Miller",
    rating: 4.9,
    reviews: 87,
    price: "$79.99",
    skill: "Advanced",
    category: "Programming",
    date: "735 days ago",
    tags: ["React", "JavaScript", "Frontend"],
    description: "Take your React skills to the next level with advanced patterns and best practices for building scalable apps."
  },
  {
    title: "JavaScript Fundamentals for Beginners",
    instructor: "Alex Johnson",
    rating: 4.8,
    reviews: 124,
    price: "$49.99",
    skill: "Beginner",
    category: "Programming",
    date: "739 days ago",
    tags: ["JavaScript", "Web Development", "Coding"],
    description: "Learn the core concepts of JavaScript programming in this beginner-friendly course. Perfect for those new to coding."
  }
];

function renderCourses(courseList) {
  const grid = document.getElementById('course-grid');
  grid.innerHTML = '';
  courseList.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div class="tags">
        <span class="tag">${course.category}</span>
        <span class="tag">${course.skill}</span>
        <span class="tag">${course.date}</span>
      </div>
      <div class="title">${course.title}</div>
      <div class="instructor">by ${course.instructor}</div>
      <div class="rating">⭐ ${course.rating} (${course.reviews} reviews)</div>
      <div class="price">${course.price}</div>
      <div class="tags">
        ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="description">${course.description}</div>
      <div class="actions">
        <button onclick="viewCourse('${course.title}')">View Course</button>
        <button onclick="shareCourse('${course.title}')">Share</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function viewCourse(title) {
  alert('Viewing details for: ' + title);
  // Implement navigation to course detail page
}

function shareCourse(title) {
  alert('Share link for: ' + title);
  // Implement share functionality
}

document.getElementById('create-listing-btn').onclick = function() {
  alert('Redirect to create new listing page');
  // Implement navigation to create listing page
};

renderCourses(courses); 