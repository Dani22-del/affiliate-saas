<script setup lang="ts">
defineProps<{
  columns: string[];
}>();
</script>

<template>
  <div class="relative w-full overflow-auto rounded-xl border border-slate-200 shadow-sm bg-white">
    <table class="w-full caption-bottom text-sm text-left">
      <thead class="bg-slate-50 border-b border-slate-100">
        <tr>
          <th
            v-for="col in columns"
            :key="col"
            class="px-6 py-3 text-[10px] text-slate-400 uppercase tracking-widest font-bold align-middle"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-50 text-sm font-medium text-slate-700 bg-white">
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>
