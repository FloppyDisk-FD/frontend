<!-- src/routes/shows/[id]/+page.svelte -->
<script>
    export let data;
    import StaffInfoGrid from '$lib/components/StaffInfoGrid.svelte';
    import  Arrowleft  from '@designthen/svelte-icons/heroicon-24-outline/arrow-left-circle.svelte';
    import { onMount } from 'svelte';
    onMount(() => {
    // 预加载LCP图片
      const img = new Image();
      img.src = data.show.cover;
    });
  </script>
  
  <div class="p-4 md:p-8">
    <button 
      on:click={() => window.history.back()} 
      class="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-2 my-1 rounded-lg transition-colors duration-300">
      <Arrowleft class="w-5 h-5 mr-2" />返回
    </button>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-1">
        <img 
          src={data.show.cover} 
          alt={data.show.title} 
          referrerpolicy="no-referrer"
          class="w-full aspect-[3/4] object-cover rounded-lg shadow-lg"
          loading="eager"  
          decoding="async" 
          fetchpriority="high"
        />
      </div>
      <div class="md:col-span-2">
        <h1 class="text-3xl font-bold">{data.show.title}</h1>
        <div class="mt-4 space-y-6">
          {#if data.show.staff?.length > 0}
            <div>
              <h2 class="text-xl font-semibold">制作人员</h2>
              <StaffInfoGrid items={data.show.staff} />
            </div>
          {/if}
          {#if data.show.cast?.length > 0}
            <div>
              <h2 class="text-xl font-semibold">声优阵容</h2>
              <StaffInfoGrid 
                items={data.show.cast} 
                keyField="character"
                valueField="actor"
              />
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>