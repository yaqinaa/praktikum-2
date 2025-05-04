const ACCESS_KEY = "usvpbC39RonDaR6JyXFmcv1MWpbXhRFD-nSUeKUID0U"; // <- API key

function loadImage() {
    fetch(`https://api.unsplash.com/photos/random?query=programming&orientation=squarish&client_id=${ACCESS_KEY}`)
      .then(res => res.json())
      .then(data => {
        const imageUrl = data.urls.regular;
        const photographerName = data.user.name;
        const photographerUrl = data.user.links.html;
  
        document.getElementById("unsplashImage").src = imageUrl;
        document.getElementById("credit").innerHTML =
          `Photo by <a href="${photographerUrl}?utm_source=tugaspaktikno&utm_medium=referral" target="_blank">${photographerName}</a> on <a href="https://unsplash.com" target="_blank">Unsplash</a>`;
      })
      .catch(err => console.error("Gagal ambil gambar:", err));
  }
  

window.onload = loadImage;