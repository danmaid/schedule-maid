<template>
  <table>
    <thead>
      <th>
        <button @click="go(prev)">&lt;</button>
        {{ base.toLocaleDateString() }}
        <button @click="go(next)">&gt;</button>
      </th>
      <th v-for="column of computedColumns">
        {{ column.start.toLocaleDateString() }}
        {{ column.start.toLocaleString('ja-JP', { weekday: 'short' }) }}
      </th>
    </thead>
    <tbody>
      <tr v-for="user of rows">
        <td>{{ user.name }}</td>
        <td v-for="column of computedColumns">
          <StartEndFilter :start="column.start" :end="column.end" :items="user.events"></StartEndFilter>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import StartEndFilter from './StartEndFilter.vue'
import { ComputedDateOptions, ComputedDate, isComputedDateOptions } from '../ComputedDate'

export interface Column extends Record<string, unknown> {
  start: Date | ComputedDateOptions
  end: Date | ComputedDateOptions
}
export interface Row extends Record<string, unknown> {
  name?: string
  events?: any[]
}

export default defineComponent({
  components: { StartEndFilter },
  props: {
    columns: { type: Array as PropType<Column[]>, default: () => [] },
    rows: { type: Array as PropType<Row[]>, default: () => [] },
    next: { type: Object as PropType<ComputedDateOptions>, default: () => ({ offset: { date: 7 } }) },
    prev: { type: Object as PropType<ComputedDateOptions>, default: () => ({ offset: { date: -7 } }) },
  },
  data() {
    return {
      base: new ComputedDate({ fixed: { hours: 0, minutes: 0, seconds: 0, ms: 0 } }, new Date()),
    }
  },
  computed: {
    computedColumns(): { start: Date; end: Date }[] {
      return this.columns.map((v) => ({
        ...v,
        start: isComputedDateOptions(v.start) ? new ComputedDate(v.start, this.base) : new Date(v.start),
        end: isComputedDateOptions(v.end) ? new ComputedDate(v.end, this.base) : new Date(v.end),
      }))
    },
  },
  methods: {
    go(to: ComputedDateOptions) {
      this.base = new ComputedDate(to, this.base)
    },
  },
})
</script>
