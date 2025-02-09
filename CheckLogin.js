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

        
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("input-box");
    const myUL = document.getElementById("myUL");

    inputBox.addEventListener("input", function () {
        const filter = inputBox.value.toLowerCase();
        let hasMatches = false;

        for (let item of myUL.getElementsByTagName("li")) {
            if (item.textContent.toLowerCase().includes(filter)) {
                item.style.display = "block";
                hasMatches = true;
            } else {
                item.style.display = "none";
            }
        }

        myUL.style.display = hasMatches ? "block" : "none";
    });

    document.addEventListener("click", function (e) {
        if (inputBox && myUL) { // Ensure both elements exist before checking
            if (!inputBox.contains(e.target) && !myUL.contains(e.target)) {
                myUL.style.display = "none";
            }
        }
    });
});


