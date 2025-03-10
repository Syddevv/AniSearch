const searchBTN = document.getElementById("searchBTN");
const animeInput = document.getElementById("animeInput");
const animeImage = document.getElementById("animeImage");
const yearDisplay = document.getElementById("year");
const ratingDisplay = document.getElementById("rating");
const episodesDisplay = document.getElementById("episodes");
const scoreDisplay = document.getElementById("score");
const synopsisDisplay = document.getElementById("synopsis");
const animeTitle = document.getElementById("animeTitle");

animeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const animeTitle = animeInput.value;

  if (animeTitle) {
    try {
      const animeData = await getAnime(animeTitle);
      displayDetails(animeData);
    } catch (error) {
      console.error(error);
    }
  }
});

async function getAnime(title) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${title}`);

    if (!response.ok) {
      throw new Error("Could not fetch data from resource!");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

function displayDetails(data) {
  const {
    title,
    images: {
      jpg: { image_url },
    },
    episodes,
    rating,
    score,
    synopsis,
    year,
  } = data.data[0];

  animeImage.src = image_url;
  scoreDisplay.innerHTML = `${score}/10`;
  yearDisplay.innerHTML = year;
  ratingDisplay.innerHTML = rating;
  episodesDisplay.innerHTML = episodes;
  animeTitle.innerHTML = title;
  synopsisDisplay.innerHTML = synopsis;
}

window.onload = function () {
  const container1 = document.getElementById("container");
  const container2 = document.getElementById("container2");
  const scoreContainer = document.getElementById("score");
  const synopsisContainer = document.getElementById("synopsisContainer");

  container1.style.display = "none";
  container2.style.display = "none";
  scoreContainer.style.display = "none";
  synopsisContainer.style.display = "none";

  document.getElementById("searchBTN").addEventListener("click", () => {
    container1.style.display = "block";
    container2.style.display = "flex";
    scoreContainer.style.display = "block";
    synopsisContainer.style.display = "block";
  });
};
