// DOM Elements
const categoryNav = document.getElementById('category-nav');
const allCategoriesGrid = document.getElementById('all-categories');
const electronicsCategoriesGrid = document.getElementById('electronics-categories');
const computersCategoriesGrid = document.getElementById('computers-categories');
const appliancesCategoriesGrid = document.getElementById('appliances-categories');
const tabsNav = document.querySelector('.tabs-nav');
const tabPanes = document.querySelectorAll('.tab-pane');
const uploadArea = document.getElementById('upload-area');
const fileUpload = document.getElementById('file-upload');

// Category Data
const categories = [
  { id: 1, name: 'Kitchen Appliances', slug: 'kitchen-appliances', icon: 'bi-cup-hot', description: 'Troubleshooting for kitchen appliances' },
  { id: 2, name: 'Electronics', slug: 'electronics', icon: 'bi-tv', description: 'Troubleshooting for electronic devices' },
  { id: 3, name: 'Cameras & Optics', slug: 'cameras-optics', icon: 'bi-camera', description: 'Troubleshooting for cameras and optics' },
  { id: 4, name: 'Computers', slug: 'computers', icon: 'bi-laptop', description: 'Troubleshooting for computers' },
  { id: 5, name: 'Mobile Devices', slug: 'mobile-devices', icon: 'bi-phone', description: 'Troubleshooting for mobile devices' },
  { id: 6, name: 'Home Appliances', slug: 'home-appliances', icon: 'bi-fan', description: 'Troubleshooting for home appliances' },
];

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Populate sidebar navigation
  populateCategoryNav();
  
  // Populate category grids
  populateCategoryGrids();
  
  // Setup tab navigation
  setupTabs();
  
  // Setup file upload
  setupFileUpload();
});

// Populate category navigation in sidebar
function populateCategoryNav() {
  // Clear loading skeletons
  categoryNav.innerHTML = '';
  
  // Add each category to the navigation
  categories.forEach(category => {
    const listItem = document.createElement('li');
    listItem.className = 'nav-item';
    
    // Check if this category is active based on URL
    const isActive = window.location.href.includes(`/category/${category.slug}`);
    if (isActive) {
      listItem.classList.add('active');
    }
    
    listItem.innerHTML = `
      <a href="category.html?slug=${category.slug}">
        <i class="${category.icon}"></i>
        <span>${category.name}</span>
      </a>
    `;
    
    categoryNav.appendChild(listItem);
  });
}

// Populate category grids in tabs
function populateCategoryGrids() {
  // Clear loading skeletons
  allCategoriesGrid.innerHTML = '';
  
  // Add all categories to main grid
  categories.forEach(category => {
    const categoryCard = createCategoryCard(category);
    allCategoriesGrid.appendChild(categoryCard);
  });
  
  // Electronics categories
  if (electronicsCategoriesGrid) {
    electronicsCategoriesGrid.innerHTML = '';
    const electronicsCategories = categories.filter(c => 
      c.slug === 'electronics' || c.slug === 'cameras-optics'
    );
    
    electronicsCategories.forEach(category => {
      const categoryCard = createCategoryCard(category);
      electronicsCategoriesGrid.appendChild(categoryCard);
    });
  }
  
  // Computers categories
  if (computersCategoriesGrid) {
    computersCategoriesGrid.innerHTML = '';
    const computersCategories = categories.filter(c => 
      c.slug === 'computers' || c.slug === 'mobile-devices'
    );
    
    computersCategories.forEach(category => {
      const categoryCard = createCategoryCard(category);
      computersCategoriesGrid.appendChild(categoryCard);
    });
  }
  
  // Appliances categories
  if (appliancesCategoriesGrid) {
    appliancesCategoriesGrid.innerHTML = '';
    const appliancesCategories = categories.filter(c => 
      c.slug === 'kitchen-appliances' || c.slug === 'home-appliances'
    );
    
    appliancesCategories.forEach(category => {
      const categoryCard = createCategoryCard(category);
      appliancesCategoriesGrid.appendChild(categoryCard);
    });
  }
}

