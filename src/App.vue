<script setup lang="ts">
import { ref, computed } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import AdminDashboard from '@/pages/AdminDashboard.vue';
import AffiliateManagement from '@/pages/AffiliateManagement.vue';
import VideoLibrary from '@/pages/VideoLibrary.vue';
import Withdrawals from '@/pages/Withdrawals.vue';

const currentPath = ref('/withdrawals');

const currentComponent = computed(() => {
  switch (currentPath.value) {
    case '/dashboard':
      return AdminDashboard;
    case '/affiliates':
      return AffiliateManagement;
    case '/videos':
      return VideoLibrary;
    case '/withdrawals':
      return Withdrawals;
    default:
      return AdminDashboard;
  }
});
</script>

<template>
  <AdminLayout v-model="currentPath">
    <component :is="currentComponent" />
  </AdminLayout>
</template>
