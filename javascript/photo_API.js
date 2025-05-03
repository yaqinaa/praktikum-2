const ACCESS_KEY = "usvpbC39RonDaR6JyXFmcv1MWpbXhRFD-nSUeKUID0U"; // <- ganti dengan API key kamu

function loadImage() {
    fetch(`https://api.unsplash.com/photos/random?query=design&orientation=squarish&client_id=${ACCESS_KEY}`)
      .then(res => res.json())
      .then(data => {
        const imageUrl = data.urls.regular;
        document.getElementById("unsplashImage").src = imageUrl;
      })
      .catch(err => console.error("Gagal ambil gambar:", err));
  }

window.onload = loadImage;