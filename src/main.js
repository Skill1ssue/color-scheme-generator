import './style.css'


document.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const color = formData.get('color').slice(1, 7);
  const colorScheme = formData.get('color-scheme')

  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorScheme}&count=5`)
    .then(res => res.json())
    .then(data => {
      const colorBoxes = document.querySelectorAll('.color')
      const nameBoxes = document.querySelectorAll('.name-container span')
      colorBoxes.forEach((colorBox, index) => {
        colorBox.style.backgroundColor = data.colors[index].hex.value
      })
      nameBoxes.forEach((nameBox, index) => {
        nameBox.textContent = data.colors[index].hex.value
      })

    })

})

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('name')) {
    navigator.clipboard.writeText(e.target.textContent)
    alert('Copied to clipboard')
  }
})

document.querySelector('#app').innerHTML = `
 <div class="main-container">
  <form>
    <input type="color" id="color" name="color" aria-label="Color"/>
    <select id="color-scheme" name="color-scheme">
      <option value="monochrome" selected>Monochrome</option>
      <option value="monochrome-dark">Monochrome Dark</option>
      <option value="monochrome-light">Monochrome Light</option>
      <option value="analogic">Analogic</option>
      <option value="complement">Complement</option>
      <option value="analogic-complement">Analogic Complement</option>
      <option value="triad">Triad</option>
    </select>
    <button type="submit">Get color scheme</button>
  </form>
  <div class="color-container">
    <div class="single-color">
      <div class="color color1"></div>
    </div>
    <div class="single-color">
      <div class="color color2"></div>
    </div>
    <div class="single-color">
      <div class="color color3"></div>
    </div>
    <div class="single-color">
      <div class="color color4"></div>
    </div>
    <div class="single-color">
      <div class="color color5"></div>
    </div>
  </div>
  <div class="name-container">
    <span class="name">#F55A5A</span>
    <span class="name">#2B283A</span>
    <span class="name">#FBF3AB</span>
    <span class="name">#AAD1B6</span>
    <span class="name">#A626D3</span>
  </div>
 </div>
`

