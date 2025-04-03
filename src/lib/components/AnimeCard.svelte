<!-- src/lib/components/AnimeCard.svelte -->
<script>
    export let show;
    import { goto } from '$app/navigation';
    
    $: staffObj = show.staff?.reduce((acc, cur) => {
      acc[cur.role] = cur.name;
      return acc;
    }, {}) || {};
  </script>
  
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div 
    class="group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
    on:click={() => goto(`/shows/${show.id}`)}
    on:mouseenter={() => {  // 添加鼠标悬停预加载
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = `/shows/${show.id}`;
      document.head.appendChild(link);
    }}
  >
    <img 
      src={show.cover} 
      alt={show.title} 
      referrerpolicy="no-referrer"
      class="w-full aspect-video md:aspect-3/4 object-cover transition-opacity duration-300 group-hover:opacity-90"
      loading="lazy"
    />
    <div class="p-4">
      <h3 class="font-semibold text-lg truncate">{show.title}</h3>
      {#if show.description}
        <div class="text-sm text-gray-600 mt-2 line-clamp-2">
            {show.description}
        </div>
      {/if}
      <div class="text-sm text-gray-500 mt-2">
        <span class="bg-gray-200 px-2 py-1 rounded">{show.type}</span>
        {#if show.releaseDate}
            <span class="bg-blue-200 px-2 py-1 rounded">
                {show.releaseDate}
            </span>
        {/if}
      </div>
      {#if show.staff?.length > 0}
        <div class="mt-4">
          <button 
            class="text-sm text-blue-600 hover:underline"
            on:click|stopPropagation
          >
            制作信息
          </button>
          <div class="hidden group-hover:block mt-2">
            <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {#each Object.entries(staffObj) as [key, value]}
                <dt class="font-medium">{key}</dt>
                <dd class="truncate">{value}</dd>
              {/each}
            </dl>
          </div>
        </div>
      {/if}
    </div>
  </div>