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
  <p :class="[chiporiFont ? 'font-chipori' : 'font-inter', endFlash ? 'flash-end' : '']">{{ messageContent }}</p>
</template>

<style scoped>
.font-chipori {
  font-family: "HobbertChiporiText";
  /* font-size: 1.25rem; */
}

@keyframes text-flash {
  from {
    text-shadow: 0px 0px 5px rgba(0, 255, 0, 1);
  }
  to {
    text-shadow: 0px 0px 0px transparent;
  }
}

@keyframes text-flame {
  from {
    text-shadow: 0px 0px 5px rgba(255, 145, 0, 1);
  }
  to {
    text-shadow: 0px 0px 0px transparent;
  }
}

.flash-end {
  animation-name: text-flash;
  animation-duration: 2s;
}

.flash-flame {
  animation-name: text-flame;
  animation-duration: 2s;
}

p {
  display: inline;
  font-family: Papyrus;
  font-weight: bold;
  word-wrap: break-word;
  user-select: none;
}
</style>
