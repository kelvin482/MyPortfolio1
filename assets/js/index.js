/**
 * Home Page Logic
 * Handles feature card interactions and project preview
 */

document.addEventListener('DOMContentLoaded', () => {
  // Feature card interactions
  const features = document.querySelectorAll('.intro .features .feature');
  const featureClasses = ['feature-web', 'feature-ui', 'feature-network', 'feature-ai'];

  features.forEach((feature, index) => {
    if (index < featureClasses.length) {
      feature.classList.add(featureClasses[index]);
    }

    // Toggle visibility on hover
    feature.addEventListener('mouseenter', () => {
      feature.classList.add('active');
    });
    
    feature.addEventListener('mouseleave', () => {
      feature.classList.remove('active');
    });

    // Allow click toggle for mobile/touch users
    feature.addEventListener('click', () => {
      feature.classList.toggle('active');
    });
  });

  // Render featured projects on home page
  const projectGrid = document.getElementById('projectGrid');
  if (projectGrid && typeof renderProjects === 'function') {
    renderProjects('projectGrid', 'all', 3); // Show first 3 projects
  }
});
