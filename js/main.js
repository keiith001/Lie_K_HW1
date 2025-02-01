(() => {
    const movieBox = document.querySelector('#movie-box');
    const reviewTemplate = document.querySelector('#review-template');
    const reviewCon = document.querySelector('#review-con');
    const baseURL = "https://search.imdbot.workers.dev/";

    function getMovies() {
        fetch(`${baseURL}?q=terminator`)
        .then(response => response.json())
        .then(function(response) {
            console.log(response);
            const movies = response.description;

            const ul = document.createElement("ul");
            movies.forEach(movie => {
                const li = document.createElement("li");
                const a = document.createElement("a");

                a.textContent = movie["#TITLE"];
                a.dataset.review = movie["#IMDB_ID"];
                li.appendChild(a);
                ul.appendChild(li);
            });

            movieBox.appendChild(ul);
        })
        .then(function() {
            const links = document.querySelectorAll("#movie-box li a");
            console.log(links);

            links.forEach(function(link) {
                link.addEventListener("click", getReview);
            })
        })
        .catch(function(error) {
            // Need to add error handling for the user + use loading spinner/animation
        })

    }

    function getReview(e) {
        // console.log("getReview Called");
        // console.log(e.currentTarget.dataset.review);
        const reviewID = e.currentTarget.dataset.review;
        fetch(`${baseURL}?tt=${reviewID}`)
        .then(response => response.json())
        .then(function(response) {
            reviewCon.innerHTML = "";
            console.log(response.short.review.reviewBody);
            const clone = reviewTemplate.content.cloneNode(true);

            const reviewDescription = clone.querySelector(".review-description");
            reviewDescription.innerHTML = response.short.review.reviewBody;

            const reviewHeading = clone.querySelector(".review-heading");
            reviewHeading.innerHTML = response.short.name;

            reviewCon.appendChild(clone);
        })
        .catch(function(error) {
            reviewCon.innerHTML = "Review is not available for this movie.";
        })
    }
    
    getMovies();

})();
