<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  title?: string;
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" 
          @click="$emit('close')"
          aria-hidden="true"
        ></div>

        <!-- Modal Panel -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div 
            v-if="isOpen" 
            class="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-2xl transition-all"
          >
            <div class="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold leading-6 text-gray-900">
                {{ title }}
                <slot name="title"></slot>
              </h3>
              <button 
                type="button" 
                class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
                @click="$emit('close')"
              >
                <span class="sr-only">Tutup</span>
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            
            <div class="px-6 py-4">
              <slot></slot>
            </div>
            
            <div v-if="$slots.footer" class="bg-gray-50/50 px-6 py-4 border-t border-gray-100/50 flex items-center justify-end gap-3 rounded-b-xl">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
