/* ==========================================
            CONTRIBUTION.JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
                AOS INIT
    ========================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 1000,
            once: true,
            offset: 100

        });

    }

    /* ==========================================
                GSAP HERO ANIMATION
    ========================================== */

    if (typeof gsap !== "undefined") {

        gsap.from(".hero-badge", {

            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"

        });

        gsap.from(".hero-title", {

            y: 80,
            opacity: 0,
            duration: 1.2,
            delay: 0.2,
            ease: "power3.out"

        });

        gsap.from(".hero-subtitle", {

            y: 60,
            opacity: 0,
            duration: 1.2,
            delay: 0.5,
            ease: "power3.out"

        });

        gsap.from(".hero-btn", {

            y: 40,
            duration: 1,
            delay: 0.8,
            ease: "back.out(1.7)"

        });

    }

    /* ==========================================
            SMOOTH SCROLL BUTTON
    ========================================== */

    const heroBtn = document.querySelector(".hero-btn");

    if (heroBtn) {

        heroBtn.addEventListener("click", (e) => {

            e.preventDefault();

            document
                .querySelector("#contributionForm")
                .scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

        });

    }

    /* ==========================================
            CATEGORY CARD ANIMATION
    ========================================== */

    const categoryCards =
        document.querySelectorAll(".category-card");

    categoryCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-10px) scale(1.03)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0) scale(1)";

        });

    });

    /* ==========================================
            DID YOU KNOW FACTS
    ========================================== */

    const contributionFacts = [

        "Odisha has one of the oldest surviving cultural traditions in India.",

        "The Konark Sun Temple is a UNESCO World Heritage Site and one of Odisha's greatest architectural achievements.",

        "Many forgotten folk traditions survive because local communities continue to preserve them.",

        "Odia became the sixth Indian language to receive Classical Language status.",

        "Odisha is home to over 60 tribal communities with unique traditions and customs.",

        "The Jagannath Culture has influenced art, music and literature across India.",

        "Community contributions help preserve local stories that may otherwise be lost forever.",

        "Thousands of historical photographs of Odisha remain undocumented in private collections.",

        "Traditional Odia recipes have been passed down through generations without written records.",

        "Many ancient temples in Odisha contain inscriptions that reveal fascinating historical facts."

    ];

    let factIndex = 0;

    const factText =
        document.getElementById(
            "contributionFactText"
        );

    if (factText) {

        setInterval(() => {

            factText.style.opacity = "0";

            setTimeout(() => {

                factIndex =
                    (factIndex + 1) %
                    contributionFacts.length;

                factText.textContent =
                    contributionFacts[factIndex];

                factText.style.opacity = "1";

            }, 300);

        }, 5000);

    }

    /* ==========================================
                COUNTER ANIMATION
    ========================================== */

    const counters =
        document.querySelectorAll(".counter");

    let counterStarted = false;

    function startCounters() {

        counters.forEach(counter => {

            const target =
                +counter.dataset.target;

            let count = 0;

            const speed = target / 100;

            const updateCounter = () => {

                count += speed;

                if (count < target) {

                    counter.innerText =
                        Math.ceil(count);

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.innerText =
                        target + "+";

                }

            };

            updateCounter();

        });

    }

    const impactSection =
        document.querySelector(
            ".impact-section"
        );

    if (impactSection) {

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !counterStarted
                        ) {

                            counterStarted = true;

                            startCounters();

                        }

                    });

                },

                {
                    threshold: 0.3
                }

            );

        observer.observe(
            impactSection
        );

    }

/* ==========================================
        FORM SUBMIT BUTTON
========================================== */

const form =
    document.getElementById(
        "contributionForm"
    );

const submitBtn =
    document.querySelector(
        ".submit-btn"
    );

if (form && submitBtn)
{
    form.addEventListener(
        "submit",
        async (e) =>
        {
            e.preventDefault();

            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token)
            {
                alert(
                    "Please login first."
                );
                return;
            }

            const formData =
                new FormData();

            formData.append(
                "FullName",
                document.getElementById(
                    "fullName"
                ).value
            );

            formData.append(
                "Category",
                document.getElementById(
                    "category"
                ).value
            );

            formData.append(
                "Title",
                document.getElementById(
                    "title"
                ).value
            );

            formData.append(
                "Article",
                document.getElementById(
                    "article"
                ).value
            );

            formData.append(
                "GoogleMapLink",
                document.getElementById(
                    "mapLink"
                ).value
            );

            formData.append(
                "ContributorAddress",
                document.getElementById(
                    "address"
                ).value
            );

            formData.append(
                "FacebookLink",
                document.getElementById(
                    "facebook"
                ).value
            );

            formData.append(
                "InstagramLink",
                document.getElementById(
                    "instagram"
                ).value
            );

            formData.append(
                "LinkedInLink",
                document.getElementById(
                    "linkedin"
                ).value
            );

            const contributorPhoto =
                document.getElementById(
                    "contributorPhoto"
                ).files[0];

            const photo1 =
                document.getElementById(
                    "photo1"
                ).files[0];

            const photo2 =
                document.getElementById(
                    "photo2"
                ).files[0];

            const photo3 =
                document.getElementById(
                    "photo3"
                ).files[0];

            if (contributorPhoto)
            {
                formData.append(
                    "ContributorPhoto",
                    contributorPhoto
                );
            }

            if (photo1)
            {
                formData.append(
                    "Photo1",
                    photo1
                );
            }

            if (photo2)
            {
                formData.append(
                    "Photo2",
                    photo2
                );
            }

            if (photo3)
            {
                formData.append(
                    "Photo3",
                    photo3
                );
            }

            try
            {
                submitBtn.disabled =
                    true;

                submitBtn.innerHTML = `
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Submitting...
                `;

                const token =
                    localStorage.getItem("token");

                console.log("Token:", token);

                const response =
                    await fetch(
                        "http://localhost:5128/api/contribution",
                        {
                            method: "POST",
                            headers:
                            {
                                Authorization: `Bearer ${token}`
                            },
                            body: formData
                        }
                    );

                console.log(
                    "Status:",
                    response.status
                );

                const text =
                    await response.text();

                console.log(
                    "Response:",
                    text
                );

                if (response.ok)
                {
                    window.location.href =
                        "https://hrudayranjan98.github.io/Ama-Asmita/thank-you.html";
                }
                else
                {
                    submitBtn.disabled =
                        false;

                    submitBtn.innerHTML = `
                        <i class="bi bi-send-fill"></i>
                        Submit Contribution
                    `;

                    alert(
                        "Submission failed."
                    );
                }
            }
            catch (error)
            {
                console.error(
                    error
                );

                submitBtn.disabled =
                    false;

                submitBtn.innerHTML = `
                    <i class="bi bi-send-fill"></i>
                    Submit Contribution
                `;

                alert(
                    "Something went wrong."
                );
            }
        }
    );
}
    /* ==========================================
            INPUT FOCUS EFFECT
    ========================================== */

    const inputs =
        document.querySelectorAll(

            ".form-control, .form-select"

        );

    inputs.forEach(input => {

        input.addEventListener(

            "focus",

            () => {

                input.style.transform =
                    "translateY(-2px)";

            }

        );

        input.addEventListener(

            "blur",

            () => {

                input.style.transform =
                    "translateY(0)";

            }

        );

    });

});

/* ==========================================
PAGE LOADER
========================================== */

window.addEventListener('load', () =>
{
    const loader =
    document.getElementById('page-loader');

    setTimeout(() =>
    {
        loader.classList.add('hide');
    }, 150);
});