
<template>
    <vs-table multiple v-model="selected" @selected="handleSelected" :data="users">

      <template slot="thead">
        <vs-th>Email</vs-th>
        <vs-th>Name</vs-th>
        <vs-th>Website</vs-th>
        <vs-th>Nro</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

          <vs-td :data="data[indextr].email">
            {{ data[indextr].email }}
          </vs-td>

          <vs-td :data="data[indextr].username">
            {{ data[indextr].username }}
          </vs-td>

          <vs-td :data="data[indextr].website">
            {{ data[indextr].website }}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
          </vs-td>

        </vs-tr>
      </template>
    </vs-table>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      users: [],
    }
  },
  methods: {
    handleSelected(tr) {
      this.$vs.notify({
        title: `Selected ${tr.username}`,
        text: `Email: ${tr.email}`
      })
    }
  }
}
</script>
