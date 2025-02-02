(() => {
    // Starwars API Connection
    const charCont = document.querySelector('#char-cont');
    const detailTemplate = document.querySelector('#detail-template');
    const detailCont = document.querySelector('#detail-cont');
    const baseURL = "https://swapi.dev/";
    const errorCont = document.querySelector("#error-cont");

    function getChars() {
        // Loading Animation
        errorCont.style.display = "flex";

        fetch(`${baseURL}api/people/?format=json`)
        .then(response => response.json())
        .then(function(response) {
            console.log(response);
            const chars = response.results;

            const ul = document.createElement("ul");
            chars.forEach(char => {
                const li = document.createElement("li");
                const a = document.createElement("a");

                // Character Image
                const img = document.createElement("img");
                const imgName = char["name"].toLowerCase().replace(/\s+/g, "-");
                img.src = `./images/character/${imgName}.jpg`;
                img.alt = `Image of ${char["name"]}`;

                // Randomize the Film Selection
                let films = char["films"];
                let randomID = Math.floor(Math.random() * films.length);
                let selectedFilm = films[randomID];

                a.textContent = char["name"];
                a.dataset.detail = selectedFilm;

                li.appendChild(img);
                li.appendChild(a);
                ul.appendChild(li);
            });

            
            charCont.appendChild(ul);

            // Hide when the content is loaded
            errorCont.style.display = "none";
        })
        .then(function() {
            const links = document.querySelectorAll("#char-cont li a");
            console.log(links);

            // GSAP Animation
            links.forEach(function(link) {
                const hoverAnim = gsap.timeline({ paused: true});

                hoverAnim.to(link, {
                    backgroundColor: "#fbff00",
                    color: "#000",
                    borderColor: "#fbff00",
                    duration: 0.5,
                    ease: "power2.out"
                });

                function playHover() {
                    hoverAnim.play();
                }
            
                function reverseHover() {
                    hoverAnim.reverse();
                }

                link.addEventListener("mouseenter", playHover);
                link.addEventListener("mouseleave", reverseHover);
            })

            links.forEach(function(link) {
                link.addEventListener("click", getDetails);
            })
        })
        .catch(function(error) {
            console.log(error);

            // Show the error container
            errorCont.style.display = "flex";

            const errorMsg = document.createElement("p");
            errorMsg.textContent = `Uh Oh! Something went wrong, it might be our server or some technical issues.
            More Details can be seen here: ${error}`;

            errorCont.appendChild(errorMsg);
        })
    }

    function getDetails(e) {
        // console.log("getDetails Called");
        // console.log(e.currentTarget.dataset.detail);
        const detailLink = e.currentTarget.dataset.detail;

        fetch(`${detailLink}`)
        .then(response => response.json())
        .then(function(response) {
            detailCont.innerHTML = "";
            console.log(response);
            const clone = detailTemplate.content.cloneNode(true);

            const detailTitle = clone.querySelector(".detail-title");
            detailTitle.innerHTML = response.title;

            const detailOpening = clone.querySelector(".detail-opening");
            detailOpening.innerHTML = response.opening_crawl;

            const detailDirector = clone.querySelector(".detail-director");
            detailDirector.innerHTML = response.director;

            const detailProducer = clone.querySelector(".detail-producer");
            detailProducer.innerHTML = response.producer;

            const detailRelease = clone.querySelector(".detail-release");
            detailRelease.innerHTML = response.release_date;

            // Poster Image
            const img = document.createElement("img");
            const imgName = response.title.toLowerCase().replace(/\s+/g, "-");
            img.src = `./images/films/${imgName}.jpg`;
            img.alt = `Image Poster of ${response.title}`;

            const detailImg = clone.querySelector(".detail-img");
            detailImg.appendChild(img);

            detailCont.appendChild(clone);

            // Scroll to specified section
            document.querySelector("#details").scrollIntoView({ behavior: "smooth" });
        })
        .catch(function(error) {
            detailCont.innerHTML = "Detail is not available for this character, or it might have some error on our side.";
        })
    }
    
    getChars();

    // Stars Background Animation
    const starsCont = document.querySelector('#whole-cont');
    const starsAmount = 250;
    const maxSize = 5;
    const minSize = 1;
    const maxDuration = 7;
    const minDuration = 3;
    
    function spawnStars() {
        const star = document.createElement("div");
        star.classList.add("star");

        // Star Position
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;

        // Randomize size of the star
        const size = Math.random() * (maxSize - minSize) + minSize;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Initial Position
        star.style.left = `${posX}px`;
        star.style.top = `${posY}px`;

        starsCont.appendChild(star);
        animateStar(star);
    }

    function animateStar(star) {
        const duration = Math.random() * (maxDuration - minDuration) + minDuration;
    
        gsap.to(star, {
            opacity: 0,  
            yoyo: true, 
            repeat: -1, 
            duration: duration,
            ease: "power1.inOut", 
            delay: Math.random() * 5
        });
    }

    function generateStars() {
        for (let i = 0; i < starsAmount; i++) {
            spawnStars();
        }
    }

    window.addEventListener('load', generateStars);



    // console.log(gsap);


})();