// Create a category card element
function createCategoryCard(category) {
  const card = document.createElement('div');
  card.className = 'category-card';
  
  // Generate a random guide count (for demonstration)
  const guideCount = Math.floor(Math.random() * 20) + 1;
  
  card.innerHTML = `
    <div class="category-icon">
      <i class="${category.icon}"></i>
    </div>
    <h3 class="category-name">${category.name}</h3>
    <span class="category-badge">${guideCount} ${guideCount === 1 ? 'guide' : 'guides'}</span>
    <div class="arrow-icon">
      <i class="bi bi-arrow-right"></i>
    </div>
  `;
  
  // Add click event to navigate to category page
  card.addEventListener('click', () => {
    window.location.href = `category.html?slug=${category.slug}`;
  });
  
  return card;
}

// Setup tab navigation
function setupTabs() {
  if (!tabsNav) return;
  
  const tabLinks = tabsNav.querySelectorAll('a');
  
  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all tabs
      tabLinks.forEach(tab => {
        tab.parentElement.classList.remove('active');
      });
      
      // Add active class to clicked tab
      link.parentElement.classList.add('active');
      
      // Hide all tab panes
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
      });
      
      // Show the target tab pane
      const targetId = link.getAttribute('href').substring(1);
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// Setup file upload functionality
function setupFileUpload() {
  if (!uploadArea || !fileUpload) return;
  
  // Open file dialog when upload area is clicked
  uploadArea.addEventListener('click', () => {
    fileUpload.click();
  });
  
  // Handle file selection
  fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Display selected file (in a real app, you would upload the file to a server)
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadArea.innerHTML = `
        <img src="${e.target.result}" alt="Uploaded image" style="max-width: 100%; max-height: 200px; border-radius: 0.5rem;">
        <p style="margin-top: 1rem;">File: ${file.name}</p>
        <button class="btn btn-sm btn-outline" style="margin-top: 0.5rem;" id="reset-upload">
          <i class="bi bi-arrow-repeat"></i> Upload different image
        </button>
      `;
      
      // Add reset button functionality
      document.getElementById('reset-upload').addEventListener('click', (e) => {
        e.stopPropagation();
        resetUpload();
      });
    };
    
    reader.readAsDataURL(file);
  });
  
  // Add drag and drop support
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    
    const file = e.dataTransfer.files[0];
    if (!file) return;
    
    // Manually trigger change event
    fileUpload.files = e.dataTransfer.files;
    const event = new Event('change');
    fileUpload.dispatchEvent(event);
  });
}

// Reset upload area to initial state
function resetUpload() {
  fileUpload.value = '';
  uploadArea.innerHTML = `
    <i class="bi bi-cloud-arrow-up"></i>
    <p>Drag & drop your image here or <span>browse files</span></p>
  `;
}

// Get URL parameters helper function
function getURLParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Simulate an API fetch for categories (in a real app, this would be an actual API call)
function fetchCategories() {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 500);
  });
}

// Simulate an API fetch for guides by category (in a real app, this would be an actual API call)
function fetchGuidesByCategory(categoryId) {
  // Dummy guides data
  const guides = [
    {
      id: 1,
      title: 'How to Fix a Slow Laptop',
      slug: 'fix-slow-laptop',
      description: 'Learn how to speed up your slow laptop with these simple steps',
      difficulty: 'beginner',
      estimatedTime: '30 minutes',
      rating: 4.7,
      author: 'TechExpert'
    },
    {
      id: 2,
      title: 'Troubleshooting WiFi Connection Issues',
      slug: 'wifi-connection-issues',
      description: 'Solve common WiFi problems with this step-by-step guide',
      difficulty: 'intermediate',
      estimatedTime: '45 minutes',
      rating: 4.2,
      author: 'NetworkPro'
    }
  ];
  
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(guides);
    }, 500);
  });
}