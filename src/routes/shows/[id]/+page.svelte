<!-- src/routes/shows/[id]/+page.svelte -->
<script>
    export let data;
    import StaffInfoGrid from '$lib/components/StaffInfoGrid.svelte';
    import  Arrowleft  from '@designthen/svelte-icons/heroicon-24-outline/arrow-left-circle.svelte';
  </script>
  
  <div class="p-4 md:p-8">
    <button on:click={() => window.history.back()}>
        <Arrowleft class="w-5 h-5 mr-2" />返回
      </button>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-1">
        <img 
          src={data.show.cover} 
          alt={data.show.title} 
          referrerpolicy="no-referrer"
          class="w-full aspect-[4/3] md:aspect-video object-cover rounded-lg shadow-lg"
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