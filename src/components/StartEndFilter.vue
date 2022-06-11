<template>
  <div>
    <slot :start="start" :end="end" :items="filtered">
      <div v-for="item of items" style="border: 1px solid">
        {{ item.subject }}
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    start: Date
    end: Date
    items: { start: Date; end: Date; subject: string }[]
  }>(),
  { items: () => [] }
)
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    filtered() {
      return this.items.filter((v) => this.start <= v.start && v.end < this.end)
    },
  },
})
</script>
