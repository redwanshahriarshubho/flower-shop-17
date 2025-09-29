// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        // Update icon
        if (body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Cart functionality
    let cartCount = 0;
    let cartTotal = 0;
    const cartButtons = document.querySelectorAll('.add-to-cart');
    // Use ID selector instead of :has() pseudo-class
    const cartElement = document.getElementById('cart-button');

    // Product prices in Taka
    const productPrices = {
        'Classic Rose Bouquet': 5059,
        'Sunflower Delight': 4235,
        'Spring Tulips': 4703
    };

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.bg-white');
            const productName = card.querySelector('h3').textContent;
            const price = productPrices[productName];
            
            cartCount++;
            cartTotal += price;
            
            // Update cart count in the navigation
            cartElement.innerHTML = `<i class="fas fa-shopping-cart mr-2"></i>Cart (${cartCount})`;
            
            // Visual feedback
            button.textContent = 'Added!';
            button.classList.add('bg-green-700');
            
            // Show notification
            showNotification(`${productName} added to cart for ৳${price.toLocaleString()}`);
            
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.classList.remove('bg-green-700');
            }, 1500);
        });
    });

    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // Show success message
                const formContainer = contactForm.parentElement;
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
    }

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
});