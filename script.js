       // Données des produits
        const products = [
            {
                id: 1,
                name: "Smartphone Android Premium",
                price: 299,
                category: "electronics",
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: true,
                new: false
            },
            {
                id: 2,
                name: "Guitare Acoustique Professionnelle",
                price: 199,
                category: "music",
                image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: true,
                new: true
            },
            {
                id: 3,
                name: "Ordinateur Portable Gaming",
                price: 899,
                category: "electronics",
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: false,
                new: true
            },
            {
                id: 4,
                name: "Tracteur Mini Agricole",
                price: 2500,
                category: "agriculture",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: false,
                new: false
            },
            {
                id: 5,
                name: "Clavier Mécanique RGB",
                price: 49,
                category: "office",
                image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: true,
                new: false
            },
            {
                id: 6,
                name: "Souris Ergonomique Sans Fil",
                price: 35,
                category: "office",
                image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: false,
                new: true
            },
            {
                id: 7,
                name: "Batterie Électronique Complète",
                price: 450,
                category: "music",
                image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: false,
                new: false
            },
            {
                id: 8,
                name: "Tablette Graphique Pro",
                price: 129,
                category: "electronics",
                image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: true,
                new: true
            },
            {
                id: 9,
                name: "Tondeuse à Gazon Robot",
                price: 350,
                category: "agriculture",
                image: "https://images.unsplash.com/photo-1596638787647-904d822d751e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: false,
                new: false
            },
            {
                id: 10,
                name: "Chaise de Bureau Ergonomique",
                price: 120,
                category: "office",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: true,
                new: false
            },
            {
                id: 11,
                name: "Piano Numérique 88 Touches",
                price: 599,
                category: "music",
                image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: false,
                new: true
            },
            {
                id: 12,
                name: "Drone Professionnel 4K",
                price: 799,
                category: "electronics",
                image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                popular: true,
                new: true
            }
        ];

        // Panier
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Éléments DOM
        const productsGrid = document.getElementById('products-grid');
        const cartIcon = document.getElementById('cart-icon');
        const cartModal = document.getElementById('cart-modal');
        const closeCart = document.getElementById('close-cart');
        const overlay = document.getElementById('overlay');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.querySelector('.cart-count');
        const categoryItems = document.querySelectorAll('.category-item');
        const sortSelect = document.getElementById('sort-select');
        const checkoutBtn = document.getElementById('checkout-btn');
        const whatsappBtn = document.getElementById('whatsapp-btn');

        // Afficher les produits
        function displayProducts(productsToShow = products) {
            productsGrid.innerHTML = '';
            
            productsToShow.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">${product.price}€</p>
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i> Ajouter au Panier
                        </button>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
            
            // Ajouter les écouteurs d'événements pour les boutons "Ajouter au Panier"
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    addToCart(productId);
                });
            });
        }

        // Ajouter au panier
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            updateCart();
            showNotification(`${product.name} ajouté au panier!`);
        }

        // Mettre à jour le panier
        function updateCart() {
            // Sauvegarder dans le localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Mettre à jour le compteur
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Mettre à jour l'affichage du panier
            displayCartItems();
        }

        // Afficher les articles du panier
        function displayCartItems() {
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--gris-fonce);">Votre panier est vide</p>';
                cartTotal.textContent = '0€';
                return;
            }
            
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">${item.price}€</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            cartTotal.textContent = `${total}€`;
            
            // Ajouter les écouteurs d'événements pour les boutons de quantité
            document.querySelectorAll('.quantity-btn.minus').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    updateQuantity(productId, -1);
                });
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    updateQuantity(productId, 1);
                });
            });
            
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    const newQuantity = parseInt(this.value);
                    
                    if (newQuantity < 1) {
                        this.value = 1;
                        updateQuantity(productId, 0, 1);
                    } else {
                        updateQuantity(productId, 0, newQuantity);
                    }
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    removeFromCart(productId);
                });
            });
        }

        // Mettre à jour la quantité
        function updateQuantity(productId, change, newQuantity = null) {
            const item = cart.find(item => item.id === productId);
            
            if (newQuantity !== null) {
                item.quantity = newQuantity;
            } else {
                item.quantity += change;
                
                if (item.quantity < 1) {
                    item.quantity = 1;
                }
            }
            
            updateCart();
        }

        // Supprimer du panier
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

        // Afficher une notification
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--or-gradient);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: var(--shadow-hover);
                z-index: 1200;
                font-weight: bold;
                transition: transform 0.3s, opacity 0.3s;
                transform: translateX(100%);
                opacity: 0;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            // Animation d'entrée
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
                notification.style.opacity = '1';
            }, 100);
            
            // Animation de sortie après 3 secondes
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Trier les produits
        function sortProducts(sortBy) {
            let sortedProducts = [...products];
            
            switch(sortBy) {
                case 'price-asc':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    // Par défaut, afficher les produits populaires d'abord
                    sortedProducts.sort((a, b) => {
                        if (a.popular && !b.popular) return -1;
                        if (!a.popular && b.popular) return 1;
                        return 0;
                    });
                    break;
            }
            
            displayProducts(sortedProducts);
        }

        // Filtrer les produits par catégorie
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Mettre à jour l'élément actif
                categoryItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrer les produits
                let filteredProducts;
                if (category === 'all') {
                    filteredProducts = products;
                } else {
                    filteredProducts = products.filter(product => product.category === category);
                }
                
                displayProducts(filteredProducts);
            });
        });

        // Événement de tri
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });

        // Ouvrir/fermer le panier
        cartIcon.addEventListener('click', function() {
            cartModal.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        overlay.addEventListener('click', function() {
            cartModal.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Commander via WhatsApp
        whatsappBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Votre panier est vide!');
                return;
            }
            
            let message = "Bonjour, je souhaite commander les articles suivants:\n\n";
            
            cart.forEach(item => {
                message += `- ${item.name} (x${item.quantity}) : ${item.price * item.quantity}€\n`;
            });
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            message += `\nTotal: ${total}€`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/33123456789?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });

        // Commander maintenant (simulation)
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Votre panier est vide!');
                return;
            }
            
            showNotification('Fonctionnalité de commande à implémenter avec Google Sheets');
            // Ici, vous pouvez ajouter le code pour intégrer avec Google Sheets
        });

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            // Afficher les produits populaires par défaut
            const popularProducts = products.filter(product => product.popular);
            displayProducts(popularProducts);
            updateCart();
            
            // Animation au scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    }
                });
            }, observerOptions);
            
            // Observer les cartes de produits
            document.querySelectorAll('.product-card').forEach(card => {
                observer.observe(card);
            });
        });