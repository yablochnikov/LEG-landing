// smooth scroll

$('a[href*="#"]').on("click", function () {
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    400
  );
  return false;
});

// lang

const select = document.querySelector("select");
const allLang = ["en", "ru", "ua"];

select.addEventListener("change", changeURLLanguage);

function changeURLLanguage() {
  let lang = select.value;
  location.href = window.location.pathname + "#" + lang;
  location.reload();
}

function changeLanguage() {
  let hash = window.location.hash;
  hash = hash.substring(1);
  console.log(hash);
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + "#ua";
    location.reload();
  }
  select.value = hash;
  for (let key in langArr) {
    let el = document.querySelector(".lng-" + key);
    if (el) {
      el.innerHTML = langArr[key][hash];
    }
  }
  document.querySelector(".graphicIMG").src = langArr.graphicSrc[hash];
  document.querySelector(".form__name").placeholder = langArr.formName[hash];
  document.querySelector(".form__phone").placeholder = langArr.formPhone[hash];
  document.querySelector(".form__email").placeholder = langArr.formEmail[hash];

  document.querySelector(".form__text").placeholder = langArr.formText[hash];
}

changeLanguage();

// burger

const menu = document.querySelector(".header__menu_list"),
  menuItem = document.querySelectorAll(".header__menu_item"),
  hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger_active");
  menu.classList.toggle("header__menu_list_active");
});

menuItem.forEach(item => {
  item.addEventListener("click", () => {
    if ($(window).width() < 768) {
      $("body").toggleClass("opened");
    }
		
    hamburger.classList.toggle("hamburger_active");

    menu.classList.toggle("header__menu_list_active");
  });
});

$(".hamburger").on("click", function (e) {
  e.preventDefault();

  $("body").toggleClass("opened");
});

// header

const header = document.getElementById("header");
const menuLinks = header.querySelectorAll(".header__menu_item");

menuLinks.forEach(el =>
  el.addEventListener("click", e => {
    let current = document.querySelector(".active");
    current.classList.remove("active");
    el.classList.add("active");
  })
);

// form

$("#consultation").validate({
  rules: {
    name: "required",
    phone: "required",
    email: {
      required: true,
      email: true
    }
  },
  messages: {
    name: "Пожалуйста введите Ваше имя",
    email: {
      required: "Пожалуйста введите Ваш email",
      email: "Ваш адрес электронной почты должен быть в формате name@domain.com"
    },
    phone: "Пожалуйста введите Ваш номер телефона",
    textarea: "Пожалуйста задайте Ваш вопрос"
  }
});

$("input[name=phone]").mask("+999(99) 999-99-99");

const overlay = document.querySelector(".overlay");
const thanksModal = document.querySelector("#thanks");
const errorOverlay = document.querySelector(".errorOverlay");
const errorModal = document.querySelector("#errorModal");

$("form").submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize(),
    success: function () {
      $(this).find("input").val("");
      $("form").trigger("reset");
    },
    error: function () {
      console.log("smthj");
    }
  });
  return false;
});

const graphicModal = document.querySelector(".graphic_modal");

const graphicImg = document.querySelector(".graphicIMG");

const graphicImgModal = document.querySelector(".graphic_modal_img");

graphicImg.addEventListener("click", () => {
  if (window.screen.availWidth < 1000) {
    return;
  } else {
    graphicModal.style.display = "block";
    graphicImgModal.src = graphicImg.src;
    console.log(graphicImg.src);
  }
});

// menu hide

let prevScrollPos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-100px";
  }
  prevScrollPos = currentScrollPos;
};
