<script setup lang="ts">
import { ref } from 'vue';
import { 
  UploadCloud, 
  FileVideo, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Search, 
  Filter, 
  MoreVertical,
  Play,
  Trash2
} from 'lucide-vue-next';
import BaseCard from '@/components/ui/BaseCard.vue';

// --- State ---
const isDragging = ref(false);
const uploadStatus = ref<'idle' | 'uploading' | 'completed'>('idle');
const uploadProgress = ref(0);
const currentFileName = ref('');

interface VideoAsset {
  id: number;
  title: string;
  status: 'Tersedia' | 'Memproses' | 'Diklaim' | 'Gagal';
  date: string;
  size: string;
  thumbnailClass: string;
}

const mockVideos = ref<VideoAsset[]>([
  { id: 1, title: 'Summer Campaign - Variant A.mp4', status: 'Tersedia', date: '25 Okt 2023', size: '254 MB', thumbnailClass: 'bg-indigo-100 text-indigo-500' },
  { id: 2, title: 'UGC TikTok Review Style.mp4', status: 'Memproses', date: '26 Okt 2023', size: '120 MB', thumbnailClass: 'bg-purple-100 text-purple-500' },
  { id: 3, title: 'Instagram Reel Unboxing.mp4', status: 'Diklaim', date: '20 Okt 2023', size: '410 MB', thumbnailClass: 'bg-rose-100 text-rose-500' },
  { id: 4, title: 'Holiday Promo Raw Footage.mov', status: 'Gagal', date: '27 Okt 2023', size: '1.2 GB', thumbnailClass: 'bg-orange-100 text-orange-500' },
  { id: 5, title: 'B-Roll Office Environment.mp4', status: 'Tersedia', date: '21 Okt 2023', size: '890 MB', thumbnailClass: 'bg-blue-100 text-blue-500' },
  { id: 6, title: 'Product Showcase - 4K.mp4', status: 'Tersedia', date: '22 Okt 2023', size: '2.1 GB', thumbnailClass: 'bg-emerald-100 text-emerald-500' },
]);

// --- Handlers ---
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
  
  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    startUpload(file.name);
  }
};

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    startUpload(target.files[0].name);
  }
};

const startUpload = (fileName: string) => {
  if (uploadStatus.value === 'uploading') return;
  
  currentFileName.value = fileName;
  uploadStatus.value = 'uploading';
  uploadProgress.value = 0;
  
  const interval = setInterval(() => {
    // Simulate chunked upload progress
    const increment = Math.floor(Math.random() * 15) + 5;
    uploadProgress.value = Math.min(uploadProgress.value + increment, 100);
    
    if (uploadProgress.value >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        uploadStatus.value = 'completed';
        
        // Unshift an artificially processing video to the list
        const newId = Date.now();
        mockVideos.value.unshift({
          id: newId,
          title: currentFileName.value,
          status: 'Memproses',
          date: 'Baru saja',
          size: 'Menghitung...',
          thumbnailClass: 'bg-gray-100 text-gray-500'
        });

        // Simulate processing finishing after 2s
        setTimeout(() => {
          const vid = mockVideos.value.find(v => v.id === newId);
          if (vid) {
            vid.status = 'Tersedia';
            vid.size = '14.2 MB';
            vid.thumbnailClass = 'bg-emerald-100 text-emerald-500';
          }
        }, 2000);

        // Reset dropzone after a delay
        setTimeout(() => {
          uploadStatus.value = 'idle';
          uploadProgress.value = 0;
          currentFileName.value = '';
        }, 3000);
      }, 500);
    }
  }, 500);
};

const deleteVideo = (id: number) => {
  mockVideos.value = mockVideos.value.filter(v => v.id !== id);
};

