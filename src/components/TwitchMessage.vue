<script setup lang="ts">
import FancyTextEffectComponent from "./FancyTextEffect.vue";
import MessageInstance, { Emote } from "../Models/MessageInstance";
import { onBeforeMount, onMounted, ref } from "vue";

const props = defineProps({
  message: { type: MessageInstance, required: true },
});

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

const events = defineEmits(["messageTimeout"]);
const ID = ref(random(10));

class MessagePiece {
  isEmote: boolean;
  content: string;

  constructor(isEmote: boolean, content: string) {
    this.isEmote = isEmote;
    this.content = content;
  }
}

let messagePieces = Array<MessagePiece>();

function replaceChar(origString: string, replaceChar: string, index: number): string {
  let firstPart = origString.substring(0, index);
  let lastPart = origString.substring(index + 1);

  let newString = firstPart + replaceChar + lastPart;
  return newString;
}

// messagePieces.push(new MessagePiece(false, textBefore));
// messagePieces.push(new MessagePiece(true, `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/light/1.0`));

onBeforeMount(() => {
  if (props.message.emotes.length == 0) {
    messagePieces.push(new MessagePiece(false, props.message.content));
  } else {
    let fullText = props.message.content;
    let nextEnd = -1;
    let latch = false;

    for (let i = 0; i < fullText.length; i++) {
      let ceiraFind = props.message.emotes.find((ceira) => {
        if (ceira.start == i) {
          return true;
        }
        return false;
      });

      if (ceiraFind != null) {
        console.log("Insert emote");
        messagePieces.push(new MessagePiece(true, `https://static-cdn.jtvnw.net/emoticons/v2/${ceiraFind.id}/default/light/1.0`));

        nextEnd = ceiraFind.end;

        latch = true;
        continue;
      }

      if (latch) {
        if (i == nextEnd) {
          latch = false;
        }

        continue;
      }

      messagePieces.push(new MessagePiece(false, fullText[i]));
    }

    props.message.emotes.reverse().forEach((emote, index) => {});
  }
});

onMounted(() => {
  let usernameTitle = document.getElementById(ID.value);
  if (usernameTitle) {
    usernameTitle.style.color = props.message.userColor;
  }
});
</script>

<template>
  <article>
    <h1 :id="ID">{{ message.author }}</h1>
    <span v-for="piece in messagePieces">
      <FancyTextEffectComponent v-if="!piece.isEmote" :message="piece.content"></FancyTextEffectComponent>
      <img v-if="piece.isEmote" :src="piece.content" />
    </span>
  </article>
</template>

<style scoped>
.font-chipori {
  font-family: "HobbertChiporiText";
  font-size: 1.3rem;
  font-weight: bold;
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
