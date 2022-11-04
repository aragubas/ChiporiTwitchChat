<script setup lang="ts">
import { isAlphaNumeric, randomStringLowercase, replaceChar } from "../utils";
import { onMounted, ref } from "vue";

const props = defineProps({
  message: { type: String, required: true },
  index: { type: Number, required: true },
  timeScale: { type: Number, required: true },
});

const emit = defineEmits(["animationComplete"]);

const messageContent = ref(props.message);
const chiporiFont = ref(true);
const endFlash = ref(false);
let ceiraProcess = 0;
let sinasInterval = 0;

function mountedAnimation() {
  if (typeof messageContent.value != "string") {
    console.error("Could not animate. messageContent is a not a string.");
    console.debug(typeof messageContent.value);
    return;
  }
  setTimeout(() => {
    sinasInterval = setInterval(() => {
      messageContent.value = replaceChar(messageContent.value, randomStringLowercase(1), ceiraProcess);

      ceiraProcess++;
      if (ceiraProcess == 1) {
        ceiraProcess = 0;
        clearInterval(sinasInterval);
        chiporiFont.value = false;

        sinasInterval = setInterval(() => {
          messageContent.value = replaceChar(messageContent.value, props.message.substring(ceiraProcess, ceiraProcess + 1), ceiraProcess);
          ceiraProcess++;

          if (ceiraProcess == 1) {
            clearInterval(sinasInterval);
            endFlash.value = true;

            emit("animationComplete");
          }
        }, (props.index * props.timeScale) / 2);
      }
    }, props.index * props.timeScale);
  }, 1500);
}

onMounted(() => {
  if (messageContent.value != " " && isAlphaNumeric(messageContent.value)) {
    mountedAnimation();
  }
});
</script>

<template>
  <p :class="[chiporiFont ? 'font-chipori' : '', endFlash ? 'flash-end' : '']">{{ messageContent }}</p>
</template>

<style scoped>
.font-chipori {
  font-family: "HobbertChiporiText";
  /* font-size: 1.25rem; */
}

p {
  --text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}

@keyframes text-flash {
  from {
    color: rgba(55, 200, 55, 1);
  }
  to {
    color: white;
  }
}

.flash-end {
  animation-name: text-flash;
  animation-duration: 0.25s;
}

p {
  display: inline;
  font-family: Papyrus;
  font-size: 0.9rem;
  font-weight: bold;
  word-wrap: break-word;
  user-select: none;
  color: white;

  text-shadow: var(--text-shadow);
}
</style>
