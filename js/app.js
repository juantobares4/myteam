// Función para obtener los jugadores del localStorage
const getPlayersFromLocalStorage = () => {
  const jugadoresString = localStorage.getItem('players');
  return jugadoresString ? JSON.parse(jugadoresString) : [];

};

// Función para guardar los jugadores en el localStorage
const savePlayersInLocalStorage = (players) => {
  localStorage.setItem('players', JSON.stringify(players));

};

const addPlayer = async(event) => {
  event.preventDefault();
  
  try{
    let playerName = document.getElementById('playerName').value;
    let playerLastName = document.getElementById('playerLastName').value;
    let playerPosition = document.getElementById('position').value;
    let playerAge = document.getElementById('playerAge').value;
    let playerState;
  
    if(!playerName || !playerLastName || !playerAge || !playerPosition){
      throw new Error('Por favor, completá todos los campos.');

    }

    if(document.getElementById('starter').checked){
      playerState = 'Titular';
      
    }else if(document.getElementById('substitute').checked){
      playerState = 'Suplente';
      
    }

    let player = {
      id: Math.ceil(Math.random() * 1000),
      name: playerName,
      lastName: playerLastName,
      age: playerAge,
      position: playerPosition,
      state: playerState

    }
    
    let players = getPlayersFromLocalStorage();
    let startersPlayers = players.filter(player => player.state === 'Titular').length
    let findPlayer = players.find(player => player.name === playerName && player.lastName === playerLastName);

    if(findPlayer){
      throw new Error('El jugador ya forma parte de tu plantilla.');
  
    }else if(startersPlayers === 11){
      throw new Error('No podés tener más de 11 jugadores titulares en tu plantel');

    }

    players.push(player);
    
    savePlayersInLocalStorage(players);

    await new Promise(resolve => setTimeout(resolve, 500));

    alert('El jugador fue agregado a tu plantilla correctamente ✅');
    
    await playersList();

  }catch(error){
    alert(error);
  
  }

  playerName = document.getElementById('playerName').value = '';
  playerLastName = document.getElementById('playerLastName').value = '';
  playerPosition = document.getElementById('position').value = '';
  playerAge = document.getElementById('playerAge').value = '';


};

// Función asíncrona para listar todos los jugadores del equipo
const playersList = async() => {
  try{
    let team = getPlayersFromLocalStorage();
    let containerTeam = document.getElementById('container-team');
    let image = document.querySelector('.background-image-team'); // QuerySelector nos permite seleccionar por clase.
    
    if(team.length > 0){
      containerTeam.innerHTML = '';

      /* Creamos elementos para la tabla del equipo */
      
      let table = document.createElement('table');
      let tbody = document.createElement('tbody');
    
      containerTeam.style.display = 'block';
    
      if(image !== null){
        image.remove();
  
      }
      
      let elementContainerTitle = document.createElement('h4');
      let title = 'Plantel';
    
      elementContainerTitle.style.fontFamily = 'jacksonville';
      elementContainerTitle.style.padding = '10px'; 
      elementContainerTitle.innerHTML = title;
    
      table.appendChild(elementContainerTitle);
    
      /* Creamos filas de la tabla */
      
      team.forEach(element => {
        let row = document.createElement('tr');
        
        Object.keys(element).forEach(key => {
          if(key !== 'id'){
            let td = document.createElement('td');
            td.style.border = '2px solid black';
            td.style.backgroundColor = 'antiquewhite';
            td.style.padding = '7px';
            td.style.fontFamily = 'Audiowide';
            td.style.fontSize = '13px';
            td.innerHTML = `<i>${element[key]}</i>`;
            row.appendChild(td);
            
          }
  
        });
        
        tbody.appendChild(row);
        
      });
      
      table.appendChild(tbody)
      table.style.boxShadow = '15px 15px 15px 15px rgba(0, 0, 0, 0.3)';
      table.style.backgroundColor = '#439F52';
      containerTeam.appendChild(table);
  
    }else if(team.length === 0){
      containerTeam.innerHTML = '';

      let message = 'No hay jugadores en tu plantilla.';
      let elementMessage = document.createElement('h4');
  
      elementMessage.innerHTML = message;
      elementMessage.style.fontFamily = 'jacksonville';
      
      let urlImage = '/images/undraw_no_data_re_kwbl.svg';

      image = document.createElement('img');
      image.src = urlImage;
      image.className = 'background-image-team';

      console.log(!image);
    
      image.style.width = '70px';
      image.style.height = '70px';
      image.style.padding = '8px';
      
      elementMessage.classList.add('text-center');
      
      containerTeam.appendChild(image);
      containerTeam.appendChild(elementMessage);
  
    }

  }catch(error){
    console.log(error);

  }

};

