// Cart functionality
let cartCount = 0;
const cartButtons = document.querySelectorAll('.add-to-cart');
const cartElement = document.querySelector('button:has(.fa-shopping-cart)');

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartElement.innerHTML = `<i class="fas fa-shopping-cart mr-2"></i>Cart (${cartCount})`;
        
        // Visual feedback
        button.textContent = 'Added!';
        button.classList.add('bg-green-700');
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.classList.remove('bg-green-700');
        }, 1500);
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        // Show success message
        const formContainer = document.getElementById('contactForm').parentElement;
        formContainer.innerHTML = `
            <div class="text-center py-8">
                <div class="text-green-500 text-5xl mb-4">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Thank You, ${name}!</h3>
                <p class="text-gray-600">We've received your message and will contact you soon at ${email}.</p>
            </div>
        `;
    }
});

// Add fade-in animation to sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});