<script>
  import { onMount } from 'svelte';
  let periods = [];
  let selectedPeriod = null;
  let animes = [];

  const API_URL = import.meta.env.PUBLIC_API_URL;

  async function fetchPeriods() {
    const response = await fetch(`${API_URL}/api/periods`);
    return response.json();
  }

  async function fetchAnimes(period) {
    const response = await fetch(`${API_URL}/api/animes/${period}`);
    return response.json();
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



