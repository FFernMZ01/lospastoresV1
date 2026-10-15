// google analitics
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');

// Reviews
const locations = [
  {
    name: "East Rosedale",
    mapsUrl: "https://search.google.com/local/writereview?placeid=ChIJ6XOqVn5wToYR78JPUGyLq8A"
  },

];

const reviewLocations = [
  {
    "locationName": "East Rosedale",
    "placeId": "ChIJ6XOqVn5wToYR78JPUGyLq8A",
    "mapsUrl": "https://maps.app.goo.gl/Gs8LNNTNxhocsfnj7",
    "rating": 5,
    "text": "First time here and we LOVE IT great service food was delicious and hot. Didn't take long to get our food. It was not packed but I'm glad because our experience was really nice. We will definitely be coming back. We had filete pescado n beef fajitas. Very juicy and tender. It was like 1/2 a pound of fajita on the plate. Was nice to see meat on the plate not just onions like other places do\n..My lemonade was so good it tasted fresh! My compliments to everyone! From the cook to the waitress to the owners 😉",
    "author": "Yesenia Cabrera",
    "photoUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXrQt4unMyAxFcGTOHKDi8i0UxpegtjWLX1ZgUrn2TjSmwOBI3a=s128-c0x00000000-cc-rp-mo-ba3",
    "txtcreated": "8 months ago",
    "timeDate": "2025-07-25"
  },
  {
    "locationName": "East Rosedale",
    "placeId": "ChIJ6XOqVn5wToYR78JPUGyLq8A",
    "mapsUrl": "https://maps.app.goo.gl/Gs8LNNTNxhocsfnj7",
    "rating": 4,
    "text": "The service here is good. They take your order and bring the salsas then leave you alone to your meal. Just flag someone down when you want a drink refill. Occasionally a mariachi group comes through to play for a tip. The menu has changed since I was here last. Most of the old favorites are here but I noticed the Tortas are now smaller.",
    "author": "Elizabeth A. Howard",
    "photoUrl": "https://lh3.googleusercontent.com/a-/ALV-UjX1GMaL3iDdO57Pr8Uz7H9PCu3EKQdd2Z23shmtXf3eJo4op-CL=s128-c0x00000000-cc-rp-mo-ba6",
    "txtcreated": "6 months ago",
    "timeDate": "2025-09-25"
  },
  {
    "locationName": "East Rosedale",
    "placeId": "ChIJ6XOqVn5wToYR78JPUGyLq8A",
    "mapsUrl": "https://maps.app.goo.gl/Gs8LNNTNxhocsfnj7",
    "rating": 5,
    "text": "Good authentic Mexican food and very good hospitality very nice place to eat in Fort Worth for family they also offer drive-through good for placing an order through the phone and picking up in person. Mexican breakfast and lunch and dinner",
    "author": "BOTAS ROJERO",
    "photoUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVd3u8IilEzOawLnLEQvdTazBoUy6VBDNjIZxMAQx76KTWvX5Xhrw=s128-c0x00000000-cc-rp-mo-ba3",
    "txtcreated": "5 months ago",
    "timeDate": "2025-10-25"
  },
  {
    "locationName": "East Rosedale",
    "placeId": "ChIJ6XOqVn5wToYR78JPUGyLq8A",
    "mapsUrl": "https://maps.app.goo.gl/Gs8LNNTNxhocsfnj7",
    "rating": 5,
    "text": "I went to eat some tacos during lunchtime! It was empty during that time but the waitress was on it. She brought us chips and salsa right away. The tacos were okay. I have had some better tacos before but these weren't bad at all. The food took less than 8 minutes. She checked on us every 10 minutes and was very kind. Overall, I would recommend this place, it was nice and comfy, and the staff was very kind.",
    "author": "steph mtz",
    "photoUrl": "https://lh3.googleusercontent.com/a/ACg8ocI_a5bbyZ-3u7NRaBywPBG71TwNlGSEJMsEQuu7tcaPFDK5G7QH=s128-c0x00000000-cc-rp-mo-ba4",
    "txtcreated": "2 years ago",
    "timeDate": "2024-03-25"
  },
  {
    "locationName": "East Rosedale",
    "placeId": "ChIJ6XOqVn5wToYR78JPUGyLq8A",
    "mapsUrl": "https://maps.app.goo.gl/Gs8LNNTNxhocsfnj7",
    "rating": 5,
    "text": "Went to an even that was Catered by Los Pastores. Everyone around me including myself loved the chicken and steak fajitas. Not a big fan of Mexican rice but this was delicious. Probably a party of 200 people and everyone was satisfied with the portions and all of us west of Fort Worth were interested in this restaurant. I recommend.",
    "author": "Spencer Wight",
    "photoUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVK_AFzB0Az_n9JKq6r-Xd2W5gRjl0uoT817tEZqECUimUqZzFx=s128-c0x00000000-cc-rp-mo-ba4",
    "txtcreated": "3 months ago",
    "timeDate": "2025-12-25"
  }
]

