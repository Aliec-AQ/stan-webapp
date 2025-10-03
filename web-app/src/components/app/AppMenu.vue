<script setup lang="ts">
import { HomeIcon, StarIcon, SettingsIcon } from '@/components/icons';
import { useRouter } from 'vue-router';

const router = useRouter();
const navigateTo = (route: string) => {
    router.push(route);
};
</script>

<template>
    <footer class="sticky bottom-0 left-0 w-full max-w-3xl bg-white border rounded-t-xl mx-auto h-16 flex items-center justify-around">
        <button @click="navigateTo('/favorites')" >
            <StarIcon class="size-6" />
        </button>
        <button @click="navigateTo('/home')" >
            <HomeIcon class="size-6" />
        </button>
        <button @click="navigateTo('/settings')" >
            <SettingsIcon class="size-6" />
        </button>
    </footer>
</template>