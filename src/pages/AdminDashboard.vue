<script setup lang="ts">
import { 
  Users, 
  MousePointerClick, 
  TrendingUp, 
  DollarSign,
  AlertCircle,
  ChevronRight,
  UserPlus,
  Video
} from 'lucide-vue-next';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import LineChart from '@/components/ui/LineChart.vue';

// Mock Data
const pendingWithdrawalsCount = 8;
const pendingWithdrawalsAmount = '$1,250.00';

const stats = [
  { name: 'Total Afiliator', value: '248', change: '+12% dari bulan lalu', trend: 'up', icon: Users },
  { name: 'Total Klik', value: '45.2k', change: '+24.5% dari bulan lalu', trend: 'up', icon: MousePointerClick },
  { name: 'Total Konversi', value: '14.2k', change: '+18.1% dari bulan lalu', trend: 'up', icon: TrendingUp },
  { name: 'Total Pendapatan', value: '$84,500', change: '+8.2% dari bulan lalu', trend: 'up', icon: DollarSign },
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Pendapatan ($)',
      data: [35000, 42000, 38000, 51000, 65000, 72000, 84500],
      borderColor: '#4f46e5', // text-indigo-600
      backgroundColor: 'rgba(79, 70, 229, 0.05)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Konversi',
      data: [8000, 9500, 9000, 11000, 13000, 13500, 14200],
      borderColor: '#94a3b8', // text-slate-400
      backgroundColor: 'transparent',
      borderDash: [5, 5],
      fill: false,
      tension: 0.4,
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end' as const,
      labels: {
        usePointStyle: true,
        boxWidth: 6,
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6', // gray-100
      },
      border: {
        display: false
      }
    },
    x: {
      grid: {
        display: false
      },
      border: {
        display: false
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
};

const recentActivity = [
  { id: 1, type: 'signup', user: 'Sarah Connor', text: 'bergabung sebagai Afiliator baru.', time: '10 mnt lalu' },
  { id: 2, type: 'claim', user: 'Mike Ross', text: 'mengklaim video "Summer Promo #4".', time: '1 jam lalu' },
  { id: 3, type: 'signup', user: 'Elena Gilbert', text: 'bergabung sebagai Afiliator baru.', time: '2 jam lalu' },
  { id: 4, type: 'claim', user: 'John Doe', text: 'mengklaim video "UGC TikTok Review".', time: '5 jam lalu' },
  { id: 5, type: 'claim', user: 'Harvey Specter', text: 'mengklaim video "Instagram Reel Variant A".', time: '1 hari lalu' },
];

</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Header Alert -->
    <div v-if="pendingWithdrawalsCount > 0" class="flex items-center justify-between rounded-lg bg-amber-50 border border-amber-200 p-4 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="rounded-full bg-amber-100 p-2">
          <AlertCircle class="h-5 w-5 text-amber-600" />
        </div>
        <div>
           <h4 class="text-sm font-semibold text-amber-800">Penarikan Tertunda Membutuhkan Perhatian</h4>
           <p class="text-sm text-amber-700 mt-0.5">Anda memiliki {{ pendingWithdrawalsCount }} permintaan penarikan dengan total {{ pendingWithdrawalsAmount }}.</p>
        </div>
      </div>
      <button class="flex items-center gap-1 text-sm font-medium text-amber-800 hover:text-amber-900 bg-amber-100/50 hover:bg-amber-200/50 px-3 py-1.5 rounded-md transition-colors">
        Tinjau Sekarang <ChevronRight class="h-4 w-4" />
      </button>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between mt-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900">Ringkasan Dasbor</h1>
        <p class="text-slate-500 text-sm mt-1">Status aset video dan interaksi afiliator secara seketika.</p>
      </div>
      <button class="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-colors">
        <Video class="h-4 w-4" />
        Unggah Video Baru
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <BaseCard v-for="stat in stats" :key="stat.name" class="!p-0">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <p class="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{{ stat.name }}</p>
            <component :is="stat.icon" class="h-4 w-4 text-slate-400 opacity-50" />
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <p class="text-2xl font-bold text-slate-900">{{ stat.value }}</p>
             <span 
              :class="[
                stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : stat.trend === 'down' ? 'text-rose-500 bg-rose-50' : 'text-slate-500 bg-slate-50',
                'text-xs font-semibold px-2 py-0.5 rounded'
              ]"
            >
              {{ stat.change }}
            </span>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Analytics Chart -->
      <BaseCard title="Ringkasan Performa" description="Tren pendapatan dan konversi dari waktu ke waktu." class="lg:col-span-2 flex flex-col">
        <div class="h-80 w-full mt-4 flex-1">
          <LineChart :data="chartData" :options="chartOptions" />
        </div>
      </BaseCard>

      <!-- Recent Activity Feed -->
      <BaseCard title="Aktivitas Terbaru" description="Tindakan terbaru dari afiliator Anda.">
        <div class="mt-4 space-y-6">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex gap-4">
            <div class="relative flex flex-col items-center">
              <div 
                :class="[
                  'flex h-8 w-8 items-center justify-center rounded-full border border-white ring-4 ring-gray-50 shrink-0 z-10',
                  activity.type === 'signup' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
                ]"
              >
                <UserPlus v-if="activity.type === 'signup'" class="h-4 w-4" />
                <Video v-if="activity.type === 'claim'" class="h-4 w-4" />
              </div>
              <!-- Vertical line connector (hide on last item if preferred, keeping simple here) -->
              <div v-if="activity.id !== recentActivity[recentActivity.length - 1].id" class="w-px h-full bg-slate-200 absolute top-8"></div>
            </div>
            
            <div class="flex flex-col pb-4">
              <p class="text-sm text-slate-600">
                <span class="font-bold text-slate-900">{{ activity.user }}</span> {{ activity.text }}
              </p>
              <span class="text-xs text-slate-400 mt-1 flex items-center gap-1 tabular-nums">
                {{ activity.time }}
              </span>
            </div>
          </div>
        </div>
        <template #footer>
           <button class="w-full py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors uppercase tracking-widest">
             Lihat Semua Aktivitas
           </button>
        </template>
      </BaseCard>
    </div>
  </div>
</template>