// Load and Fetch Reviews
function truncateName(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[1].charAt(0)}.`;
}

function truncateText(text, maxLength = 40) {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength).trim() + "…";
}

function renderStars(rating) {
  const maxStars = 5;
  const fullStars = Math.round(rating || 0);
  let stars = "";

  for (let i = 0; i < maxStars; i++) {
    stars += i < fullStars ? "★" : "☆";
  }

  return stars;
}

(function initReviews() {
  const reviewBox = document.getElementById("review-box");
  // const locationBadge = document.getElementById("location-badge");
  const prevBtn = document.getElementById("prev-review");
  const nextBtn = document.getElementById("next-review");
  const reviewLink = document.getElementById("review-link");

  if (!reviewBox || !prevBtn || !nextBtn || !reviewLocations || reviewLocations.length === 0) {
    return;
  }

  let currentIndex = 0;

  function renderReview(index) {
    const review = reviewLocations[index];

    // // Show "at Westpark"
    // if (locationBadge && review.locationName) {
    //   locationBadge.textContent = `at ${review.locationName}`;
    // }

    const displayName = truncateName(review.author);
    const truncatedText = truncateText(review.text, 40);
    const stars = renderStars(review.rating);

    reviewBox.innerHTML = `
      <div class="d-flex align-items-start gap-3">
        <div>
          <img 
            src="${review.photoUrl || "images/default-avatar.webp"}" 
            alt="${displayName}" 
            class="rounded-circle" 
            style="width: 56px; height: 56px; object-fit: cover;">
        </div>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <div class="second-font fw-bold text-dark">
              ${displayName}
            </div>
          </div>
          <div class="mb-2" aria-label="${review.rating} star rating">
            <span class="text-adobeclay" style="font-size: 18px;">${stars}</span>
          </div>
          <p class="mb-0 second-font text-dark">
            “${truncatedText}”
          </p>
        </div>
      </div>
    `;

    if (reviewLink && review.mapsUrl) {
      reviewLink.href = review.mapsUrl;
    }
  }


  function showNext() {
    currentIndex = (currentIndex + 1) % reviewLocations.length;
    renderReview(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + reviewLocations.length) % reviewLocations.length;
    renderReview(currentIndex);
  }

  // Event listeners
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Initial render
  renderReview(currentIndex);
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////

const GOOGLE_MAPS_API_KEY = "AIzaSyCsdzuN4rg-hyy-KVaSjaEgTrmzGNykYtU"; //My API Key
const MAP_ID = "a3a0f1212b42d58e14271460"; //Map ID

const LOCATION = {
  brand: "Los Pastores Restaurante",
  branch: "Fort Worth",
  lat: 32.7312,
  lng: -97.2688,
  address: "3806 E Rosedale St, Fort Worth",
  url: "https://maps.app.goo.gl/FUW6k1EJgzdEhxDu6",
};

// Load Google Maps JS once
function loadGoogleMaps() {
  if (window.google?.maps) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      GOOGLE_MAPS_API_KEY
    )}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function initMap() {
  await loadGoogleMaps();

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const position = { lat: LOCATION.lat, lng: LOCATION.lng };

  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const map = new Map(mapEl, {
    center: position,
    zoom: 15,
    mapId: MAP_ID,
    gestureHandling: "greedy",
  });

  // Default marker (no "content" passed)
  const marker = new AdvancedMarkerElement({
    map,
    position,
    title: `${LOCATION.brand} - ${LOCATION.branch}`,
  });

  marker.addListener("click", () => {
    if (LOCATION.url) window.open(LOCATION.url, "_blank", "noopener,noreferrer");
  });
}

document.addEventListener("DOMContentLoaded", initMap);

/////////////////////////////////////////////////////////////////////////////////////////////


//Let Content Load
document.addEventListener("DOMContentLoaded", function () {
  const date = new Date();
  const copyYear = document.getElementById('copyYear');

  if (!copyYear) return;

  if (copyYear.closest('.lp-footer-bottom')) {
    copyYear.textContent = `© 2010–${date.getFullYear()} Los Pastores Restaurante. All Rights Reserved.`;
    return;
  }

  copyYear.innerHTML = "© 2010 - " + date.getFullYear() + " Los Pastores Restaurante | All Rights Reserved | <a href=\"https://kukipos.com\" style=\"text-decoration: none; color: #fff;\">Powered by KukiPOS</a>";

});
