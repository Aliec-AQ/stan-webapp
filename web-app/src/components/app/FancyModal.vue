<script setup lang="ts">
import { CloseIcon } from '@/components/icons';
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div v-if="show" id="fancy-modal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="w-full h-full bg-black/70 relative overflow-auto">
            <div id="modal-content" class="py-[40px] md:px-[40px] w-full h-full flex flex-col">
                <slot></slot>
            </div>
            <button @click="$emit('close')" class="absolute top-0 right-0 text-white bg-black/70 size-[40px] flex items-center justify-center z-10">
                <CloseIcon class="size-6" />
            </button>
        </div>
    </div>
</template>

<style scoped>
/* direct child of #modal-content tkes the full height  and width*/
#modal-content > * {
    width: 100%;
    height: 100%;
}
</style>