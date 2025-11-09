document.addEventListener('DOMContentLoaded', () => {
  const features = document.querySelectorAll('.intro .features .feature');
  const classes = ['feature-web', 'feature-ui', 'feature-network', 'feature-ai'];

  features.forEach((feature, index) => {
    feature.classList.add(classes[index]); // Assign bg class

    // Toggle visibility on hover
    feature.addEventListener('mouseenter', () => feature.classList.add('active'));
    feature.addEventListener('mouseleave', () => feature.classList.remove('active'));

    // Allow click toggle for mobile/touch users
    feature.addEventListener('click', () => {
      feature.classList.toggle('active');
    });
  });
});
