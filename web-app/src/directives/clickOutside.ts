export const clickOutside = {
  beforeMount(el: HTMLElement, binding: { value: (event: MouseEvent) => void }) {
    const handler = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    (el as any).clickOutsideEvent = handler;
    document.addEventListener('click', handler);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', (el as any).clickOutsideEvent);
  },
};
