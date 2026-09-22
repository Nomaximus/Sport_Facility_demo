const supabaseUrl = 'https://eousqhbbmyoyijvyytra.supabase.co';
// 1) Open Supabase Dashboard -> Settings -> API
// 2) Copy the project public anon key
// 3) Paste it below without quotes or extra spaces
const supabaseKey = 'sb_publishable_vC9g5Y12r22HY0Xcpaqg2w_K2BCXety';

const statusEl = document.getElementById('status');
const listEl = document.getElementById('facility-list');

async function loadFacilities() {
  try {
    statusEl.textContent = 'Loading facilities...';
    const response = await fetch(`${supabaseUrl}/rest/v1/facilities?select=*`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    });

    if (!response.ok) {
      throw new Error('Supabase request failed');
    }

    const facilities = await response.json();

    if (!Array.isArray(facilities) || facilities.length === 0) {
      listEl.innerHTML = '<div class="facility-card"><p>No facilities found.</p></div>';
      statusEl.textContent = 'No data';
      return;
    }

    listEl.innerHTML = facilities.map((facility) => `
      <article class="facility-card">
        <h4>${facility.name || 'Facility'}</h4>
        <p>${facility.description || 'No description available.'}</p>
        <span class="facility-meta">${facility.status || 'Available'}</span>
      </article>
    `).join('');

    statusEl.textContent = `${facilities.length} facilities loaded`;
  } catch (error) {
    console.error(error);
    listEl.innerHTML = '<div class="facility-card"><p>Unable to load facilities from Supabase.</p></div>';
    statusEl.textContent = 'Connection issue';
  }
}

loadFacilities();
