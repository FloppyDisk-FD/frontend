<script>
  import { onMount } from 'svelte';
  import { PUBLIC_API_URL } from '$env/static/public';
  let periods = [];
  let selectedPeriod = null;
  let animes = [];

  // Ensure PUBLIC_API_URL is correctly set
  const API_URL = PUBLIC_API_URL || 'http://localhost:3000'; // Fallback to local development URL if not set

  console.log('API_URL:', API_URL); // Debugging line to check the value of API_URL

  async function fetchPeriods() {
    try {
      const response = await fetch(`${API_URL}/api/periods`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching periods:', error);
      return [];
    }
  }

  async function fetchAnimes(period) {
    try {
      const response = await fetch(`${API_URL}/api/animes/${period}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching animes:', error);
      return [];
    }
  }

  onMount(async () => {
    periods = await fetchPeriods();
  });

  async function handleCardClick(period) {
    selectedPeriod = period;
    animes = await fetchAnimes(period);
  }
</script>

<style>
  .card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 8px;
    display: inline-block;
    width: 150px;
    text-align: center;
    cursor: pointer;
  }
  .anime-card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 8px;
    display: flex;
    align-items: center;
  }
  .anime-poster {
    width: 100px;
    height: 150px;
    object-fit: cover;
    margin-right: 16px;
  }
</style>

<div>
  {#each periods as period}
    <div class="card" on:click={() => handleCardClick(period)}>
      {period}
    </div>
  {/each}

  {#if selectedPeriod}
    <h2>Animes in {selectedPeriod}</h2>
    {#if animes.length === 0}
      <p>No animes found for this period.</p>
    {:else}
      {#each animes as anime}
        <div class="anime-card">
          <img src={anime.poster_url} alt={`${anime.title} poster`} class="anime-poster" />
          <div>
            <h3>{anime.title}</h3>
            <p><strong>Genre:</strong> {anime.genre}</p>
            <p><strong>Production Info:</strong> {anime.production_info}</p>
          </div>
        </div>
      {/each}
    {/if}
  {/if}
</div>



