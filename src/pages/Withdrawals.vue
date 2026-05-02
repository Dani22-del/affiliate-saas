<script setup lang="ts">
import { ref } from 'vue';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  UploadCloud, 
  Banknote,
  FileImage
} from 'lucide-vue-next';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseModal from '@/components/ui/BaseModal.vue';

interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface WithdrawalRequest {
  id: string;
  affiliate: string;
  amount: number;
  date: string;
  status: 'Tertunda' | 'Disetujui' | 'Dibayar' | 'Ditolak';
  bankDetails: BankDetails;
}

// --- Mock Data ---
const mockRequests = ref<WithdrawalRequest[]>([
  { 
    id: 'WR-2023-001', affiliate: 'Sarah Connor', amount: 550.00, date: '28 Okt 2023', status: 'Tertunda',
    bankDetails: { bankName: 'Chase Bank', accountNumber: '**** 4567', accountName: 'Sarah Connor' }
  },
  { 
    id: 'WR-2023-002', affiliate: 'Mike Ross', amount: 120.00, date: '28 Okt 2023', status: 'Tertunda',
    bankDetails: { bankName: 'Bank of America', accountNumber: '**** 8890', accountName: 'Michael Ross' }
  },
  { 
    id: 'WR-2023-003', affiliate: 'Elena Gilbert', amount: 850.00, date: '27 Okt 2023', status: 'Disetujui',
    bankDetails: { bankName: 'Wells Fargo', accountNumber: '**** 1122', accountName: 'Elena Gilbert' }
  },
  { 
    id: 'WR-2023-004', affiliate: 'Harvey Specter', amount: 2400.00, date: '25 Okt 2023', status: 'Ditolak',
    bankDetails: { bankName: 'Citi Bank', accountNumber: '**** 3344', accountName: 'Harvey Specter' }
  },
  { 
    id: 'WR-2023-005', affiliate: 'John Doe', amount: 310.00, date: '24 Okt 2023', status: 'Disetujui',
    bankDetails: { bankName: 'Chase Bank', accountNumber: '**** 5566', accountName: 'John Doe' }
  },
]);

// --- State ---
const isModalOpen = ref(false);
const selectedRequest = ref<WithdrawalRequest | null>(null);
const uploadedFileName = ref<string | null>(null);
const showToast = ref(false);

// --- Handlers ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const getStatusConfig = (status: string) => {
  switch(status) {
    case 'Disetujui': return { class: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 };
    case 'Dibayar': return { class: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 };
    case 'Tertunda': return { class: 'bg-amber-100 text-amber-700', icon: Clock };
    case 'Ditolak': return { class: 'bg-rose-100 text-rose-700', icon: XCircle };
    default: return { class: 'bg-slate-100 text-slate-700', icon: Clock };
  }
};

const openProcessModal = (request: WithdrawalRequest) => {
  selectedRequest.value = request;
  uploadedFileName.value = null; // reset
  isModalOpen.value = true;
};

const handleProofUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    uploadedFileName.value = target.files[0].name;
  }
};

