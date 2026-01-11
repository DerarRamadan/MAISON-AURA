document.addEventListener("DOMContentLoaded", () => {

    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initial Loader
    const loader = document.getElementById('loader');
    const tlLoader = gsap.timeline({
        onComplete: () => {
            loader.style.display = 'none';
            document.body.style.visibility = 'visible';
            document.body.style.opacity = 1;
            initHeroAnimations();
        }
    });

    // Speed up: No delay, faster duration
    tlLoader.to(loader.querySelector('h1'), { opacity: 0, duration: 0.5, delay: 0.2 })
        .to(loader, { height: 0, duration: 0.5, ease: "power4.inOut" });

    // --------------------------------------------------------
    // Dynamic Content Rendering
    // --------------------------------------------------------

    // Render Best Sellers
    const bestSellersContainer = document.getElementById('best-sellers-container');
    if (bestSellersContainer && window.perfumeStore) {
        // Get 3 best sellers
        const bestSellers = window.perfumeStore.getProducts().filter(p => p.isBestSeller).slice(0, 3);

        bestSellers.forEach((product, index) => {
            const card = document.createElement('div');
            // Standard Card Style - Added 'relative' to fix hover overlap
            card.className = `bg-white p-4 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100/50 relative`;

            card.innerHTML = `
                <div class="aspect-[3/4] overflow-hidden mb-4 bg-gray-50 relative">
                     <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                     <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button onclick="event.stopPropagation(); addToCart({id:${product.id}, name:'${product.name}', price:${product.price}, image:'${product.image}'})" class="bg-gold text-white px-4 py-2 font-bold text-sm hover:bg-black transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">أضف للسلة</button>
                     </div>
                </div>
                <div class="text-center">
                    <h3 class="font-serif text-xl mb-2 font-bold text-gray-800 group-hover:text-gold transition-colors">${product.name}</h3>
                    <p class="text-xs font-bold tracking-wide text-gray-400 mb-3 font-sans">${product.brand}</p>
                    <span class="text-gold font-bold text-lg block">${product.price} د.ل</span>
                </div>
                <a href="product.html?id=${product.id}" class="absolute inset-0 z-20"></a>
            `;
            bestSellersContainer.appendChild(card);
        });

        // Animation REMOVED to fix transparency bug
        // Cards are now visible immediately
    }

    // --------------------------------------------------------
    // Animations
    // --------------------------------------------------------

    function initHeroAnimations() {
        const tl = gsap.timeline();

        tl.from(".section-hero img", { scale: 1.2, duration: 2, ease: "power2.out" }, 0)
            .from(".reveal-text", { y: 50, opacity: 0, duration: 1.5, stagger: 0.2, ease: "power3.out" }, 0.5);
    }

    // General Reveal on Scroll
    const reveals = document.querySelectorAll(".gs-reveal");
    reveals.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Parallax Images
    gsap.utils.toArray('.img-parallax').forEach(container => {
        gsap.to(container, {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: container.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // FIXED: Categories Rotation REMOVED
    // The user explicitly asked to "fix" the tilted animation. The updated HTML uses a standard static grid.
    // So we don't need the rotation code anymore.
    // If we want a subtle entrance:
    gsap.from(".grid-cols-2 > div", { // Targeting the category circles
        scrollTrigger: {
            trigger: ".grid-cols-2",
            start: "top 85%",
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
    });


    // Slide In (Featured)
    gsap.from(".gs-slide-right", {
        scrollTrigger: {
            trigger: ".gs-slide-right",
            start: "top 80%",
        },
        x: 100, // From Right (physically right)
        opacity: 0,
        duration: 1
    });

    gsap.from(".gs-slide-left", {
        scrollTrigger: {
            trigger: ".gs-slide-left",
            start: "top 80%",
        },
        x: -100, // From Left (physically left)
        opacity: 0,
        duration: 1
    });

    // Ingredients Cascade
    // Grid items are staggered
    const ingredients = document.querySelectorAll(".grid-cols-2 > div");
    // Ensure we are targeting the ingredients section specifically to avoid conflict
    // The HTML structure is a bit generic with classes, strictly targeting by section index or ID is safer if IDs existed
    // For now, let's assume the selector finds the right grid.

    // Newsletter Pop-up
    gsap.from("form", {
        scrollTrigger: {
            trigger: "form",
            start: "top 90%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    // Accordion Logic (Families Section)
    const accItems = document.querySelectorAll(".accordion-item");
    accItems.forEach(item => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");
        const icon = item.querySelector(".icon-plus");

        header.addEventListener('click', () => {
            const isOpen = item.classList.contains("active");

            // Close others
            accItems.forEach(other => {
                if (other !== item && other.classList.contains("active")) {
                    other.classList.remove("active");
                    gsap.to(other.querySelector(".accordion-content"), { height: 0, duration: 0.3, ease: "power2.out" });
                    gsap.to(other.querySelector(".icon-plus"), { rotation: 0, duration: 0.3 });
                    gsap.to(other.querySelector(".accordion-header"), { backgroundColor: "transparent", duration: 0.3 });
                }
            });

            if (isOpen) {
                // Close current
                item.classList.remove("active");
                gsap.to(content, { height: 0, duration: 0.3, ease: "power2.out" });
                gsap.to(icon, { rotation: 0, duration: 0.3 });
                gsap.to(header, { backgroundColor: "transparent", duration: 0.3 });
            } else {
                // Open current
                item.classList.add("active");
                gsap.to(content, { height: "auto", duration: 0.3, ease: "power2.out" });
                gsap.to(icon, { rotation: 45, duration: 0.3 }); // Become 'x'
                gsap.to(header, { backgroundColor: "rgba(0,0,0,0.02)", duration: 0.3 });
            }
        });
    });
});
