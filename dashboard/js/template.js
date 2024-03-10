if (typeof jQuery === "undefined") {
  throw new Error("jQuery plugins need to be before this file");
}

$(function () {
  "use strict";

  //   main sidebar toggle js
  $(".menu-toggle").on("click", function () {
    $(".sidebar").toggleClass("open");
    $(".open").removeClass("sidebar-mini");
  });

  //   layout a sidebar mini version
  $(".sidebar-mini-btn").on("click", function () {
    $(".sidebar").toggleClass("sidebar-mini");
    $(".sidebar-mini").removeClass("open");
  });

  // chat page chatlist toggle js
  $(".chatlist-toggle").on("click", function () {
    $(".card-chat").toggleClass("open");
  });

  $(".theme-rtl input").on("change", function () {
    if (this.checked) {
      $("body").addClass("rtl_mode");
    } else {
      $("body").removeClass("rtl_mode");
    }
  });

  //   $(document).on("click", function (e) {
  //     if (!$(e.target).closest(".sidebar").length) {
  //       // Clicked outside of the sidebar
  //       $(".sidebar").removeClass("open");
  //       $(".sidebar-mini").removeClass("open");
  //     }
  //   });

  // cSidebar overflow daynamic height

  overFlowDynamic();

  $(window).resize(function () {
    overFlowDynamic();
  });

  function overFlowDynamic() {
    var sideheight = $(".sidebar.sidebar-mini").height() + 48;

    if (sideheight <= 760) {
      $(".sidebar.sidebar-mini").css("overflow", "scroll");
    } else {
      $(".sidebar.sidebar-mini").css("overflow", "visible");
    }
  }

  // Dropdown scroll hide using table responsive

  $(".table-responsive").on("show.bs.dropdown", function () {
    $(".table-responsive").css("overflow", "inherit");
  });

  $(".table-responsive").on("hide.bs.dropdown", function () {
    $(".table-responsive").css("overflow", "auto");
  });

  // light and dark theme setting js
  var toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  var toggleHcSwitch = document.querySelector('.theme-high-contrast input[type="checkbox"]');
  var currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
    if (currentTheme === "high-contrast") {
      toggleHcSwitch.checked = true;
      toggleSwitch.checked = false;
    }
  }
  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      $('.theme-high-contrast input[type="checkbox"]').prop("checked", false);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }
  toggleSwitch.addEventListener("change", switchTheme, false);
  // end
});

// live support team js
var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/6051a040f7ce18270930e55a/1f3d4os21";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();

function activate() {
  document.head.insertAdjacentHTML(
    "beforeend",
    `
		<style>
			.time-picker__select {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				outline: none;
				text-align: center;
				border: 1px solid #dddddd;
				border-radius: 6px;
				padding: 6px 10px;
				background: #ffffff;
				cursor: pointer;
				font-family: 'Heebo', sans-serif;
			}
		</style>
	`
  );

  document.querySelectorAll(".time-pickable").forEach((timePickable) => {
    let activePicker = null;

    timePickable.addEventListener("focus", () => {
      if (activePicker) return;

      activePicker = show(timePickable);

      const onClickAway = ({ target }) => {
        if (target === activePicker || target === timePickable || activePicker.contains(target)) {
          return;
        }

        document.removeEventListener("mousedown", onClickAway);
        document.getElementById("time-picker").removeChild(activePicker);
        activePicker = null;
      };

      document.addEventListener("mousedown", onClickAway);
    });
  });
}

function show(timePickable) {
  const picker = buildPicker(timePickable);
  picker.className = "inner-time-picker";
  const { bottom: top, left } = timePickable.getBoundingClientRect();

  picker.style.top = `${66}px`;
  picker.style.left = `${371}px`;

  document.getElementById("time-picker").appendChild(picker);

  return picker;
}

function buildPicker(timePickable) {
  const picker = document.createElement("div");
  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(numberToOption);
  const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(numberToOption);

  picker.classList.add("time-picker");
  picker.innerHTML = `
		<select class="time-picker__select">
			${hourOptions.join("")}
		</select>
		:
		<select class="time-picker__select">
			${minuteOptions.join("")}
		</select>
		<select class="time-picker__select">
			<option value="am">am</option>
			<option value="pm">pm</option>
		</select>
	`;

  const selects = getSelectsFromPicker(picker);

  selects.hour.addEventListener(
    "change",
    () => (timePickable.value = getTimeStringFromPicker(picker))
  );
  selects.minute.addEventListener(
    "change",
    () => (timePickable.value = getTimeStringFromPicker(picker))
  );
  selects.meridiem.addEventListener(
    "change",
    () => (timePickable.value = getTimeStringFromPicker(picker))
  );

  if (timePickable.value) {
    const { hour, minute, meridiem } = getTimePartsFromPickable(timePickable);

    selects.hour.value = hour;
    selects.minute.value = minute;
    selects.meridiem.value = meridiem;
  }

  return picker;
}

function getTimePartsFromPickable(timePickable) {
  const pattern = /^(\d+):(\d+) (am|pm)$/;
  const [hour, minute, meridiem] = Array.from(timePickable.value.match(pattern)).splice(1);

  return {
    hour,
    minute,
    meridiem,
  };
}

function getSelectsFromPicker(timePicker) {
  const [hour, minute, meridiem] = timePicker.querySelectorAll(".time-picker__select");

  return {
    hour,
    minute,
    meridiem,
  };
}

function getTimeStringFromPicker(timePicker) {
  const selects = getSelectsFromPicker(timePicker);

  return `${selects.hour.value}:${selects.minute.value} ${selects.meridiem.value}`;
}

function numberToOption(number) {
  const padded = number.toString().padStart(2, "0");

  return `<option value="${padded}">${padded}</option>`;
}

activate();

const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach((option) => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtn_text.innerText = selectedOption;

    optionMenu.classList.remove("active");
  });
});

// 
let selectContainer = document.querySelector(".select-container");
let select = document.querySelector(".select");
let input = document.getElementById("input");
let options1 = document.querySelectorAll(".select-container .option");

select.onclick = () => {
  selectContainer.classList.toggle("active");
};

options1.forEach((e) => {
  e.addEventListener("click", () => {
    input.value = e.innerText;
    selectContainer.classList.remove("active");
    options1.forEach((e) => {
      e.classList.remove("selected");
    });
    e.classList.add("selected");
  });
});



// 

var editor1 = new RichTextEditor("#div_editor1");