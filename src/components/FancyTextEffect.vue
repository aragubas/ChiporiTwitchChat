<script setup lang="ts">
import { randomString } from "../utils";
import { onMounted, ref } from "vue";

const props = defineProps({
  message: { type: String, required: true },
  index: { type: Number, required: true },
});

const emit = defineEmits(["animationComplete"]);

function replaceChar(origString: string, replaceChar: string, index: number): string {
  let firstPart = origString.substring(0, index);
  let lastPart = origString.substring(index + 1);

  let newString = firstPart + replaceChar + lastPart;
  return newString;
}

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
      messageContent.value = replaceChar(messageContent.value, randomString(1), ceiraProcess);

      ceiraProcess++;
      if (ceiraProcess == 1) {
        ceiraProcess = 0;
        chiporiFont.value = false;

        clearInterval(sinasInterval);
        setTimeout(() => {
          sinasInterval = setInterval(() => {
            messageContent.value = replaceChar(messageContent.value, props.message.substring(ceiraProcess, ceiraProcess + 1), ceiraProcess);
            ceiraProcess++;

            if (ceiraProcess == 1) {
              clearInterval(sinasInterval);
              endFlash.value = true;

              emit("animationComplete");
            }
          }, props.index * 10);
        }, 20);
      }
    }, props.index * 10);
  }, 2600);
}

onMounted(() => {
  mountedAnimation();
});
</script>

<template>
  <p :class="[chiporiFont ? 'font-chipori' : 'font-inter', endFlash ? 'flash-end' : '']">{{ messageContent }}</p>
</template>

<style scoped>
.font-chipori {
  font-family: "HobbertChiporiText";
  font-size: 1.25rem;
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
}
</style>
