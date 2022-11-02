<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
  message: { type: String, required: true },
});

const emit = defineEmits(["animationComplete"]);

function replaceChar(origString: string, replaceChar: string, index: number): string {
  let firstPart = origString.substring(0, index);
  let lastPart = origString.substring(index + 1);

  let newString = firstPart + replaceChar + lastPart;
  return newString;
}

const random = (length = 8) => {
  // Declare all characters
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  // Pick characers randomly
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

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
      messageContent.value = replaceChar(messageContent.value, random(1), ceiraProcess);
      ceiraProcess++;

      if (ceiraProcess > props.message.length) {
        ceiraProcess = 0;
        chiporiFont.value = false;
        clearInterval(sinasInterval);

        setTimeout(() => {
          sinasInterval = setInterval(() => {
            messageContent.value = replaceChar(messageContent.value, props.message.substring(ceiraProcess, ceiraProcess + 1), ceiraProcess);
            ceiraProcess++;

            if (ceiraProcess > props.message.length) {
              clearInterval(sinasInterval);
              endFlash.value = true;

              emit("animationComplete");
            }
          }, (props.message.length / 1000) * 100);
        }, 100);
      }
    }, (props.message.length / 1000) * 100);
  }, 2000);
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
  font-size: 1.5rem;
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

p {
  display: inline;
  font-family: "Inter";
  word-wrap: break-word;
}
</style>
