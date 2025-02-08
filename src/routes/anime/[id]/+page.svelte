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
        anime.description = anime.description.replace(/\\n/g, '\n');
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
  .whitespace-pre-wrap {
    white-space: pre-wrap; /* 保留空白符序列，但是正常地进行换行 */
  }
</style>

{#if anime}
  <div class="container mx-auto p-4 bg-gray-100">
    <div class="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold mb-4 text-blue-600">{anime.title}</h1>
      <img src={anime.poster_url} referrerpolicy="no-referrer" alt={`${anime.title} poster`} class="w-full h-auto object-cover rounded-xl mb-4" style="width: 300px;" />
      <div class="space-y-2">
        <p><strong>分类:</strong> {anime.genre}</p>
        <p><strong>Production Info:</strong> {anime.production_info}</p>
        <p><strong>类型:</strong> {anime.type}</p>
        <p><strong>放送星期:</strong> {anime.air_day}</p>
      </div>
      <div class="mt-4">
        <h2 class="text-2xl font-bold mb-2 ">Description</h2>
        <div class="whitespace-pre-wrap">{anime.description}</div>
      </div>
    </div>
  </div>
{:else}
  <div class="container mx-auto p-4 bg-gray-100">
    <div class="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
      <p>Loading...</p>
    </div>
  </div>
{/if}



