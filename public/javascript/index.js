const charactersAPI = new APIHandler('http://localhost:8000');
const charContainer = document.getElementsByClassName("characters-container")[0]
const deleteButton = document.getElementById('delete-one')
const editButton = document.getElementById('edit-btn')
const newButton = document.getElementById('new-btn')

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    event.preventDefault()
    charactersAPI.getFullList()
      .then((response) => {
          charContainer.innerHTML = "";
          response.data.forEach((character) => {
            charContainer.innerHTML += `
            <div class="character-info">
              <div class="id">Id: ${character.id}</div>
              <div class="name">Character Name: ${character.name}</div>
              <div class="occupation">Character Occupation: ${character.occupation}</div>
              <div class="cartoon">Is a Cartoon? ${character.cartoon}</div>
              <div class="weapon">Character Weapon: ${character.weapon}</div>
            </div>`;
        })
      })
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    event.preventDefault()
    const characterId = document.getElementById('fetch-one-input').value
    charactersAPI.getOneRegister(characterId)
      .then((response) => {
        charContainer.innerHTML = "";
        charContainer.innerHTML += `
            <div class="character-info">
              <div class="id">Id: ${response.data.id}</div>
              <div class="name">Character Name: ${response.data.name}</div>
              <div class="occupation">Character Occupation: ${response.data.occupation}</div>
              <div class="cartoon">Is a Cartoon? ${response.data.cartoon}</div>
              <div class="weapon">Character Weapon: ${response.data.weapon}</div>
            </div>`;
      })
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault()
    const characterId = document.getElementById('delete-one-input').value
    charactersAPI.deleteOneRegister(characterId)
      .then((response) => {
        deleteButton.style.backgroundColor = "green"
      })
      .catch((error) => {
        deleteButton.style.backgroundColor = "red"
        })
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const characterId = document.getElementById('edit-id').value
    const characterInfo = {
      name: document.getElementById("edit-name").value,
      occupation: document.getElementById("edit-occupation").value,
      weapon: document.getElementById("edit-weapon").value,
      cartoon: document.getElementById("edit-cartoon").checked,
    };
    charactersAPI.updateOneRegister(characterId, characterInfo)
    .then((response) => {
      editButton.style.backgroundColor = "green"
    })
    .catch((error) => {
      editButton.style.backgroundColor = "red"
      })
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const characterInfo = {
      name: document.getElementById("new-name").value,
      occupation: document.getElementById("new-occupation").value,
      weapon: document.getElementById("new-weapon").value,
      cartoon: document.getElementById("new-cartoon").checked,
    };
    charactersAPI.createOneRegister(characterInfo)
    .then((response) => {
      newButton.style.backgroundColor = "green"
    })
    .catch((error) => {
      newButton.style.backgroundColor = "red"
      })
  });
});
