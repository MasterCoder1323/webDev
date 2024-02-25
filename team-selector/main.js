const players = [];
const teams = [];

function addPlayer() {
	const name = document.getElementById('name').value;
	const skillLevel = parseInt(document.getElementById('skill-level').value);

	// Validate input
	if (!name || isNaN(skillLevel)) {
		alert("Please enter a valid name and skill level.");
		return;
	}

	players.push([name, skillLevel]);
	displayPlayers();
}

function displayPlayers() {
	const html = players.map(player => {
		return `<br><br><button class="btn btn-danger" onclick="removePlayer(${players.indexOf(player)})">${player[0]} - ${player[1]}</button>`;
	}).join('');

	document.getElementById('players').innerHTML = html;
}

function removePlayer(index) {
	players.splice(index, 1);
	displayPlayers();
}

function generateTeams(numTeams) {
	if (isNaN(numTeams) || numTeams < 1 || numTeams > 10) {
		alert("Please enter a valid number of teams (between 1 and 10).");
		return;
	}

	// Team generation logic
	const totalSkill = players.reduce((acc, player) => acc + player[1], 0);
	const targetSkillPerTeam = Math.floor(totalSkill / numTeams);

	teams.length = 0; // Clear existing teams before generating new ones
	for (let i = 0; i < numTeams; i++) {
		teams.push([]);
	}

	const teamSkills = [];
	for (let i = 0; i < numTeams; i++) {
		teamSkills.push(0);
	}

	players.sort((a, b) => b[1] - a[1]); // Sort players by skill level (descending)

	let teamIndex = 0;
	for (const player of players) {
		const minSkillTeamIndex = teamSkills.indexOf(Math.min(...teamSkills));

		teams[minSkillTeamIndex].push(player);
		teamSkills[minSkillTeamIndex] += player[1];

		teamIndex = (teamIndex + 1) % numTeams;
	}
	// Display generated teams in the "teams" div
	teamNum = 0;
	const teamsHtml = teams.map(team => {
		teamNum++;
		return `<h2>Team ${teamNum}</h2><ul>${team.map(player => `<li>${player[0]} (${player[1]})</li>`).join('')}</ul>`;
	}).join('');

	document.getElementById('teams').innerHTML = teamsHtml;
}
