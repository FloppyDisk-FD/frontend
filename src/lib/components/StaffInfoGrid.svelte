<!-- src/lib/components/StaffInfoGrid.svelte -->
<script>
    export let items = [];
    export let keyField = 'role';
    export let valueField = 'name';
    
    $: formattedItems = items.reduce((acc, item) => {
      acc[item[keyField]] = item[valueField];
      return acc;
    }, {});
  </script>
  
  <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each Object.entries(formattedItems) as [key, value]}
      <div class="bg-gray-50 p-4 rounded-lg">
        <dt class="font-medium text-gray-600 mb-1 capitalize">{key}</dt>
        <dd class="text-gray-800">{value}</dd>
      </div>
    {/each}
  </dl>