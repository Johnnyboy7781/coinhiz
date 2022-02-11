// Twitter Feed Els
var scrollEl = document.querySelector("#media-scroller");
var scrollContainerEl = document.querySelector(".media-scroller-container");

let scrollInterval;
const coinsToSearchTweetsFor = "btc-bitcoin";
const apiUrl = `https://api.coinpaprika.com/v1/coins/${coinsToSearchTweetsFor}/twitter`;

// Truncates incoming tweets status that are over 175 characters
const truncateTweetStatus = (status) => {
    if (status.length > 175) {
        let newStatus = status.substring(0, 175);
        newStatus += "...";

        status = newStatus;
    }

    return status;
};

const redirectToTweetSource = (src) => {
    window.open(src, "_blank");
};

const populateMediaScroller = (twitterRes) => {
    for (let i = 0; i < twitterRes.length; i++) {
        let mediaItemEl = document.createElement("div");
        mediaItemEl.setAttribute("data-tweet-source", twitterRes[i].status_link);
        mediaItemEl.className = "media-item";

        let userInfoEl = document.createElement("div");
        userInfoEl.className = "user-info";

        let userImgEl = document.createElement("img");
        userImgEl.className = "userImg";
        userImgEl.setAttribute("src", twitterRes[i].user_image_link);
        userInfoEl.append(userImgEl);

        let textContainerEl = document.createElement("div");
        textContainerEl.className = "text-container";

        let usernameEl = document.createElement("p");
        usernameEl.className = "username";
        usernameEl.innerHTML = twitterRes[i].user_name;
        textContainerEl.append(usernameEl);

        userInfoEl.append(textContainerEl);
        mediaItemEl.append(userInfoEl);

        let tweetContentEl = document.createElement("div");
        tweetContentEl.className = "tweet-content";

        let tweetTextEl = document.createElement("p");
        tweetTextEl.className = "tweet-text";
        tweetTextEl.innerHTML = truncateTweetStatus(twitterRes[i].status);
        tweetContentEl.append(tweetTextEl);

        mediaItemEl.append(tweetContentEl);

        scrollEl.append(mediaItemEl);
    }
};

// START MEDIA SCROLLER LOGIC
const startScroll = () => {
    scrollInterval = setInterval(function () {
        // If at the end of the list, scroll to start
        if (scrollEl.scrollLeft >= -10) {
            scrollEl.scrollTo({
                left: -100000, // Dummy value so that it always scrolls back to start
                behavior: "smooth",
            });
        } else {
            scrollEl.scrollTo({
                left: scrollEl.scrollLeft + 270, // Increment scroll
                behavior: "smooth",
            });
        }
    }, 5000); // Scroll every 5s
};

const scrollIntervalHandler = (start, pause) => {
    if (start) { // Used to begin scrolling interval
        startScroll();
    } else if (pause) { // Used to temporarily pause scroll interval if using manual scroll buttons
        clearInterval(scrollInterval);
        startScroll();
    }
};

const scrollButtonHandler = (event) => { // Scroll media by 270px in direction of button press
    let targetEl = event.target;

    if (targetEl.className === "left-button-container" || targetEl.className === "left-arrow") {
        scrollIntervalHandler(false, true); // Pause scroll interval
        scrollEl.scrollTo({
            left: scrollEl.scrollLeft - 270,
            behavior: "smooth",
        });
    } else if (targetEl.className === "right-button-container" || targetEl.className === "right-arrow") {
        scrollIntervalHandler(false, true); 
        if (scrollEl.scrollLeft >= -10) { // If at end, scroll to front
            scrollEl.scrollTo({
                left: -100000,
                behavior: "smooth",
            });
        } else {
            scrollEl.scrollTo({
                left: scrollEl.scrollLeft + 270,
                behavior: "smooth",
            });
        }
    }
};
// END MEDIA SCROLLER LOGIC

async function getTweets() {
    fetch(apiUrl).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                populateMediaScroller(data);
            });
        }
    });
}

const tweetClickHandler = (event) => {
    let targetEl = event.target;

    // TODO: Refactor this, this sucks
    if (
        targetEl.className === "media-item" ||
        targetEl.className === "username" ||
        targetEl.className === "handle" ||
        targetEl.className === "userImg" ||
        targetEl.className === "tweet-text"
    ) {
        if (targetEl.className !== "media-item") {
            targetEl = targetEl.closest(".media-item");
        }
        redirectToTweetSource(targetEl.getAttribute("data-tweet-source")); // Open tweet source when clicking on tweet
    }
};

setTimeout(() => {
    scrollEl.scrollTo({
        left: -100000,
        behavior: "smooth",
    });

    scrollIntervalHandler(true, false);
    // Begins the initial scroll to front and the scroll interval
    // Set on a timeout since loading of tweet data would interfere if run immediately on startup
}, 500);


getTweets(); 
scrollEl.addEventListener("click", tweetClickHandler);
scrollContainerEl.addEventListener("click", scrollButtonHandler);