(function() {
    var onlyLoggedOut = document.querySelector('.only-loggedout'),
        onlyLogged = document.querySelector('.only-logged'),
        onlyLoggedProfile = document.querySelector('.only-logged-profile');

    // See if user is authenticated
    fetch('/authenticated')
    .then(function(resp){
        return resp.json();
    })
    .then(function(data) {
        if (data.logged) {
            onlyLogged.style.display = 'block';
            onlyLoggedProfile.style.display = 'block';
        } else {
            onlyLoggedOut.style.display = 'block';
        }
    })
})();