const approveWithdrawal = () => {
  if (selectedRequest.value) {
    selectedRequest.value.status = 'Dibayar';
    isModalOpen.value = false;
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
};

const rejectWithdrawal = () => {
  if (selectedRequest.value) {
    selectedRequest.value.status = 'Ditolak';
    isModalOpen.value = false;
  }
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Penarikan</h2>
        <p class="text-gray-500 mt-1">Tinjau permintaan pembayaran, verifikasi rincian bank, dan unggah bukti transfer manual.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex gap-3">
        <!-- Dashboard summary snippets -->
        <div class="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 flex flex-col justify-center">
           <span class="text-xs font-semibold text-amber-700 uppercase tracking-wide">Tertunda</span>
           <span class="text-lg font-bold text-amber-900">2 perm</span>
        </div>
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
            placeholder="Cari berdasarkan ID atau Afiliator..." 
          />
        </div>
        <button class="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 transition-colors">
          <Filter class="h-4 w-4" />
          Filter
        </button>
      </div>

      <!-- Table Section -->
      <BaseTable :columns="['ID Permintaan', 'Afiliator', 'Jumlah', 'Tanggal', 'Status', 'Aksi']" class="border-0 rounded-none border-t-0 shadow-none">
        <tr v-for="req in mockRequests" :key="req.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <td class="whitespace-nowrap p-4 text-sm font-medium text-gray-900">
            {{ req.id }}
          </td>
          <td class="whitespace-nowrap p-4 text-sm">
            <div class="flex items-center gap-2">
              <img :src="`https://ui-avatars.com/api/?name=${req.affiliate.replace(' ', '+')}&background=random&color=fff`" alt="Avatar" class="h-6 w-6 rounded-full"/>
              <span class="font-medium text-gray-700">{{ req.affiliate }}</span>
            </div>
          </td>
          <td class="whitespace-nowrap p-4 text-sm font-bold text-gray-900">
            {{ formatCurrency(req.amount) }}
          </td>
          <td class="whitespace-nowrap p-4 text-sm text-gray-500">
            {{ req.date }}
          </td>
          <td class="whitespace-nowrap p-4 text-sm">
            <span 
              :class="[
                getStatusConfig(req.status).class,
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-sm'
              ]"
            >
              <component :is="getStatusConfig(req.status).icon" class="h-3.5 w-3.5" />
              {{ req.status }}
            </span>
          </td>
          <td class="whitespace-nowrap p-4 pl-4 text-sm">
            <template v-if="req.status === 'Tertunda'">
              <button 
                @click="openProcessModal(req)"
                class="inline-flex items-center justify-center gap-1.5 rounded bg-indigo-50 px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                <Banknote class="h-3.5 w-3.5" />
                Proses
              </button>
            </template>
            <template v-else>
               <button class="inline-flex items-center justify-center gap-1.5 rounded bg-white border border-slate-200 px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
                 <Eye class="h-3.5 w-3.5" />
                 Lihat
               </button>
            </template>
          </td>
        </tr>
      </BaseTable>
    </BaseCard>

    <!-- Process Withdrawal Modal -->
    <BaseModal 
      :isOpen="isModalOpen" 
      @close="isModalOpen = false" 
      title="Proses Penarikan"
    >
      <div v-if="selectedRequest" class="space-y-6">
        
        <!-- Context Card -->
        <div class="bg-gray-50 rounded-lg p-4 border border-gray-200 flex flex-col items-center text-center">
          <p class="text-sm text-gray-500 font-medium">Jumlah yang Diminta</p>
          <p class="text-3xl font-bold text-gray-900 mt-1 tracking-tight">{{ formatCurrency(selectedRequest.amount) }}</p>
          <div class="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <img :src="`https://ui-avatars.com/api/?name=${selectedRequest.affiliate.replace(' ', '+')}&background=random&color=fff`" alt="Avatar" class="h-5 w-5 rounded-full"/>
            {{ selectedRequest.affiliate }}
          </div>
        </div>

        <!-- Bank Details (Read-only view) -->
        <div>
          <h4 class="text-sm font-semibold text-gray-900 mb-3">Rincian Bank Tujuan</h4>
          <div class="grid gap-3">
            <div class="flex flex-col rounded-md border border-gray-200 bg-white p-3 shadow-sm relative overflow-hidden">
               <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
               <span class="text-xs text-gray-500 font-medium">Nama Bank</span>
               <span class="text-sm font-semibold text-gray-900 mt-0.5">{{ selectedRequest.bankDetails.bankName }}</span>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="flex flex-col rounded-md border border-gray-200 bg-white p-3 shadow-sm">
                <span class="text-xs text-gray-500 font-medium">Nama Rekening</span>
                <span class="text-sm font-semibold text-gray-900 mt-0.5 truncate">{{ selectedRequest.bankDetails.accountName }}</span>
              </div>
              <div class="flex flex-col rounded-md border border-gray-200 bg-white p-3 shadow-sm">
                <span class="text-xs text-gray-500 font-medium">Nomor Rekening</span>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-sm font-semibold text-gray-900">{{ selectedRequest.bankDetails.accountNumber }}</span>
                  <button class="text-indigo-600 hover:text-indigo-800 text-xs font-medium ml-auto">Salin</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upload Proof -->
        <div class="pt-2">
           <h4 class="text-sm font-semibold text-gray-900 mb-3">Unggah Bukti Transfer</h4>
           <div class="relative">
             <label 
              for="proof-upload" 
              class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-indigo-400 transition-colors overflow-hidden group"
            >
               <div v-if="!uploadedFileName" class="flex flex-col items-center justify-center pt-5 pb-6">
                 <UploadCloud class="w-8 h-8 mb-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                 <p class="mb-1 text-sm text-gray-600 font-medium"><span class="font-semibold text-indigo-600">Klik untuk mengunggah</span> atau seret dan lepas</p>
                 <p class="text-xs text-gray-500">PNG, JPG or PDF (MAX. 5MB)</p>
               </div>
               <div v-else class="flex flex-col items-center justify-center p-4 bg-indigo-50/50 w-full h-full">
                 <FileImage class="w-8 h-8 mb-2 text-indigo-600" />
                 <p class="text-sm font-semibold text-gray-900 truncate max-w-[200px]">{{ uploadedFileName }}</p>
                 <p class="text-xs text-indigo-600 font-medium mt-1 hover:underline">Ubah file</p>
               </div>
               <input id="proof-upload" type="file" class="hidden" accept="image/*,.pdf" @change="handleProofUpload" />
             </label>
           </div>
        </div>

      </div>

      <template #footer>
        <button 
          @click="rejectWithdrawal"
          class="inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Tolak Permintaan
        </button>
        <div class="flex-1"></div>
        <button 
          @click="isModalOpen = false" 
          class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
        >
          Batal
        </button>
        <button 
          @click="approveWithdrawal" 
          :disabled="!uploadedFileName"
          :class="[
            'inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors',
            uploadedFileName ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-200 cursor-not-allowed text-gray-400'
          ]"
        >
          Setujui & Tandai Dibayar
        </button>
      </template>
    </BaseModal>

    <!-- Simulated Success Toast -->
    <div v-if="showToast" class="fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg shadow-black/10 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 z-50">
      <CheckCircle2 class="h-5 w-5 text-emerald-400" />
      <div class="flex flex-col">
        <span class="text-sm font-semibold">Pembayaran Diproses</span>
        <span class="text-xs text-slate-300">Penarikan telah ditandai sebagai dibayar.</span>
      </div>
    </div>
  </div>
</template>
