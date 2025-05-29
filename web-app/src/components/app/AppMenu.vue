<script setup>
import { HomeIcon, StarIcon, SettingsIcon } from '@/components/icons';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const navigateTo = (route) => {
    router.push(route);
};

const isActive = (path) => {
    if (path === '/') {
        return true;
    }
    return route.path.startsWith(path);
};
</script>

<template>
    <footer class="sticky bottom-0 left-0 w-full max-w-3xl bg-white border rounded-t-xl mx-auto h-16 flex items-center justify-around">
        <button @click="navigateTo('/favorites')" :class="{'text-blue-600': isActive('/favorites')}">
            <StarIcon class="size-6" />
        </button>
        <button @click="navigateTo('/home')" :class="{'text-blue-600': isActive('/home')}">
            <HomeIcon class="size-6" />
        </button>
        <button @click="navigateTo('/settings')" :class="{'text-blue-600': isActive('/settings')}">
            <SettingsIcon class="size-6" />
        </button>
    </footer>
</template>