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
export const apiURL = 'https://ball-save-server.onrender.com';
// export const apiURL = 'http://localhost:3001' // for local development
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
