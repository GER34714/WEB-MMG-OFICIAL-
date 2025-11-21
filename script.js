// Fondo partículas
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

// ===================== ARTISTAS (CARRUSEL) =====================
fetch("artistas.json")
.then(r => r.json())
.then(lista => {

  const container = document.getElementById("artistas-container");

  lista.forEach(a => {

    // Si no tiene imagen → usar logo MMG
    const foto = (a.img && a.img.length > 5)
      ? a.img
      : "https://iili.io/KtXqRHJ.md.png";

    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
      <div class="card-artista">
        <img src="${foto}">
        <h3>${a.nombre}</h3>
        <p>${a.descripcion}</p>
      </div>
    `;

    container.appendChild(slide);
  });

  // Inicializar Swiper
  new Swiper('.artistas-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 4000 },
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

// ===================== GALERÍA EXTRA (SOLO FOTOS) =====================
fetch("galeria.json")
.then(r => r.json())
.then(fotos => {

  const galeriaExtras = document.getElementById("galeria-extras");

  fotos.forEach(link => {
    const img = document.createElement("img");
    img.src = link;
    galeriaExtras.appendChild(img);
  });

});
