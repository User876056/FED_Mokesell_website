document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("Username");

    if (isLoggedIn) {
        console.log("Logging successfully")

        const registerButtons = document.querySelectorAll('.register-button');
        registerButtons.forEach(button => {
        button.style.display = 'none';
        });

        // Show account button
        document.getElementById("accountContainer").style.display = "block";

        // Set username display
        document.getElementById("usernameDisplay").textContent = username;

        // Generate avatar (first letter of username)
        document.getElementById("avatar").textContent = username.charAt(0);

        
        document.getElementById("function-buttons").style.display = "block";

        document.getElementById("accountBtn").addEventListener("click", () => {
            window.location.href = "Profile.html";
        });

        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "index.html";
        });
    }
});


