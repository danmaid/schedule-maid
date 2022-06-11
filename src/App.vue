<template>
  <div>{{ users }}</div>
  <hr />

  <label v-for="(setting, i) of settings">
    <input v-model="mode" type="radio" name="mode" :value="i" />{{ setting.title }}
  </label>
  <label><input v-model="mode" type="radio" name="mode" value="setting" />設定</label>

  <div style="float: right">
    <button @click="imp">import</button>
    <button @click="exp">export</button>
    <button @click="reset">reset</button>
  </div>

  <hr />

  <template v-if="mode === 'setting'">
    <SettingTable v-model="settings"></SettingTable>
  </template>
  <template v-else-if="typeof mode === 'number'">
    <ScheduleTable :columns="settings[mode].columns" :rows="users"></ScheduleTable>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ScheduleTable from './components/ScheduleTable.vue'
import SettingTable, { Setting } from './components/SettingTable.vue'

function load(): Setting[] {
  try {
    const data = localStorage.getItem('settings')
    if (data) {
      const settings = JSON.parse(data)
      console.debug('loaded.', settings)
      return settings
    }
  } catch (err) {
    console.error(err)
  }
  // デフォルト
  return [
    {
      title: '月～日',
      columns: [...Array(7)].map((_, i) => ({
        start: { fixed: { day: i + 1 } },
        end: { fixed: { day: i + 1 }, offset: { date: 1 } },
      })),
      next: { offset: { date: 7 } },
      prev: { offset: { date: -7 } },
    },
  ]
}

function save(v: Setting[]) {
  localStorage.setItem('settings', JSON.stringify(v))
  console.debug('saved.', v)
}

export default defineComponent({
  components: { ScheduleTable, SettingTable },
  data() {
    return {
      settings: load(),
      users: [
        {
          id: 'u1',
          name: 'u1',
          events: [
            { id: 'e1', subject: 'e1', start: new Date(), end: new Date() },
            { id: 'e2', subject: 'e2', start: new Date(), end: new Date() },
          ],
        },
        { id: 'u2', name: 'u2' },
        { id: 'u3', name: 'u3' },
      ],
      mode: 0 as number | 'setting',
    }
  },
  watch: {
    settings: {
      deep: true,
      handler(v) {
        save(v)
      },
    },
  },
  methods: {
    reset() {
      localStorage.removeItem('settings')
      this.settings = load()
    },
    exp() {
      const file = new Blob([JSON.stringify(this.settings)], { type: 'text/plain' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(file)
      a.download = 'schedule-maid.json'
      a.click()
    },
    imp() {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = async () => {
        try {
          const text = await input.files?.[0].text()
          if (!text) throw Error('text not found.')
          this.settings = JSON.parse(text)
        } catch (err) {
          alert('import failed.')
          console.error(err)
        }
      }
      input.click()
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
