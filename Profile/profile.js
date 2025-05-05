// login
// document
//     .getElementById("loginForm")
//     .addEventListener("submit", function (event) {
//         event.preventDefault();
//         const username = document.getElementById("username").value;
//         const password = document.getElementById("password").value;

//         // Send a POST request to the backend API
//         fetch('http://localhost:5000/api/login', { // Ensure this URL matches your backend endpoint
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Login failed');
//             }
//             return response.json();
//         })
//         .then(data => {
//             alert(data.message); // Show success message
//             localStorage.setItem("user", JSON.stringify(data.user)); // Store user data in localStorage

//             // Retrieve the last visited page from localStorage
//             const lastPage = localStorage.getItem("lastPage");
            
//             // Redirect to the last visited page or to the home page if not found
//             if (lastPage) {
//                 window.location.href = lastPage;
//             } else {
//                 window.location.href = "../Landingpage/index.html";
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('An error occurred. Please try again.');
//         });
//     });     


document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Attempt real login via backend
    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message); // success message

            // Save login details
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);

            // ✅ Only hide Login & SignUp links
const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');
if (loginLink) loginLink.style.display = 'none';
if (signupLink) signupLink.style.display = 'none';


            // Redirect to the last visited page or landing page
            const lastPage = localStorage.getItem("lastPage");
            window.location.href = lastPage || "../Landingpage/index.html";
        })
        .catch(error => {
            console.warn('Backend login failed, using fallback:', error);

            // Fallback: mock login logic
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);

                const dropdown = document.getElementById('auth-dropdown');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }

                window.location.href = '../index.html';
            } else {
                alert('Invalid credentials');
            }
        });
});









// document.getElementById('loginForm').addEventListener('submit', function (e) {
//     e.preventDefault();
  
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
  
//     fetch('http://localhost:5000/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password }),
//     })
//       .then(response => {
//         if (!response.ok) throw new Error('Login failed');
//         return response.json();
//       })
//       .then(data => {
//         alert(data.message); // ✅ Alert appears here
  
//         if (data.message === 'Login successful') {
//           // ✅ Store login status
//           localStorage.setItem('isLoggedIn', 'true');
//           localStorage.setItem('username', username);
  
//           // ✅ Hide only Login & Signup links
//           const loginLink = document.getElementById('login-link');
//           const signupLink = document.getElementById('signup-link');
//           if (loginLink) loginLink.style.display = 'none';
//           if (signupLink) signupLink.style.display = 'none';
  
//           // ✅ Redirect (optional)
//           window.location.href = '../index.html';
//         }
//       })
//       .catch(error => {
//         alert('Login failed: ' + error.message);
//       });
//   });
  