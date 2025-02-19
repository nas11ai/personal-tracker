<template>
  <v-alert :model-value="isShown" @update:model-value="emitUpdate" :type="type" :color="type" close-label="Close Alert"
    :title="type.charAt(0).toUpperCase() + type.slice(1)" :icon="'$' + type" border="start" closable
    :text="formattedMessage" />
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, type PropType } from "vue";

const props = defineProps({
  isShown: {
    type: Boolean,
    default: false,
  },
  message: {
    type: [String, Array] as PropType<string | string[]>,
    required: true,
  },
  type: {
    type: String as () => "success" | "error" | "info" | "warning",
    default: "success",
  },
});

const emit = defineEmits(["update:isShown"]);

const emitUpdate = (value: boolean) => {
  emit("update:isShown", value);
};

const formattedMessage = computed(() => {
  return Array.isArray(props.message)
    ? props.message.join("\n")
    : props.message;
});
</script>
