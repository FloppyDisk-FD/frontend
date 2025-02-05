<script>
  import { page } from '$app/stores';
  import { onDestroy } from 'svelte';
  import { onMount } from 'svelte';
  import { PUBLIC_API_URL } from '$env/static/public';

  let anime = null;

  // Ensure PUBLIC_API_URL is correctly set
  const API_URL = PUBLIC_API_URL || 'http://localhost:3000'; // Fallback to local development URL if not set

  console.log('API_URL:', API_URL); // Debugging line to check the value of API_URL

  async function fetchAnimeById(id) {
    try {
      console.log('Fetching anime details for ID:', id); // Debugging line
      const response = await fetch(`${API_URL}/api/animes/id/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching anime details:', error);
      return null;
    }
  }

  let unsubscribe = null;

  onMount(() => {
    unsubscribe = page.subscribe(({ params }) => {
      const animeId = params.id;
      fetchAnimeById(animeId).then(data => {
        anime = data;
      });
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
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

  .detail-container {
    background-color: var(--md-sys-color-surface);
    color: var(--md-sys-color-on-surface);
    border-radius: 16px;
    box-shadow: var(--md-sys-elevation-level-1);
    padding: 16px;
    margin: 16px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .anime-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 16px;
    color: var(--md-sys-color-primary);
  }

  .anime-poster {
    width: 300px; /* Adjusted width */
    height: auto;
    object-fit: cover;
    margin-bottom: 16px;
    border-radius: 8px;
  }

  .anime-info {
    margin-bottom: 16px;
  }

  .anime-description {
    margin-bottom: 16px;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 8px;
  }
</style>

{#if anime}
  <div class="detail-container">
    <h1 class="anime-title">{anime.title}</h1>
    <img src={anime.poster_url} referrerpolicy="no-referrer" alt={`${anime.title} poster`} class="anime-poster" />
    <div class="anime-info">
      <p><strong>Genre:</strong> {anime.genre}</p>
      <p><strong>Production Info:</strong> {anime.production_info}</p>
      <p><strong>Makers:</strong> {anime.producers}</p>
      <p><strong>Air Day:</strong> {anime.air_day}</p>
    </div>
    <div class="anime-description">
      <h2>Description</h2>
      <p>{anime.description}</p>
    </div>
  </div>
{:else}
  <div class="detail-container">
    <p>Loading...</p>
  </div>
{/if}



