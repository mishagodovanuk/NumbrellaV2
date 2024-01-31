/**
 * Show hint popup.
 */
function showPopup() {
    // Show the popup and overlay
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

/**
 * Hide hint popup.
 */
function hidePopup() {
    // Hide the popup and overlay
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

/**
 * Reload game.
 */
function reload() {
    location.reload();
}
