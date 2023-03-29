function shareLink() {
  navigator.clipboard
    .writeText("https://lorenzovecchio.dev")
    .then(() => {
      document.getElementById("linkCopied").style.display = "flex";
      setTimeout(function () {
        document.getElementById("linkCopied").style.display = "none";
      }, 2000);
    })
    .catch(() => {
      document.getElementById("linkNotCopied").style.display = "flex";
      setTimeout(function () {
        document.getElementById("linkNotCopied").style.display = "none";
      }, 2000);
    });
}
function selectArticles() {
  document.getElementById("articles").style.display = "flex";
  document.getElementById("social").style.display = "none";
}
function selectSocial() {
  document.getElementById("articles").style.display = "none";
  document.getElementById("social").style.display = "flex";
}

const nav = document.querySelector(".nav");
const navTop = nav.getBoundingClientRect().top + window.scrollY;
const stickedNavClass = "sticked-nav";

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        nav.classList.add(stickedNavClass);
      } else {
        nav.classList.remove(stickedNavClass);
      }
    });
  },
  {
    root: null,
    rootMargin: `-${nav.offsetHeight}px 0px 0px 0px`,
    threshold: 0,
  }
);

window.addEventListener("scroll", () => {
  if (window.scrollY >= navTop - 5) {
    intersectionObserver.observe(nav);
  } else {
    intersectionObserver.unobserve(nav);
    nav.classList.remove(stickedNavClass);
  }
});

$(document).ready(function () {
  var nav = $(".titleGroup");
  var pos = 0;
  var wid = "";
  var line = $(".slider");
  var active = $(".active");

  /* Click */
  nav.find("h2").on("click", function () {
    var this_nav = $(this);
    line.animate({
      top: this_nav.position().top,
      left: this_nav.position().left,
      width: this_nav.width(),
    });
  });

  // on load
  window.onload = function () {
    var active_width = active.width();
    var active_top = active.position().top;
    var active_left = active.position().left;
    line.css({
      width: active_width,
      top: active_top,
      left: active_left,
    });
    displayLoading();
    $(".contact-form").hide();
  };
});
// function for loading, display and hide
function displayLoading() {
  const loader = document.getElementById("loading");
  loader.classList.add("display");
}
function hideLoading() {
  const loader = document.getElementById("loading");
  loader.classList.remove("display");
  loader.style.display = "none";
}

// Medium
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
  method: "get",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "https://v1.nocodeapi.com/lorenzo_vecchio/medium/FUPLyWCLoTqOEvwh",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    const test = document.getElementById("articles");
    result.forEach((single) => {
      const div = document.createElement("div");
      div.classList.add("linkItem");
      const div2 = document.createElement("div");
      const h3 = document.createElement("h3");
      let a = document.createElement("a");
      a.classList.add("linkCard");
      a.href = single.link;
      div.classList.add("linkImg");
      div2.insertAdjacentHTML(
        "afterbegin",
        '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-news" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"/><path d="M16 6h3a1 1 0 011 1v11a2 2 0 01-4 0V5a1 1 0 00-1-1H5a1 1 0 00-1 1v12a3 3 0 003 3h11M8 8h4M8 12h4M8 16h4"/></svg>'
      );
      h3.classList.add("linkTitle");
      h3.innerHTML = single.title;
      div.append(div2, h3);
      a.append(div);
      test.append(a);
      hideLoading();
    });
  })
  .catch((error) => console.log("error", error));

$(document).ready(function () {
  // Add a click event listener to the contact icon
  $(".contact-icon").click(function () {
    // Check if the contact form is already expanded
    if ($(".contact").hasClass("expanded")) {
      // If it is, shrink it back to default size
      $(".contact")
        .animate({ width: "52px", height: "52px" }, 500)
        .removeClass("expanded");
      $(".contact-form").hide();
    } else {
      // If it's not, expand it to 90% width and 90% height
      $(".contact")
        .animate({ width: "90%", height: "90%" }, 500)
        .addClass("expanded");
      $(".contact-form").show();
    }
  });

  window.addEventListener("load", function () {
    const form = document.getElementById("my-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const action = e.target.action;
      fetch(action, {
        method: "POST",
        body: data,
      }).then(() => {
        document.getElementById("formSubmitted").style.display = "flex";
        setTimeout(function () {
          document.getElementById("formSubmitted").style.display = "none";
        }, 2000);
        form.reset();
      });
    });
  });
});