// Función asíncrona para asignar una nueva posición a un jugador
const completeInformation = async() => {
  let team = getPlayersFromLocalStorage();
  let containerSortTeam = document.getElementById('sort-team');
  
  try{
    if(team.length > 0){
      let goalkeepers = team.filter(player => player.position === 'Arquero');
      let defenders = team.filter(player => player.position === 'Defensor');
      let midfielders = team.filter(player => player.position === 'Mediocampista');
      let forwards = team.filter(player => player.position === 'Delantero');
      let sortTeam = [goalkeepers, defenders, midfielders, forwards];
      
      let sectionTeam = document.getElementById('section-team');
      containerSortTeam.innerHTML = '';
      let table = document.createElement('table');
      let tbody = document.createElement('tbody');
      
      sectionTeam.scrollIntoView({
        behavior: 'smooth'
      }); // Hace un scroll suave a la sección.
      
      sortTeam.forEach(forPositions => {
        for(let player of forPositions){
              let row = document.createElement('tr');
              let td = document.createElement('td');
              td.style.border = '2px solid black';
              td.style.backgroundColor = 'antiquewhite';
              td.style.padding = '7px';
              td.style.fontFamily = 'Audiowide';
              td.style.fontSize = '13px';
              td.innerHTML = `<b>Posición:</b> ${player.position} | <b>Nombre: </b> ${player.name} | <b>Apellido: </b> ${player.lastName} | <b>Edad:</b> ${player.age} | <b>Estado:</b> ${player.state} | <b>Editar posición</b>: <button class='ml-1' onclick='(editPosition(${player.id}))'>Editar</button> | <b>Realizar cambio</b>: <button class='ml-1' onclick='(buttonChangePlayer(${player.id}))'>Cambiar</button>`;
  
              row.appendChild(td);
              tbody.appendChild(row);
  
            }
      
        });
  
      table.appendChild(tbody);
      table.style.boxShadow = '15px 15px 15px 15px rgba(0, 0, 0, 0.3)';
      table.style.backgroundColor = '#439F52';
      table.style.width = '100%'; // Asegura que la tabla ocupe todo el ancho del contenedor
      table.style.marginTop = '20px'; // Agrega espacio encima de la tabla
  
      containerSortTeam.appendChild(table);
  
    }else if(team.length === 0){
      let message = 'No hay jugadores en tu plantilla';
      let elementMessage = document.createElement('h3');
      let image = document.getElementById('data');

      if(image){
        image.remove();

      }

      containerSortTeam.innerHTML = '';
  
      containerSortTeam.scrollIntoView({
        behavior: 'smooth'
      }); // Hace un scroll suave a la sección.
      
      elementMessage.innerHTML = message;
      containerSortTeam.appendChild(elementMessage);
  
    }

  }catch(error){
    console.log(error);

  }

};

const editPosition = async(playerID) => {
  try{
    let team = getPlayersFromLocalStorage();
    let arrayValidPositions = ['Arquero', 'Defensor', 'Mediocampista', 'Delantero'];
    let indexPlayer = team.findIndex(player => player.id === playerID);
    let player = team[indexPlayer];
    let newPosition = prompt(`Nueva posición del jugador ${player.name} ${player.lastName}:`);
    let validate = arrayValidPositions.find(position => position === newPosition) ? true : false;

    if(!newPosition){ // Esta condición evalúa si es falsy. Si lo es, da true.
      throw new Error('Error al cambiar los datos del jugador.');

    }else if(!validate){
      throw new Error('La posición asignada no es válida.');

    }

    player.position = newPosition;

    team[indexPlayer] = player;

    savePlayersInLocalStorage(team);

    await new Promise(resolve => setTimeout(resolve, 500));

    alert('El jugador fue editado correctamente ✅');

    await completeInformation();

  }catch(error){
    alert(error);

  }
  
};

const changePlayer = () => {
  let sectionTeam = document.getElementById('section-team');

  sectionTeam.scrollIntoView({
    behavior: 'smooth'
  }); //

  completeInformation();

}

const buttonChangePlayer = async(playerID) => {
  try{
    let team = getPlayersFromLocalStorage();
    let indexFirstPlayer = team.findIndex(player => player.id === playerID);
    let firstPlayer = team[indexFirstPlayer];
    let nameSecondPlayerToChange = prompt('Ingresá el nombre del jugador a cambiar:');
    let lastNameSecondPlayerToChange = prompt('Ingresá el apellido del jugador a cambiar:');

    if(!nameSecondPlayerToChange || !lastNameSecondPlayerToChange){
      throw new Error('Error al ingresar los datos del jugador.');

    };

    function capitalizeFirstCharacter(word){
      let firstCharacter = word.slice(0, 1).toUpperCase();
      let restOfTheWord = word.slice(1);

      return firstCharacter + restOfTheWord;

    };

    let name = capitalizeFirstCharacter(nameSecondPlayerToChange);
    let lastName = capitalizeFirstCharacter(lastNameSecondPlayerToChange);
    let indexSecondPlayer = team.findIndex(player => player.name === name && player.lastName === lastName);

    if(indexSecondPlayer === -1){
      throw new Error('El jugador que intentás cambiar no forma parte de tu plantel.');

    }

    if(firstPlayer.state === 'Titular'){
      firstPlayer.state = 'Suplente';

    }else{
      firstPlayer.state = 'Titular';

    }

    team[indexFirstPlayer] = firstPlayer;

    let secondPlayer = team[indexSecondPlayer];

    if(secondPlayer.state === 'Titular'){
      secondPlayer.state = 'Suplente';

    }else{
      secondPlayer.state = 'Titular';

    }

    team[indexSecondPlayer] = secondPlayer;

    savePlayersInLocalStorage(team);

    await new Promise(resolve => setTimeout(resolve, 500));

    alert(`Cambio realizado con éxito ✅`);
    
    await completeInformation();

  }catch(error){
    alert(error);

  }

}

const emptyTeam = async() => {
  let team = getPlayersFromLocalStorage();
  let response = confirm('¿Estás seguro que deseas realizar esta acción?');

  if(response){
    try{
      if(team.length === 0){
        throw new Error('Actualmente no tienes jugadores en tu plantel.');
  
      }
    
      new Promise(resolve => setTimeout(resolve, 500));
    
      alert(`Plantel despedido con éxito ✅`);
      
      localStorage.clear();
      window.location.reload(); // Recargar la página para mantener actualizado para vaciar el panel.
  
    }catch(error){
      alert(error);
  
    }

  }

}