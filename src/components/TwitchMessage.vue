<script setup lang="ts">
import FancyTextEffectComponent from "./FancyTextEffect.vue";
import MessageInstance, { Emote } from "../Models/MessageInstance";
import { onBeforeMount, onMounted, ref } from "vue";
import { randomString } from "@/utils";

const props = defineProps({
  message: { type: MessageInstance, required: true },
});

const events = defineEmits(["messageTimeout"]);
const ID = ref(randomString(10));

class MessagePiece {
  isEmote: boolean;
  content: string;
  index: number;
  timeScale: number;

  constructor(isEmote: boolean, content: string, index: number, timeScale: number = 0) {
    this.isEmote = isEmote;
    this.content = content;
    this.index = index;
    this.timeScale = timeScale;
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
  let timeScale = 10;

  if (props.message.content.length < 40) {
    timeScale = 20;
  } else if (props.message.content.length > 200) {
    timeScale = 1;
  }

  console.debug(props.message.content.length);
  console.debug(timeScale);

  if (props.message.emotes.length == 0) {
    for (let i = 0; i < props.message.content.length; i++) {
      messagePieces.push(new MessagePiece(false, props.message.content[i], i, timeScale));
    }
  } else {
    let fullText = props.message.content;
    let nextEnd = -1;
    let latch = false;
    let textMerge = "";

    for (let i = 0; i < fullText.length; i++) {
      let ceiraFind = props.message.emotes.find((ceira) => {
        if (ceira.start == i) {
          return true;
        }
        return false;
      });

      if (ceiraFind != null) {
        messagePieces.push(new MessagePiece(true, `https://static-cdn.jtvnw.net/emoticons/v2/${ceiraFind.id}/default/light/1.0`, i));

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

      messagePieces.push(new MessagePiece(false, fullText[i], i, timeScale));
    }
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
      <FancyTextEffectComponent v-if="!piece.isEmote" :message="piece.content" :index="piece.index" :time-scale="piece.timeScale"></FancyTextEffectComponent>
      <img v-if="piece.isEmote" :src="piece.content" />
    </span>
  </article>
</template>

<style scoped>
.font-chipori {
  font-family: "HobbertChiporiText";
  /* font-size: 1.3rem; */
  font-weight: bold;
}

article {
  gap: 0.25rem;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.1rem;
  border-radius: 4px;
}

article h1 {
  display: inline;
  margin-right: 0.25rem;
  font-size: 1rem;
  font-family: Papyrus;
  align-self: flex-start;
  padding: 1px;
  user-select: none;
  text-shadow: var(--text-shadow);
}
</style>
