<!-- src/routes/+page.svelte -->
<script>
    export let data;
    import AnimeCard from '$lib/components/AnimeCard.svelte';
  </script>
  
  <div class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
    {#each data.shows as show}
      <AnimeCard {show} />
    {/each}
  </div>