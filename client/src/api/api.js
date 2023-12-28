export async function fetchMachines() {
  try {
    const pinMachines = await fetch(
      'https://pinballmap.com/api/v1/machines.json'
    );
    const result = await pinMachines.json();
    return result;
  } catch (error) {
    console.error(error);
  }
  return { machines: [] };
}
const deployedServer = 'https://ball-save-server.onrender.com';
const localServer = 'http://localhost:3001';
export const apiURL =
  process.env.NODE_ENV === 'development' ? localServer : deployedServer;

export async function fetchScores(email) {
  try {
    const scores = await fetch(`${apiURL}/scores/${email}`);
    const result = await scores.json();
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addUser(event) {
  try {
    const user = await fetch(apiURL + '/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    const result = await user.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addScore(event) {
  try {
    const score = await fetch(apiURL + '/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    const result = await score.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
