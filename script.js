// Hamburger menu functionality
const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

// Close menu when a link is clicked
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("active")
  }
})

// Form submission
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "c7dc4b8b-fe1d-4089-aaa8-b1933de3ca2d",
        name,
        email,
        message,
      }),
    })

    const result = await response.json()
    if (response.status === 200) {
      alert("Message sent successfully!")
      contactForm.reset()
    } else {
      alert("There was an error sending your message. Please try again.")
    }
  } catch (error) {
    console.error("Error:", error)
    alert("There was an error sending your message. Please try again.")
  }
})

// Image optimization
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    if (!img.complete) {
      img.style.opacity = "0"
      img.onload = () => {
        img.style.transition = "opacity 0.3s ease-in"
        img.style.opacity = "1"
      }
    }
  })
})

// Smooth scroll function
function smoothScroll(target, duration) {
  const targetElement = document.querySelector(target)
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime = null

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = ease(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  function ease(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}

// Apply smooth scroll to all internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = this.getAttribute("href")
    smoothScroll(target, 800) // Adjust duration (in ms) as needed
  })
})

// Initialize AOS (Animate On Scroll)
// Declare AOS before initializing it
AOS = window.AOS

AOS.init({
  duration: 1000,
  once: false,
  easing: "ease-in-out",
  delay: 100,
})

// Navbar scroll effect
const navbar = document.querySelector("nav")
const heroSection = document.querySelector(".hero")

function updateNavbar() {
  const scrollPosition = window.scrollY
  const heroHeight = heroSection.offsetHeight
  const scrollPercentage = Math.min(scrollPosition / heroHeight, 1)

  if (scrollPercentage > 0) {
    navbar.classList.add("scrolled")
    navbar.style.backgroundColor = `rgba(31, 31, 31, ${0.8 * scrollPercentage})`
    navbar.style.backdropFilter = `blur(${5 * scrollPercentage}px)`
  } else {
    navbar.classList.remove("scrolled")
    navbar.style.backgroundColor = "transparent"
    navbar.style.backdropFilter = "none"
    navbar.classList.remove("scrolled")
  }
}

function updateHamburger() {
  const scrollPosition = window.scrollY
  const heroHeight = heroSection.offsetHeight
  const scrollPercentage = Math.min(scrollPosition / heroHeight, 1)

  if (scrollPercentage > 0) {
    hamburgerList.classList.add("scrolled")
    hamburgerList.style.backgroundColor = `rgba(31, 31, 31, ${0.8 * scrollPercentage})`
    hamburgerList.style.backdropFilter = `blur(${5 * scrollPercentage}px)`
  } else {
    hamburger.classList.remove("scrolled")
    hamburgerList.style.backgroundColor = "transparent"
    hamburgerList.style.backdropFilter = "none"
  }
}

window.addEventListener("scroll", updateNavbar)
updateNavbar() // Call once to set initial state

