document.getElementById('result-count').textContent = '';
document.getElementById('error-msg').style.display = 'none';
document.getElementById('spin').style.display = 'none';

const searchTeam = () => {
    const searchText = document.getElementById('searchText');
    const text = searchText.value;
    searchText.value = '';
    if (text == '') {
        displayError();

    }
    else {
        document.getElementById('result-count').textContent = '';
        document.getElementById('error-msg').style.display = 'none';
        document.getElementById('spin').style.display = 'block';

        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${text}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data.teams));
    }
}
const displayError = () => {
    document.getElementById('result-count').textContent = '';
    document.getElementById('error-msg').style.display = 'block';
    document.getElementById('spin').style.display = 'none';
    document.getElementById('search-result').textContent = "";
}

const displayResult = teams => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (teams == null) {
        displayError();
    }

    else {
        document.getElementById('spin').style.display = 'none';

        document.getElementById('result-count').innerText = `Total Found ${teams.length}`;
        teams.forEach(team => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 border-3 border-danger w-75">
                    <img src="${team.strTeamLogo}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${team.strTeam}</h5>
                        <p class="card-text">${team.strLeague}
                        </p>
                        <p class="card-text">${team.strStadiumLocation}
                        </p>
                    </div>
                    <div  class="card-footer fw-400 text-warning"> <button onclick = loadTeamDetails('${team.idTeam}') class="btn bg-warning fw-400 text-white" type="button"
                    id="button-addon2">Load Details</button>
    </div>
                </div>
        `;
            searchResult.appendChild(div)
        })
    }
}

const loadTeamDetails = teamId => {
    console.log(teamId)
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showTeamDetails(data.teams[0]));
}



const showTeamDetails = team => {
    console.log(team);
    const detailsDiv = document.getElementById('detail');
    detailsDiv.textContent = "";
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card">
      <img src="${team.strStadiumThumb}" class="card-img-top" alt="">
      <div class="card-body ">
        <h5 class="card-title">${team.strLeague}</h5>
        <h5 class="card-title">${team.strCountry}</h5>
        <p class="card-text">${team.strLeague}</p>
         <p class="card-text">${team.strStadiumLocation}</p>
        <p class="card-text">${team.strDescriptionEN.slice(0, 150)}</p>
        <a href="${team.strYoutube}" class="btn btn-warning">Go Youtube</a>
      </div>
    </div>
        `
    detailsDiv.appendChild(div);
}