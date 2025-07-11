// ========== Supabase Setup ==========
const supabaseUrl = "https://lygwxvyvdkoevgzzuwkh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Z3d4dnl2ZGtvZXZnenp1d2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMDM5OTUsImV4cCI6MjA2NzU3OTk5NX0.l2jnH9ZUYqM7mt6FJE6EGnKxNXuYUHuH_9n9aKVF7Iw";

const client = supabase.createClient(supabaseUrl, supabaseKey);

// ========== DOM Elements ==========

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const formTitle = document.getElementById("formTitle");
const loader = document.getElementById("loader");

// ========== Toggle Forms ==========
document.getElementById("switchToSignup").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
  formTitle.textContent = "Sign Up to InsideBox";
});

document.getElementById("switchToLogin").addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
  formTitle.textContent = "Login to InsideBox";
});

// ========== Signup ==========
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.style.display = "block";

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const { error } = await client.auth.signUp({ email, password });
  loader.style.display = "none";

  if (error) {
    alert("❌ Signup failed: " + error.message);
  } else {
    alert("✅ Signup successful! Check your email.");
    signupForm.reset();
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
    formTitle.textContent = "Login to InsideBox";
  }
});

// ========== Login ==========
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.style.display = "block";

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const { error } = await client.auth.signInWithPassword({ email, password });
  loader.style.display = "none";

  if (error) {
    alert("❌ Login failed: " + error.message);
  } else {
    alert("✅ Login successful!");
    localStorage.setItem("userEmail", email);
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  }
});

// Google
// const googleBtn=document.getElementById("googleLogin").addEventListener("click", async () => {
document.getElementById("googleLogin").addEventListener("click", async () => {
  const { error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://127.0.0.1:5500/home.html" 
    }
  });
  if (error) alert("google login failed: " + error.message);
});



// Facebook
document.getElementById("facebookLogin").addEventListener("click", async () => {
  const { error } = await client.auth.signInWithOAuth({
    provider: "facebook",
    
      options: {
  redirectTo: "http://127.0.0.1:5500/home.html"
}
 
  });
  if (error) alert("Facebook login failed: " + error.message);
});



//=========Github======================
document.getElementById("githubLogin").addEventListener("click", async () => {
  const { error } = await client.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://127.0.0.1:5500/home.html" 
    }
  });
  if (error) alert("GitHub login failed: " + error.message);
});


// ========== Figma Button ==========
document.getElementById("figmaLogin").addEventListener("click", () => {
  alert("⚠ Figma login is not supported.");
});