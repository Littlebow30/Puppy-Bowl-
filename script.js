const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');
const playerTable = document.getElementById('table');
const tableBody = document.getElementById('tableBody');


const cohortName = '2306-ftb-mt-web-pt';
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    const playersURL = `${APIURL}/players`
    let puppies = "";
    try {
        const response = await fetch(playersURL);
        const result = await response.json();
        const players = result.data.players
        console.log('players', players)

        return players
    }
    catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
    

};



const fetchSinglePlayer = async (playerId) => {
    const playersURL = `${APIURL}/players`
    try {
        const response = await fetch(playersURL);
        const result = await response.json();
        const players = result.data.players
        const singlePlayer = players.map((players) => {
            return tableBody.innerText += players.name
        })
        console.log('single player', singlePlayer)
        
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};



const addNewPlayer = async (playerObj) => {
    const playersURL = `${APIURL}/players`
    try { 
        const response = await fetch(playersURL,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                playerObj,
              }),
            }
          );

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
    };

const removePlayer = async (playerId) => {
    const playersURL = `${APIURL}/players`
    try {
        const response = await fetch(playersURL, {
            method: 'Delete',
        }
        );
        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
    } ;

/**
 * (done)
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * (Done)
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    let puppies ='';
    
    try {
        const allPlayers = playerList.map((values) => {
            const tableRow  = document.createElement('tr')
            tableRow.innerHTML = `<td> <button id="btn">${values.name}</button> </td>
            <td>${values.breed}</td>
            <td><img src="${values.imageUrl}" alt="${values.id}"></td>`;

            tableBody.appendChild(tableRow)  
        });
    }
        // const clickButton = getElementById('btn').addEventListener('click', 
        // 
        
    catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {

    try {
        newPlayerFormContainer.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);

            addNewPlayer();
        })
        
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();