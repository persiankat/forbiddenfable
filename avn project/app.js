function redirectToGallery() {
    // Display a loading indicator if needed (optional)
    // document.body.innerHTML += '<div class="loading">Loading...</div>';

    // Redirect to the gallery page after a short delay
    setTimeout(() => {
        window.location.href = 'gallery.html';
    }, 500); // Adjust the delay as needed (e.g., 500ms)
}
