(() => {
    const charCont = document.querySelector('#char-cont');
    const detailTemplate = document.querySelector('#detail-template');
    const detailCont = document.querySelector('#detail-cont');
    const baseURL = "https://swapi.dev/";
    const errorCont = document.querySelector("#error-cont");
    const errorContDetail = document.querySelector("#error-cont-detail");

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

                a.appendChild(img);
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
        })
        .catch(function(error) {
            detailCont.innerHTML = "Detail is not available for this character, or it might have some error on our side.";
        })
    }
    
    getChars();

})();
