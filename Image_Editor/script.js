// var c = document.querySelector(".chacha");
// var ctx = c.getContext("2d");

// let img = new Image();
// img.src = "https://images.pexels.com/photos/30864661/pexels-photo-30864661.jpeg";
// img.setAttribute("width" , "500");
// img.setAttribute("height" , "500");
// // console.log(img.width);

// c.setAttribute("width" , "500");
// c.setAttribute("height" , "500");
// ctx.drawImage(img, 0, 0, 500, 500);

let selecImg = document.querySelector(".image-in");
var c = document.querySelector(".draw-image");
var ctx = c.getContext("2d");
let img = new Image();
let url;
let file;

let filters = {
  brightness: { value: 100, min: 0, max: 200, unit: "%" },
  contrast: { value: 100, min: 0, max: 200, unit: "%" },
  saturate: { value: 100, min: 0, max: 200, unit: "%" }, // FIXED
  "hue-rotate": { value: 0, min: 0, max: 200, unit: "deg" }, // FIXED
  blur: { value: 0, min: 0, max: 20, unit: "px" },
  grayscale: { value: 0, min: 0, max: 200, unit: "%" },
  sepia: { value: 0, min: 0, max: 200, unit: "%" },
  opacity: { value: 100, min: 0, max: 100, unit: "%" },
  invert: { value: 0, min: 0, max: 200, unit: "%" },
};

let presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  warm: {
    brightness: 110,
    contrast: 105,
    saturate: 120,
    "hue-rotate": 10,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  cinematic: {
    brightness: 95,
    contrast: 120,
    saturate: 90,
    "hue-rotate": -10,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  bw: {
    brightness: 100,
    contrast: 110,
    saturate: 0,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 105,
    contrast: 95,
    saturate: 80,
    "hue-rotate": 5,
    blur: 0,
    grayscale: 20,
    sepia: 40,
    opacity: 100,
    invert: 0,
  }
};


function drawImage() {
  const canvasWidth = c.width;
  const canvasHeight = c.height;

  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);

  const newWidth = imgWidth * scale;
  const newHeight = imgHeight * scale;

  const x = (canvasWidth - newWidth) / 2;
  const y = (canvasHeight - newHeight) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.drawImage(img, x, y, newWidth, newHeight);

  c.style.display = "block";
}

function applyFilters() {
  let filterString = Object.keys(filters)
    .map((key) => `${key}(${filters[key].value}${filters[key].unit})`)
    .join(" ");

  ctx.filter = filterString;
}

function createFilter(name, value, min, max, unit) {
  let filterCategory = document.querySelector(".filter-category");
  let filterDiv = document.createElement("div");
  filterDiv.classList.add("filter");

  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "range");
  inputElement.setAttribute("id", name);
  inputElement.setAttribute("name", name);
  inputElement.setAttribute("value", value);
  inputElement.setAttribute("min", min);
  inputElement.setAttribute("max", max);

  inputElement.addEventListener("input", function (e) {
    filters[name].value = e.target.value;

    applyFilters();
    drawImage();
  });

  const labelElement = document.createElement("label");
  labelElement.innerHTML = name;
  labelElement.setAttribute("for", name);

  filterDiv.appendChild(labelElement);
  filterDiv.appendChild(inputElement);
  filterCategory.appendChild(filterDiv);
}

Object.keys(filters).forEach((element) => {
  createFilter(
    element,
    filters[element].value,
    filters[element].min,
    filters[element].max,
    filters[element].unit
  );
});

selecImg.addEventListener("change", () => {
  document.querySelector(".fa-solid").style.display = "none";
  document.querySelector(".no-image").style.display = "none";
  file = selecImg.files[0];

  if (!file) return;

  url = URL.createObjectURL(file);
  img.src = url;

  img.onload = function () {
    c.width = 800;
    c.height = 480;

    applyFilters();
    drawImage();
  };
});

document.querySelector(".reset").addEventListener("click", function () {

  // Reset filter values in original object
  Object.keys(filters).forEach(key => {
    filters[key].value = 
      key === "blur" ? 0 :
      key === "grayscale" ? 0 :
      key === "sepia" ? 0 :
      key === "invert" ? 0 :
      key === "hue-rotate" ? 0 :
      key === "opacity" ? 100 :
      100;

    // Reset slider UI
    document.getElementById(key).value = filters[key].value;
  });

  applyFilters();
  drawImage();
});

document.querySelector(".download").addEventListener("click", function () {

  if (!img.src) return;

  const link = document.createElement("a");

  link.download = "edited-image.png";
  link.href = c.toDataURL("image/png");

  link.click();
});


document.querySelectorAll(".presets button").forEach(button => {
  button.addEventListener("click", function () {

    const presetName = this.dataset.preset;
    const presetValues = presets[presetName];

    Object.keys(presetValues).forEach(key => {
      filters[key].value = presetValues[key];

      // Update slider UI
      document.getElementById(key).value = presetValues[key];
    });

    applyFilters();
    drawImage();
  });
});
