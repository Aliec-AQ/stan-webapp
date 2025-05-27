import { ref, reactive } from 'vue';

const hub = reactive(new Map());
const portalInstance = ref(null);

const usePortal = () => {
    const open = (payload) => {
        const {to, from, content} = payload;
        if (!hub.has(to)) {
            hub.set(to, new Map());
        }
        const toMap = hub.get(to);
        toMap.set(from, payload);
    };

    const close = (payload) => {
        const {to, from} = payload;
        if (!to || !from) return;
        const toMap = hub.get(to);
        if (!toMap) return;
        toMap.delete(from);
        if (toMap.size === 0) {
            hub.delete(to);
        }
    }

    const update = (payload) => {
        const {to, from, content} = payload;
        if (!to || !from) return;
        const toMap = hub.get(to);
        if (!toMap) return;
        const item = toMap.get(from);
        if (!item) return;
        toMap.set(from, { ...item, content });
    }

    const get = (target) => {
        const toMap = hub.get(target);
        if (!toMap) return null;
        const content = Array.from(toMap.values()).map((item) => item.content);
        return content.pop();
    };

    const getAll = (target) => {
        const toMap = hub.get(target);
        if (!toMap) return null;
        const content = Array.from(toMap.values()).map((item) => item.content);
        return content;
    };
    
    const updateContent = (to, content) => {
        const toMap = hub.get(to);
        if (!toMap) return;
        
        for (const [from, payload] of toMap.entries()) {
            toMap.set(from, { ...payload, content });
        }
    };

    return {
        open,
        close,
        get,
        getAll,
        updateContent,
        update,
        hub
    };
};

export const getPortal = () => {
    if (!portalInstance.value) {
        portalInstance.value = usePortal();
    }
    return portalInstance.value;
};