// --- Helpers ---
const getStatusConfig = (status: string) => {
  switch(status) {
    case 'Tersedia': return { class: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 };
    case 'Memproses': return { class: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: Loader2 };
    case 'Diklaim': return { class: 'bg-slate-100 text-slate-700 border-slate-200', icon: CheckCircle2 };
    case 'Gagal': return { class: 'bg-rose-100 text-rose-700 border-rose-200', icon: AlertCircle };
    default: return { class: 'bg-slate-100 text-slate-700', icon: FileVideo };
  }
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Pustaka Aset Video</h2>
      <p class="text-gray-500 mt-1">Unggah dan kelola konten video mentah untuk diklaim oleh afiliator Anda.</p>
    </div>

    <!-- Upload Area -->
    <BaseCard title="Unggah Video" class="border-gray-200 shadow-sm overflow-hidden bg-white">
      <div 
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop="handleDrop"
        :class="[
          'relative mt-2 flex justify-center rounded-xl border-2 border-dashed px-6 py-12 transition-all duration-200 ease-in-out',
          isDragging ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50/25',
          uploadStatus !== 'idle' ? 'pointer-events-none' : 'cursor-pointer'
        ]"
      >
        <input 
          type="file" 
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
          @change="handleFileInput" 
          :disabled="uploadStatus !== 'idle'"
          multiple
          accept="video/*"
        />
        
        <div class="text-center">
          <div v-if="uploadStatus === 'idle'" class="flex flex-col items-center animate-in zoom-in-95 duration-300">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-50">
              <UploadCloud class="h-8 w-8 text-indigo-600" aria-hidden="true" />
            </div>
            <div class="mt-4 flex text-sm leading-6 text-gray-600">
              <span class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>Unggah file</span>
              </span>
              <p class="pl-1">atau seret dan lepas</p>
            </div>
            <p class="text-xs leading-5 text-gray-500 mt-1">MP4, MOV, WEBM hingga 2GB per file</p>
          </div>

          <div v-else-if="uploadStatus === 'uploading'" class="flex flex-col items-center w-full max-w-md mx-auto animate-in fade-in duration-300">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <Loader2 class="h-8 w-8 text-blue-600 animate-spin" aria-hidden="true" />
            </div>
            <p class="mt-4 text-sm font-medium text-gray-900">Mengunggah {{ currentFileName }}...</p>
            
            <div class="w-full mt-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-200 overflow-hidden">
              <div class="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out min-w-[2%]" :style="`width: ${uploadProgress}%`"></div>
            </div>
            <div class="w-full flex justify-between mt-2 text-xs text-gray-500 font-medium">
              <span>Memproses bagian</span>
              <span>{{ uploadProgress }}%</span>
            </div>
          </div>

          <div v-else-if="uploadStatus === 'completed'" class="flex flex-col items-center animate-in zoom-in-95 duration-300">
             <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 class="h-8 w-8 text-green-600" aria-hidden="true" />
            </div>
            <p class="mt-4 text-sm font-medium text-gray-900">Unggahan Selesai</p>
            <p class="text-xs leading-5 text-gray-500 mt-1">Video Anda sekarang berada dalam antrean untuk diproses.</p>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Video Grid -->
    <div>
      <div class="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h3 class="text-lg font-bold text-slate-800">Pool Aset</h3>
        
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <div class="relative w-full sm:w-64">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search class="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              class="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" 
              placeholder="Cari aset..." 
            />
          </div>
          <button class="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 shrink-0">
            <Filter class="h-4 w-4 text-slate-500" />
            Filter
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="video in mockVideos" 
          :key="video.id"
          class="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
        >
          <!-- Thumbnail Area -->
          <div :class="[video.thumbnailClass, 'aspect-video flex items-center justify-center relative overflow-hidden']">
            <!-- Simulated gradient/pattern for visual flair -->
            <div class="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
            
            <FileVideo class="h-12 w-12 opacity-50" />
            
            <!-- Play Button Overlay on Hover -->
            <div class="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <div class="bg-white/90 p-3 rounded-full hover:scale-110 transition-transform cursor-pointer shadow-lg">
                <Play class="h-5 w-5 text-gray-900 ml-0.5" />
              </div>
            </div>

            <!-- Absolute positioned Status Badge inside Image -->
            <div class="absolute top-3 left-3">
              <span 
                :class="[
                  getStatusConfig(video.status).class,
                  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold shadow-sm backdrop-blur-md bg-opacity-90'
                ]"
              >
                <component 
                  :is="getStatusConfig(video.status).icon" 
                  :class="[
                    'h-3.5 w-3.5', 
                    video.status === 'Memproses' ? 'animate-spin' : ''
                  ]" 
                />
                {{ video.status }}
              </span>
            </div>
          </div>

          <!-- Video Info -->
          <div class="p-4 flex flex-col flex-1">
            <div class="flex items-start justify-between gap-2">
              <h4 class="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight" :title="video.title">
                {{ video.title }}
              </h4>
              <button @click="deleteVideo(video.id)" class="text-gray-400 hover:text-red-500 mt-0.5 shrink-0 transition-colors" title="Hapus Aset">
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
            
            <div class="mt-auto pt-3 flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>{{ video.date }}</span>
              <span>{{ video.size }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
