document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =========================================
       CART
    ========================================= */

    let cart = [];

    const cartPanel = document.getElementById("cart");
    const cartOverlay = document.getElementById("cartOverlay");

    const cartBtn = document.getElementById("cartBtn");
    const closeCart = document.getElementById("closeCart");

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    const checkoutBtn = document.getElementById("checkoutBtn");


    function openCart() {

        cartPanel.classList.add("active");
        cartOverlay.classList.add("active");

    }


    function closeCartMenu() {

        cartPanel.classList.remove("active");
        cartOverlay.classList.remove("active");

    }


    if (cartBtn) {
        cartBtn.addEventListener("click", openCart);
    }

    if (closeCart) {
        closeCart.addEventListener("click", closeCartMenu);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeCartMenu);
    }


    /* =========================================
       ADD TO CART
    ========================================= */

    document.querySelectorAll(".add-cart").forEach(button => {

        button.addEventListener("click", function () {

            const productCard =
                this.closest(".product-card");

            const name =
                productCard.dataset.name;

            const price =
                Number(productCard.dataset.price);


            const existing =
                cart.find(item => item.name === name);


            if (existing) {

                existing.quantity++;

            } else {

                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });

            }


            renderCart();

            showToast(name + " added to cart");

            openCart();

        });

    });


    /* =========================================
       RENDER CART
    ========================================= */

    function renderCart() {

        if (!cartItems) return;


        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <p>Your cart is empty.</p>
                </div>
            `;

        } else {

            cartItems.innerHTML = "";

            cart.forEach((item, index) => {

                const div =
                    document.createElement("div");

                div.className = "cart-item";

                div.innerHTML = `

                    <div class="cart-item-info">

                        <h4>${item.name}</h4>

                        <p>
                            ₦${item.price.toLocaleString()}
                        </p>

                    </div>


                    <div class="cart-quantity">

                        <button
                            data-index="${index}"
                            class="minus">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            data-index="${index}"
                            class="plus">
                            +
                        </button>

                    </div>


                    <button
                        class="remove-item"
                        data-index="${index}">

                        <i class="fa-solid fa-trash"></i>

                    </button>
                `;

                cartItems.appendChild(div);

            });


            document.querySelectorAll(".minus")
                .forEach(button => {

                    button.addEventListener("click", function () {

                        const index =
                            Number(this.dataset.index);

                        if (cart[index].quantity > 1) {

                            cart[index].quantity--;

                        } else {

                            cart.splice(index, 1);

                        }

                        renderCart();

                    });

                });


            document.querySelectorAll(".plus")
                .forEach(button => {

                    button.addEventListener("click", function () {

                        const index =
                            Number(this.dataset.index);

                        cart[index].quantity++;

                        renderCart();

                    });

                });


            document.querySelectorAll(".remove-item")
                .forEach(button => {

                    button.addEventListener("click", function () {

                        const index =
                            Number(this.dataset.index);

                        cart.splice(index, 1);

                        renderCart();

                    });

                });

        }


        updateCartTotals();

    }


    /* =========================================
       CART TOTAL
    ========================================= */

    function updateCartTotals() {

        let totalItems = 0;
        let totalPrice = 0;


        cart.forEach(item => {

            totalItems += item.quantity;

            totalPrice +=
                item.price * item.quantity;

        });


        if (cartCount) {
            cartCount.textContent = totalItems;
        }


        if (cartTotal) {

            cartTotal.textContent =
                "₦" + totalPrice.toLocaleString();

        }

    }


    /* =========================================
       WHATSAPP CHECKOUT
    ========================================= */

    if (checkoutBtn) {

        checkoutBtn.addEventListener("click", function () {

            if (cart.length === 0) {

                showToast("Your cart is empty.");

                return;

            }


            let message =
                "Hello Prinsalev Ventures!%0A%0A";

            message +=
                "*I want to place an order:*%0A%0A";


            let total = 0;


            cart.forEach(item => {

                const itemTotal =
                    item.price * item.quantity;

                total += itemTotal;

                message +=
                    `• ${item.name} x${item.quantity} - ₦${itemTotal.toLocaleString()}%0A`;

            });


            message +=
                `%0A*Total: ₦${total.toLocaleString()}*`;


            window.open(
                "https://wa.me/234806038403766?text=" +
                message,
                "_blank"
            );

        });

    }


    /* =========================================
       REVIEWS
    ========================================= */

    const reviewModal =
        document.getElementById("reviewModal");

    const openReviewBtn =
        document.getElementById("openReviewBtn");

    const closeReviewBtn =
        document.getElementById("closeReviewBtn");

    const reviewForm =
        document.getElementById("reviewForm");

    const reviewName =
        document.getElementById("reviewName");

    const reviewText =
        document.getElementById("reviewText");

    const reviewsContainer =
        document.getElementById("reviewsContainer");

    const ratingStars =
        document.querySelectorAll(".rating-star");


    let selectedRating = 0;


    if (openReviewBtn) {

        openReviewBtn.addEventListener("click", function () {

            reviewModal.classList.add("active");

        });

    }


    if (closeReviewBtn) {

        closeReviewBtn.addEventListener("click", function () {

            reviewModal.classList.remove("active");

        });

    }


    if (reviewModal) {

        reviewModal.addEventListener("click", function (event) {

            if (event.target === reviewModal) {

                reviewModal.classList.remove("active");

            }

        });

    }


    /* STAR RATING */

    ratingStars.forEach((star, index) => {

        star.addEventListener("click", function () {

            selectedRating = index + 1;


            ratingStars.forEach((item, itemIndex) => {

                if (itemIndex < selectedRating) {

                    item.classList.add("active");

                } else {

                    item.classList.remove("active");

                }

            });

        });

    });


    /* SUBMIT REVIEW */

    if (reviewForm) {

        reviewForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const name =
                reviewName.value.trim();

            const text =
                reviewText.value.trim();


            if (selectedRating === 0) {

                showToast("Please select a rating.");

                return;

            }


            const reviewCard =
                document.createElement("article");

            reviewCard.className = "review-card";


            let stars = "";

            for (let i = 0; i < selectedRating; i++) {
                stars += "★";
            }


            reviewCard.innerHTML = `

                <div class="stars">
                    ${stars}
                </div>

                <p>
                    "${text}"
                </p>

                <strong>
                    ${name}
                </strong>

            `;


            reviewsContainer.appendChild(reviewCard);


            reviewForm.reset();

            selectedRating = 0;

            ratingStars.forEach(star => {
                star.classList.remove("active");
            });


            reviewModal.classList.remove("active");


            showToast("Thank you for your review!");

        });

    }


    /* =========================================
       TOAST MESSAGE
    ========================================= */

    function showToast(message) {

        const toast =
            document.getElementById("toast");

        if (!toast) return;


        toast.textContent = message;

        toast.classList.add("show");


        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }


    /* =========================================
       INITIAL CART
    ========================================= */

    renderCart();

});