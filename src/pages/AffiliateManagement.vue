<script setup lang="ts">
import { ref } from 'vue';
import { Search, Filter, MoreHorizontal, Edit, Trash2 } from 'lucide-vue-next';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';

interface Affiliate {
  id: number;
  name: string;
  email: string;
  tier: 'Gold' | 'Silver' | 'Bronze';
  sales: string;
  status: boolean;
}

const mockAffiliates = ref<Affiliate[]>([
  { id: 1, name: 'Sarah Connor', email: 'sarah@example.com', tier: 'Gold', sales: '$12,450', status: true },
  { id: 2, name: 'Mike Ross', email: 'mike.r@example.com', tier: 'Silver', sales: '$5,230', status: true },
  { id: 3, name: 'Elena Gilbert', email: 'elena.g@example.com', tier: 'Bronze', sales: '$850', status: false },
  { id: 4, name: 'John Doe', email: 'j.doe@example.com', tier: 'Silver', sales: '$3,100', status: true },
  { id: 5, name: 'Harvey Specter', email: 'harvey@example.com', tier: 'Gold', sales: '$45,200', status: true },
]);

const getTierClass = (tier: string) => {
  switch(tier) {
    case 'Gold': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Silver': return 'bg-slate-100 text-slate-700 border-slate-200';
    case 'Bronze': return 'bg-orange-100 text-orange-700 border-orange-200';
    default: return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

const toggleStatus = (affiliate: Affiliate) => {
  affiliate.status = !affiliate.status;
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Afiliator</h2>
        <p class="text-gray-500 mt-1">Kelola jaringan afiliator Anda, lacak penjualan, dan sesuaikan status.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-colors">
          Undang Afiliator
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <BaseCard class="!p-0 border-gray-200">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-white rounded-t-xl">
        <div class="relative max-w-sm w-full">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search class="h-4 w-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            class="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" 
            placeholder="Cari afiliator..." 
          />
        </div>
        <button class="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 transition-colors">
          <Filter class="h-4 w-4" />
          Filter
        </button>
      </div>

      <!-- Table Section -->
      <BaseTable :columns="['Afiliator', 'Tingkat', 'Total Penjualan', 'Status', 'Aksi']" class="border-0 rounded-none border-t-0 shadow-none">
        <tr v-for="affiliate in mockAffiliates" :key="affiliate.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <td class="whitespace-nowrap p-4 text-sm">
            <div class="flex items-center">
              <div class="h-10 w-10 flex-shrink-0">
                <img class="h-10 w-10 rounded-full" :src="`https://ui-avatars.com/api/?name=${affiliate.name.replace(' ', '+')}&background=random&color=fff`" alt="" />
              </div>
              <div class="ml-4">
                <div class="font-medium text-gray-900">{{ affiliate.name }}</div>
                <div class="text-gray-500">{{ affiliate.email }}</div>
              </div>
            </div>
          </td>
          <td class="whitespace-nowrap p-4 text-sm">
            <span :class="[getTierClass(affiliate.tier), 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold']">
              {{ affiliate.tier }}
            </span>
          </td>
          <td class="whitespace-nowrap p-4 text-sm text-gray-900 font-medium">
            {{ affiliate.sales }}
          </td>
          <td class="whitespace-nowrap p-4 text-sm">
            <!-- Mock Toggle Switch -->
            <div class="flex items-center gap-3">
              <button 
                @click="toggleStatus(affiliate)"
                :class="[
                  affiliate.status ? 'bg-emerald-500' : 'bg-slate-200', 
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                ]"
                role="switch" 
                :aria-checked="affiliate.status"
              >
                <span class="sr-only">Ubah status</span>
                <span 
                  aria-hidden="true" 
                  :class="[
                    affiliate.status ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  ]"
                />
              </button>
              <span :class="[affiliate.status ? 'text-emerald-700 bg-emerald-100' : 'text-slate-700 bg-slate-100', 'px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest rounded-full transition-colors']">
                {{ affiliate.status ? 'Aktif' : 'Ditangguhkan' }}
              </span>
            </div>
          </td>
          <td class="whitespace-nowrap p-4 pl-8 text-sm text-gray-500">
            <div class="flex items-center gap-3">
              <button class="text-gray-400 hover:text-gray-900 transition-colors">
                <span class="sr-only">Edit</span>
                <Edit class="h-4 w-4" />
              </button>
              <button class="text-gray-400 hover:text-red-600 transition-colors">
                <span class="sr-only">Hapus</span>
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </td>
        </tr>
      </BaseTable>
      
      <!-- Pagination (Mock) -->
      <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-xl">
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Menampilkan <span class="font-medium">1</span> hingga <span class="font-medium">5</span> dari <span class="font-medium">248</span> hasil
            </p>
          </div>
          <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="sr-only">Sebelumnya</span>
                &larr;
              </button>
              <button href="#" aria-current="page" class="relative z-10 inline-flex items-center bg-gray-900 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">1</button>
              <button href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</button>
              <button href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">3</button>
              <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
              <button href="#" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="sr-only">Selanjutnya</span>
                &rarr;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
