const NEWS_API_KEY = "948ed2e6ecbe420b9818b9bc51280fb9";
const GUARDIAN_API_KEY = "5edcda6c-77ec-40ac-bf82-98d6d681485b";
const THE_NEWS_API_KEY = "O1WGdxY8gv6Gu5Ie13dgqbafbgw4yIfRuIG9UWFy";

// API URLs
const NEWS_API = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;
const GUARDIAN_API = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}`;
const THE_NEWS_API = ` https://api.thenewsapi.com/v1/news/top?api_token=${THE_NEWS_API_KEY}`;

export async function fetchNews() {
    try {
        const responses = await Promise.allSettled([
            fetch(NEWS_API),
            fetch(GUARDIAN_API),
            fetch(THE_NEWS_API)
        ]);

        const results = await Promise.all(
            responses.map(async (res, index) => {
                if (res.status === "fulfilled" && res.value.ok) {
                    return await res.value.json();
                } else {
                    console.warn(`API ${index + 1} failed.`);
                    return null;
                }
            })
        );
        console.log("Results:", results);
        return results;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}