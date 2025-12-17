// script.js

// Partículas
particlesJS('particles-js', {
  particles:{
    number:{value:70},
    color:{value:["#d4af37","#b97cff"]},
    opacity:{value:0.5,random:true},
    size:{value:3,random:true},
    move:{enable:true,speed:1.4},
    line_linked:{enable:false}
  }
});

// ÚLTIMAS FOTOS (muestra 6) + las restantes (3) van a la galería
const ULTIMAS_FOTOS = [
  "https://iili.io/fcjuI9a.jpg",
  "https://iili.io/fcjux8g.jpg",
  "https://iili.io/fcjunF1.jpg",
  "https://iili.io/fcjuocF.jpg",
  "https://iili.io/fcju7MN.jpg",
  "https://iili.io/fcjuYPI.jpg",
  "https://iili.io/fcjulcX.jpg",
  "https://iili.io/fcju0Sn.jpg",
  "https://iili.io/fcjuGAG.jpg"
];

function renderUltimasFotos(){
  const cont = document.getElementById("ultimas-fotos-container");
  if(!cont) return;

  cont.innerHTML = "";
  ULTIMAS_FOTOS.slice(0, 6).forEach(link => {
    const img = document.createElement("img");
    img.src = link;
    cont.appendChild(img);
  });
}

renderUltimasFotos();

// CONTRATAR
function contratar(nombre){
  const numero = "5491157343551";
  const mensaje = encodeURIComponent(`Hola 👋, quiero contratar a ${nombre} (MMG | Representante de Artistas).`);
  window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
}

// ARTISTAS (Destacados separados del catálogo general)
function normName(s){
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const DESTACADOS = new Set([
  "dami levante",
  "delro",
  "los creadores",
  "dario el angel del amor",
  "axel flp",
  "kevin quiroz",
  "franco flow 999",
  "franco flou 999",
  "tomy lp"
].map(normName));

fetch("artistas.json")
.then(r => r.json())
.then(lista => {
  const container = document.getElementById("artistas-container");
  const destacadosContainer = document.getElementById("destacados-container");

  lista.forEach(a => {
    const foto = a.img && a.img.length > 5 ? a.img : "https://iili.io/KtXqRHJ.md.png";

    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
      <div class="card-artista">
        <img src="${foto}">
        <h3>${a.nombre}</h3>
        <p>${a.descripcion}</p>
        <button class="btn-contratar" onclick="contratar('${a.nombre}')">🎤 Contratar Artista</button>
      </div>
    `;

    const key = normName(a.nombre);
    if (DESTACADOS.has(key) && destacadosContainer) {
      destacadosContainer.appendChild(slide);
    } else {
      container.appendChild(slide);
    }
  });

  if (destacadosContainer && destacadosContainer.children.length) {
    new Swiper('.destacados-swiper', {
      slidesPerView: 2,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 3200 },
      pagination: { el: '.destacados-pagination', clickable: true },
      breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  new Swiper('.artistas-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 3500 },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
});

// GALERÍA (las 3 restantes de últimas fotos se suman acá, sin tocar galeria.json)
fetch("galeria.json")
.then(r => r.json())
.then(fotos => {

  const galeria = document.getElementById("galeria-extras");
  const btnMas = document.getElementById("btn-ver-mas");
  const btnMenos = document.getElementById("btn-ver-menos");

  const resto = ULTIMAS_FOTOS.slice(6);

  const fotosRender = [];
  const seen = new Set();
  for (const link of [...resto, ...fotos]) {
    if (!link || typeof link !== "string") continue;
    if (ULTIMAS_FOTOS.slice(0,6).includes(link)) continue;
    if (seen.has(link)) continue;
    seen.add(link);
    fotosRender.push(link);
  }

  let cantidad = 20;

  function render(){
    galeria.innerHTML = "";

    fotosRender.slice(0, cantidad).forEach(link => {
      const img = document.createElement("img");
      img.src = link;
      galeria.appendChild(img);
    });

    btnMenos.style.display = cantidad > 20 ? "block" : "none";
    btnMas.style.display = cantidad >= fotosRender.length ? "none" : "block";
  }

  btnMas.addEventListener("click", () => {
    cantidad += 20;
    render();
  });

  btnMenos.addEventListener("click", () => {
    cantidad = 20;
    render();
    window.location.hash = "#galeria";
  });

  render();
});