import { fetchNews } from "./apiService.js";
import { createNewsCard } from "./newsCard.js";
import { showSkeletons, removeSkeletons } from "./skeleton.js";
import { filterBySource } from "./filter.js";
import { sortByDate } from "./sort.js";
import { showErrorMessage } from "./errorHandler.js";

const container = document.getElementById("newsContainer");
let articles = [];


async function loadNews() {
    container.innerHTML = "";
    showSkeletons(container, 6);

    try {
        const [newsAPI, guardianAPI, theNewsAPI] = await fetchNews();
        articles = [...newsAPI.articles, ...guardianAPI.response.results, ...theNewsAPI.data];
        console.log(articles);
        removeSkeletons();
        displayNews(articles);
    } catch (error) {
        console.error("Error loading news:", error);
        removeSkeletons();
        showErrorMessage();
    }
}

function displayNews(filteredArticles) {
    container.innerHTML = "";
    // console.log(filteredArticles);
    filteredArticles.forEach(article => {
        container.appendChild(createNewsCard(article));
    });
}

document.getElementById("sourceFilter").addEventListener("change", (event) => {
    const selectedSource = event.target.value;
    if (selectedSource === "all") {
        displayNews(articles);
    } else {
        displayNews(filterBySource(articles, selectedSource));
    }
});

document.getElementById("sortByDate").addEventListener("click", () => {
    displayNews(sortByDate(articles));
});

document.getElementById("retryButton").addEventListener("click", loadNews);

loadNews();