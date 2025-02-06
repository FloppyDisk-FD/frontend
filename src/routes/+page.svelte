<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import "../app.css";
  import { PUBLIC_API_URL } from '$env/static/public';

  let periods = [];
  let selectedPeriod = null;
  let animes = [];

  // Ensure PUBLIC_API_URL is correctly set
  const API_URL = PUBLIC_API_URL;// Fallback to local development URL if not set

  console.log('API_URL:', API_URL); // Debugging line to check the value of API_URL

  async function fetchPeriods() {
    try {
      console.log('Fetching periods from:', `${API_URL}/api/periods`); // Debugging line
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
      console.log('Fetching animes from:', `${API_URL}/api/animes/${period}`); // Debugging line
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
  :root {
    --md-sys-color-primary: #64b5f6; /* Sky Blue */
    --md-sys-color-on-primary: #ffffff;
    --md-sys-color-secondary: #03dac6;
    --md-sys-color-on-secondary: #000000;
    --md-sys-color-background: #e3f2fd; /* Lighter Sky Blue Background */
    --md-sys-color-on-background: #121212;
    --md-sys-color-surface: #ffffff;
    --md-sys-color-on-surface: #000000;
    --md-sys-elevation-level-1: 0px 2px 8px rgba(0, 0, 0, 0.1);
    --md-sys-elevation-level-2: 0px 4px 12px rgba(0, 0, 0, 0.15);
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 16px;
  }

  .anime-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 16px;
  }

  .material-card {
    background-color: var(--md-sys-color-surface);
    color: var(--md-sys-color-on-surface);
    border-radius: 16px;
    box-shadow: var(--md-sys-elevation-level-1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    padding: 16px;
    width: calc(50% - 16px);
    text-align: left;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
  }

  .material-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--md-sys-elevation-level-2);
  }

  .anime-poster {
    width: 100px;
    height: 150px;
    object-fit: cover;
    margin-right: 16px;
    border-radius: 8px;
  }

  .anime-details {
    flex-grow: 1;
  }

  .anime-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .air-day {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 12px;
  }
</style>

<div class="container mx-auto p-4 bg-gray-100">
  <div class="card-container">
    {#each periods as period}
      <div 
        class="material-card"
        on:click={() => handleCardClick(period)}
      >
        {period}
      </div>
    {/each}
  </div>

  {#if selectedPeriod}
    <h2 class="mt-8 text-2xl font-bold">Animes in {selectedPeriod}</h2>
    {#if animes.length === 0}
      <p>No animes found for this period.</p>
    {:else}
      <div class="anime-card-container">
        {#each animes as anime}
          <div class="material-card" on:click={() => goto(`/anime/${anime.id}`)} style="position: relative;">
            <img src={anime.poster_url} referrerpolicy="no-referrer" alt={`${anime.title} poster`} class="anime-poster" />
            <div class="anime-details">
              <h3 class="anime-title">{anime.title}</h3>
              <p><strong>分类:</strong> {anime.genre}</p>
              <p><strong>Production Info:</strong> {anime.production_info}</p>
              <p><strong>类型:</strong> {anime.type}</p>
            </div>
            <div class="air-day">{anime.air_day}</div>
          </div>
        {/each}
      </div>
    {/if}
  {:else}
    <p>Select a period to view animes.</p>
  {/if}
</div>



