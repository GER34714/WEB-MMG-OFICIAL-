// ================= ARTISTAS ==================
fetch("artistas.json")
  .then(res => res.json())
  .then(lista => {
    const cont = document.getElementById("contenedor-artistas");

    cont.innerHTML = lista.map(art => `
      <div class="card-artista">
        <img src="${art.img || 'https://iili.io/H59TYva.png'}">
        <h3>${art.nombre}</h3>
        <p>${art.descripcion}</p>
        <a class="btn-contratar" href="https://wa.me/1138120000?text=Quiero contratar a ${encodeURIComponent(art.nombre)}">
          Contratar Artista
        </a>
      </div>
    `).join("");
  });

// ================= GALERÍA ==================
fetch("galeria.json")
  .then(res => res.json())
  .then(fotos => {

    const b1 = fotos.slice(0, 30);
    const b2 = fotos.slice(30, 60);
    const b3 = fotos.slice(60, 90);
    const b4 = fotos.slice(90);

    renderG("galeria1", b1);
    renderG("galeria2", b2);
    renderG("galeria3", b3);
    renderG("galeria4", b4);
  });

function renderG(id, arr){
  document.getElementById(id).innerHTML =
    arr.map(f => `<img src="${f}" loading="lazy">`).join("");
}
