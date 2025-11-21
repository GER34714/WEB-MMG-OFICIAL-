// Partículas fondo
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

// Cargar artistas
fetch("artistas.json")
.then(res => res.json())
.then(artistas => {
  const grid = document.getElementById("artistas-grid");
  artistas.forEach(a=>{
    const card = document.createElement("div");
    card.className = "card-artista";
    card.innerHTML = `
      <img src="${a.img || ''}">
      <h3>${a.nombre}</h3>
      <p>${a.descripcion}</p>
    `;
    grid.appendChild(card);
  });
});

// Cargar galería de fotos
fetch("galeria.json")
.then(res => res.json())
.then(fotos => {
  const grid = document.getElementById("galeria-grid");
  fotos.forEach(img=>{
    const foto = document.createElement("img");
    foto.src = img;
    grid.appendChild(foto);
  });
});
