<script setup lang="ts">
withDefaults(defineProps<{ modelValue: Setting[] }>(), { modelValue: () => [] })
defineEmits<{ (e: 'update:modelValue', modelValue: Setting[]): void }>()
</script>

<template>
  <table>
    <thead>
      <th></th>
      <th style="white-space: nowrap">
        <input v-model="inputDate" type="datetime-local" />
      </th>
      <th :colSpan="Math.max(...settings.map((v) => v.columns.length))">columns</th>
      <th></th>
    </thead>
    <tbody>
      <template v-for="setting of settings">
        <tr>
          <td><button>x</button></td>
          <td>
            <label>タイトル<input v-model="setting.title" type="text" /></label>
            <hr />
            <button @click="go(setting.prev)">&lt;</button>
            <fieldset v-if="setting.prev.fixed">
              <legend>
                <label>固定<input type="checkbox" checked @change="setting.prev.fixed = undefined" /></label>
              </legend>
              <input v-model="setting.prev.fixed.year" type="number" style="width: 7ex" placeholder="年" /> /
              <input v-model="setting.prev.fixed.month" type="number" style="width: 5ex" placeholder="月" /> /
              <input v-model="setting.prev.fixed.date" type="number" style="width: 5ex" placeholder="日" />
              (<input v-model="setting.prev.fixed.day" type="number" style="width: 5ex" placeholder="曜日" />)
              <input v-model="setting.prev.fixed.hours" type="number" style="width: 5ex" placeholder="時" /> :
              <input v-model="setting.prev.fixed.minutes" type="number" style="width: 5ex" placeholder="分" /> :
              <input v-model="setting.prev.fixed.seconds" type="number" style="width: 5ex" placeholder="秒" /> .
              <input v-model="setting.prev.fixed.ms" type="number" style="width: 5ex" placeholder="ミリ秒" />
            </fieldset>
            <label v-else>固定<input type="checkbox" @change="setting.prev.fixed = {}" /></label>
            <fieldset v-if="setting.prev.offset">
              <legend>
                <label>ずらし<input type="checkbox" checked @change="setting.prev.offset = undefined" /></label>
              </legend>
              <input v-model="setting.prev.offset.year" type="number" style="width: 7ex" placeholder="年" /> /
              <input v-model="setting.prev.offset.month" type="number" style="width: 5ex" placeholder="月" /> /
              <input v-model="setting.prev.offset.date" type="number" style="width: 5ex" placeholder="日" />
              <input v-model="setting.prev.offset.hours" type="number" style="width: 5ex" placeholder="時" /> :
              <input v-model="setting.prev.offset.minutes" type="number" style="width: 5ex" placeholder="分" /> :
              <input v-model="setting.prev.offset.seconds" type="number" style="width: 5ex" placeholder="秒" /> .
              <input v-model="setting.prev.offset.ms" type="number" style="width: 5ex" placeholder="ミリ秒" />
            </fieldset>
            <label v-else>ずらし<input type="checkbox" @change="setting.prev.offset = {}" /></label>
            <hr />
            <button @click="go(setting.next)">&gt;</button>
            <fieldset v-if="setting.next.fixed">
              <legend>
                <label>固定<input type="checkbox" checked @change="setting.next.fixed = undefined" /></label>
              </legend>
              <input v-model="setting.next.fixed.year" type="number" style="width: 7ex" placeholder="年" /> /
              <input v-model="setting.next.fixed.month" type="number" style="width: 5ex" placeholder="月" /> /
              <input v-model="setting.next.fixed.date" type="number" style="width: 5ex" placeholder="日" />
              (<input v-model="setting.next.fixed.day" type="number" style="width: 5ex" placeholder="曜日" />)
              <input v-model="setting.next.fixed.hours" type="number" style="width: 5ex" placeholder="時" /> :
              <input v-model="setting.next.fixed.minutes" type="number" style="width: 5ex" placeholder="分" /> :
              <input v-model="setting.next.fixed.seconds" type="number" style="width: 5ex" placeholder="秒" /> .
              <input v-model="setting.next.fixed.ms" type="number" style="width: 5ex" placeholder="ミリ秒" />
            </fieldset>
            <label v-else>固定<input type="checkbox" @change="setting.next.fixed = {}" /></label>
            <fieldset v-if="setting.next.offset">
              <legend>
                <label>ずらし<input type="checkbox" checked @change="setting.next.offset = undefined" /></label>
              </legend>
              <input v-model="setting.next.offset.year" type="number" style="width: 7ex" placeholder="年" /> /
              <input v-model="setting.next.offset.month" type="number" style="width: 5ex" placeholder="月" /> /
              <input v-model="setting.next.offset.date" type="number" style="width: 5ex" placeholder="日" />
              <input v-model="setting.next.offset.hours" type="number" style="width: 5ex" placeholder="時" /> :
              <input v-model="setting.next.offset.minutes" type="number" style="width: 5ex" placeholder="分" /> :
              <input v-model="setting.next.offset.seconds" type="number" style="width: 5ex" placeholder="秒" /> .
              <input v-model="setting.next.offset.ms" type="number" style="width: 5ex" placeholder="ミリ秒" />
            </fieldset>
            <label v-else>ずらし<input type="checkbox" @change="setting.next.offset = {}" /></label>
          </td>
          <td v-for="(column, i) of setting.columns">
            <button @click="setting.columns.splice(i, 1)">x</button>
            <small>
              <div>開始 {{ column.start }}</div>
              <fieldset v-if="column.start.fixed">
                <legend>
                  <label>固定<input type="checkbox" checked @change="column.start.fixed = undefined" /></label>
                </legend>
                <input v-model="column.start.fixed.year" type="number" style="width: 7ex" placeholder="年" /> /
                <input v-model="column.start.fixed.month" type="number" style="width: 5ex" placeholder="月" /> /
                <input v-model="column.start.fixed.date" type="number" style="width: 5ex" placeholder="日" />
                (<input v-model="column.start.fixed.day" type="number" style="width: 5ex" placeholder="曜日" />)
                <input v-model="column.start.fixed.hours" type="number" style="width: 5ex" placeholder="時" /> :
                <input v-model="column.start.fixed.minutes" type="number" style="width: 5ex" placeholder="分" /> :
                <input v-model="column.start.fixed.seconds" type="number" style="width: 5ex" placeholder="秒" /> .
                <input v-model="column.start.fixed.ms" type="number" style="width: 5ex" placeholder="ミリ秒" />
              </fieldset>
              <label v-else>固定<input type="checkbox" @change="column.start.fixed = {}" /></label>
              <fieldset v-if="column.start.offset">
                <legend>
                  <label>ずらし<input type="checkbox" checked @change="column.start.offset = undefined" /></label>
                </legend>
                <input v-model="column.start.offset.year" type="number" style="width: 7ex" placeholder="年" /> /
                <input v-model="column.start.offset.month" type="number" style="width: 5ex" placeholder="月" /> /
                <input v-model="column.start.offset.date" type="number" style="width: 5ex" placeholder="日" />
                <input v-model="column.start.offset.hours" type="number" style="width: 5ex" placeholder="時" /> :
                <input v-model="column.start.offset.minutes" type="number" style="width: 5ex" placeholder="分" /> :
                <input v-model="column.start.offset.seconds" type="number" style="width: 5ex" placeholder="秒" /> .
                <input v-model="column.start.offset.ms" type="number" style="width: 5ex" placeholder="ミリ秒" />
              </fieldset>
              <label v-else>ずらし<input type="checkbox" @change="column.start.offset = {}" /></label>
              <div>終了 {{ column.end }}</div>
              <fieldset v-if="column.end.fixed">
                <legend>
                  <label>固定<input type="checkbox" checked @change="column.end.fixed = undefined" /></label>
                </legend>
                <input v-model="column.end.fixed.year" type="number" style="width: 7ex" placeholder="年" /> /
                <input v-model="column.end.fixed.month" type="number" style="width: 5ex" placeholder="月" /> /
                <input v-model="column.end.fixed.date" type="number" style="width: 5ex" placeholder="日" />
                (<input v-model="column.end.fixed.day" type="number" style="width: 5ex" placeholder="曜日" />)
                <input v-model="column.end.fixed.hours" type="number" style="width: 5ex" placeholder="時" /> :
                <input v-model="column.end.fixed.minutes" type="number" style="width: 5ex" placeholder="分" /> :
                <input v-model="column.end.fixed.seconds" type="number" style="width: 5ex" placeholder="秒" /> .
                <input v-model="column.end.fixed.ms" type="number" style="width: 5ex" placeholder="ミリ秒" />
              </fieldset>
              <label v-else>固定<input type="checkbox" @change="column.end.fixed = {}" /></label>
              <fieldset v-if="column.end.offset">
                <legend>
                  <label>ずらし<input type="checkbox" checked @change="column.end.offset = undefined" /></label>
                </legend>
                <input v-model="column.end.offset.year" type="number" style="width: 7ex" placeholder="年" /> /
                <input v-model="column.end.offset.month" type="number" style="width: 5ex" placeholder="月" /> /
                <input v-model="column.end.offset.date" type="number" style="width: 5ex" placeholder="日" />
                <input v-model="column.end.offset.hours" type="number" style="width: 5ex" placeholder="時" /> :
                <input v-model="column.end.offset.minutes" type="number" style="width: 5ex" placeholder="分" /> :
                <input v-model="column.end.offset.seconds" type="number" style="width: 5ex" placeholder="秒" /> .
                <input v-model="column.end.offset.ms" type="number" style="width: 5ex" placeholder="ミリ秒" />
              </fieldset>
              <label v-else>ずらし<input type="checkbox" @change="column.end.offset = {}" /></label>
            </small>
          </td>
          <td><button @click="setting.columns.push({ start: {}, end: {} })">+</button></td>
        </tr>
        <tr>
          <td></td>
          <td><small>算出</small></td>
          <td v-for="column of setting.columns">
            <small>
              <div>開始 {{ computedDate(column.start).toISOString() }}</div>
              <div>終了 {{ computedDate(column.end).toISOString() }}</div>
            </small>
          </td>
        </tr>
      </template>
      <tr>
        <td><button @click="addRow()">+</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ComputedDate, ComputedDateOptions } from '../ComputedDate'

export interface Setting {
  title: string
  columns: { start: ComputedDateOptions; end: ComputedDateOptions }[]
  next: ComputedDateOptions
  prev: ComputedDateOptions
}

function date2input(date: Date): string {
  return date.toLocaleString('sv-SE').replace(' ', 'T')
}

export default defineComponent({
  data() {
    const base = new ComputedDate({ fixed: { time: 0 } }, new Date())
    return {
      base,
      inputDate: date2input(base),
      settings: this.modelValue,
    }
  },
  watch: {
    modelValue(v: Setting[]) {
      if (v !== this.settings) this.settings = v
    },
    settings(v: Setting[]) {
      this.$emit('update:modelValue', v)
    },
    base(v: Date) {
      this.inputDate = date2input(v)
    },
  },
  methods: {
    computedDate(options: ComputedDateOptions): Date {
      return new ComputedDate(options, this.base)
    },
    addRow() {
      this.settings.push({
        title: '',
        columns: [],
        next: { offset: { date: 1 } },
        prev: { offset: { date: -1 } },
      })
    },
    go(to: ComputedDateOptions) {
      this.base = new ComputedDate(to, this.base)
    },
  },
})
</script>
