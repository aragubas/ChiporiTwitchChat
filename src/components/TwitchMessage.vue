<script setup lang="ts">
import FancyTextEffectComponent from "./FancyTextEffect.vue";
import MessageInstance from "@/Models/MessageInstance";
import { onMounted, ref } from "vue";

const props = defineProps({
  message: { type: MessageInstance, required: true },
});

const events = defineEmits(["messageTimeout"]);
let messagePieces = Array<any>();

onMounted(() => {});
</script>

<template>
  <article>
    <h1>{{ message.author }}</h1>
    <FancyTextEffectComponent :message="props.message.content"></FancyTextEffectComponent>
  </article>
</template>

<style scoped>
.font-chipori {
  font-family: "HobbertChiporiText";
  font-size: 1.5rem;
}

article {
  gap: 0.5rem;
  box-sizing: border-box;
}

article h1 {
  display: inline;
  margin-right: 0.25rem;
  font-size: 1rem;
  font-family: "Ubuntu";
  align-self: flex-start;
  padding: 1px;
}

@keyframes text-flash {
  from {
    text-shadow: 0px 0px 5px rgba(0, 255, 0, 0.5);
  }
  to {
    text-shadow: 0px 0px 0px transparent;
  }
}

.flash-end {
  animation-name: text-flash;
  animation-duration: 2s;
}

article p {
  display: inline;
  font-family: "Inter";
  word-wrap: break-word;
}
</style>
