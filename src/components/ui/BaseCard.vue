<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-shadow hover:shadow-md">
    <div v-if="title || $slots.header" class="flex flex-col space-y-1.5 p-6 pb-4 border-b border-slate-100">
      <slot name="header">
        <h3 v-if="title" class="font-bold text-slate-800">{{ title }}</h3>
        <p v-if="description" class="text-sm text-slate-500 mt-1">{{ description }}</p>
      </slot>
    </div>
    <div :class="['p-6', title || $slots.header ? 'pt-4' : '']">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="flex items-center bg-slate-50 px-6 py-4 border-t border-slate-100 mt-4 rounded-b-xl">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
