<script setup lang="ts">
import TwitchJs from "twitch-js";
import TwitchMessageComponent from "./components/TwitchMessage.vue";
import MessageInstance from "./Models/MessageInstance";

import { onMounted, ref } from "vue";

const twitchJs = new TwitchJs({
  username: "ChiporiChat",
  token: "oauth:oxfpnjqybpz4r3ul95uatcs65ckpgo",
  clientId: "",
});

const messages = ref(new Array<MessageInstance>());

function createMessage(username: string, message: string, tags: any) {
  let messageInstance = new MessageInstance(username + ":", message, (tags as any).color, (tags as any).emotes);
  messages.value.push(messageInstance);

  setTimeout(() => {
    messages.value = messages.value.filter((element) => {
      return element.id != messageInstance.id;
    });
  }, 10000);
}

twitchJs.chat.on("PRIVMSG", (message) => {
  createMessage(message.username, message.message, message.tags as any);
});

twitchJs.chat.connect().then(async () => {
  await twitchJs.chat.join("#luciditygear");
  createMessage("System", "Welcome to Chat!", { color: "rgb(255, 0, 0)", emotes: [] });
});
</script>

<template>
  <div class="messages-container">
    <TransitionGroup name="messages" tag="ol">
      <li v-for="message in messages" :key="message.id">
        <TwitchMessageComponent :message="message"></TwitchMessageComponent>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.messages-container {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100vh;
}

.messages-enter-active,
.messages-leave-active {
  transition: all 0.5s ease;
}
.messages-enter-from,
.messages-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

ol {
  display: flex;
  gap: 0.1rem;
  flex-direction: column;
  list-style: none;
  margin: 0px;
  padding: 0px;
}
</style>
