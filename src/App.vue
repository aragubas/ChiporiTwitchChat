<script setup lang="ts">
import TwitchJs from "twitch-js";
import TwitchMessageComponent from "./components/TwitchMessage.vue";
import MessageInstance from "./Models/MessageInstance";

import { ref } from "vue";

const twitchJs = new TwitchJs({
  username: "ChiporiChat",
  token: "oauth:tmrrqkavhxtpg07lx9wiymjw6kyeli",
  clientId: "",
});

const messages = ref(new Array<MessageInstance>());

twitchJs.chat.on("PRIVMSG", (message) => {
  messages.value.push(new MessageInstance(message.username, message.message, (message.tags as any).color));
});

twitchJs.chat.connect().then(async () => {
  await twitchJs.chat.join("#luciditygear");
});
</script>

<template>
  <div class="messages-container">
    <ol>
      <li v-for="message in messages">
        <TwitchMessageComponent :message="message"></TwitchMessageComponent>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.messages-container {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100vh;
}

ol {
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
  list-style: none;
  margin: 0px;
  padding: 0px;
}
</style>
