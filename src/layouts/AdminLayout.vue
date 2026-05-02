<script setup lang="ts">
import { ref } from 'vue';
import { 
  LayoutDashboard, 
  Users, 
  Video, 
  CreditCard, 
  Settings, 
  Search, 
  Bell, 
  Menu
} from 'lucide-vue-next';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const sidebarOpen = ref(false);

const navigation = [
  { name: 'Dasbor', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Afiliator', path: '/affiliates', icon: Users },
  { name: 'Pustaka Video', path: '/videos', icon: Video },
  { name: 'Penarikan', path: '/withdrawals', icon: CreditCard },
  { name: 'Pengaturan', path: '/settings', icon: Settings },
];

const handleNavClick = (path: string) => {
  emit('update:modelValue', path);
  sidebarOpen.value = false; // close mobile sidebar on navigation
};
</script>

<template>
  <div class="min-h-screen bg-[#fcfcfc] text-slate-900 font-sans">
    <!-- Mobile sidebar backdrop -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-40 bg-gray-900/50 lg:hidden backdrop-blur-sm transition-opacity"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-72 lg:w-64 transform border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:flex lg:flex-col lg:h-screen',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-6">
        <div class="flex items-center gap-2 font-bold text-lg text-slate-900 tracking-tight">
          <div class="bg-indigo-600 text-white p-1.5 rounded-lg">
            <Video class="h-5 w-5" />
          </div>
          AAMP
        </div>
      </div>
      <nav class="flex-1 space-y-1 overflow-y-auto p-4">
        <a
          v-for="item in navigation"
          :key="item.name"
          href="#"
          @click.prevent="handleNavClick(item.path)"
          :class="[
            item.path === modelValue 
              ? 'bg-slate-100 text-indigo-600 font-medium' 
              : 'text-slate-600 hover:bg-slate-50',
            'group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors'
          ]"
        >
          <component 
            :is="item.icon" 
            :class="[
              item.path === modelValue ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600',
              'h-5 w-5 shrink-0'
            ]" 
          />
          {{ item.name }}
        </a>
      </nav>
      <div class="border-t border-slate-200 p-4">
        <div class="bg-indigo-50 p-4 rounded-xl mb-4">
          <p class="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">Akun Pro</p>
          <p class="text-xs text-indigo-600 leading-tight mb-3">Kelola hingga 500 afiliator dengan pool tingkat lanjut.</p>
          <button class="w-full bg-indigo-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100">Tingkatkan Sekarang</button>
        </div>
        <div class="flex items-center gap-3">
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="User" class="img-fluid rounded-full h-9 w-9 border border-slate-200"/>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-slate-900">Pengguna Admin</span>
            <span class="text-xs text-slate-500">Pemilik Merek</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex flex-1 flex-col lg:pl-64 min-h-screen">
      <!-- Topbar -->
      <header class="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b border-slate-200 bg-white px-4 sm:px-8 justify-between">
        <div class="flex items-center gap-2 text-sm text-slate-500">
          <button 
            type="button" 
            class="-m-2.5 p-2.5 text-slate-700 lg:hidden hover:bg-slate-50 rounded-md transition-colors mr-2"
            @click="sidebarOpen = true"
          >
            <span class="sr-only">Buka bilah sisi</span>
            <Menu class="h-5 w-5" />
          </button>
          <span class="hidden sm:inline">Dasbor Admin</span>
          <span class="hidden sm:inline">&rsaquo;</span>
          <span class="text-slate-900 font-medium">Ringkasan</span>
        </div>

        <div class="flex items-center gap-6">
          <form class="relative hidden sm:block w-64" action="#" method="GET" @submit.prevent>
            <label for="search-field" class="sr-only">Cari</label>
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search class="h-4 w-4 text-slate-400" />
            </div>
            <input 
              id="search-field" 
              class="block w-full border border-slate-200 rounded-full bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-sans" 
              placeholder="Cari pool..." 
              type="search" 
            />
          </form>
          <div class="flex items-center gap-3 sm:border-l sm:border-slate-200 sm:pl-6">
            <div class="text-right hidden sm:block">
              <p class="text-sm font-bold leading-none text-slate-900">Alex Rivera</p>
              <p class="text-xs text-slate-500">Pemilik Merek</p>
            </div>
            <div class="h-9 w-9 bg-slate-200 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center cursor-pointer">
              <div class="h-full w-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-xs">AR</div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>
