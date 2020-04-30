<template>
  <vs-card class="add-form">
    <div slot="header">
      <h3>
        Level Edit Form
      </h3>
    </div>
    <vx-input-group class="mb-base">
      <vs-input v-model="name" />

      <template slot="append">
        <div class="append-text btn-addon">
          <vs-button color="success" type="border" @click="updateLevel">Update</vs-button>
          <vs-button color="warning" type="border" @click="back">Cancel</vs-button>
        </div>
      </template>
    </vx-input-group>
  </vs-card>
</template>

<script>
import AdminService from '@/services/admin.service.js'
export default {
  data() {
    return {
      name: '',
    }
  },
  created() {
    const id = this.$router.currentRoute.params.id;
    return AdminService.getLevelById(id).then(
      res => {
        this.name = res.data.name;
      },
      error => {
        console.log(error)
      }
    )
  },
  methods: {
    updateLevel() {
      let rdata = {
        id: this.$router.currentRoute.params.id,
        name: this.name
      }
      return AdminService.updateLevelById(rdata).then(
        res => {
          if(res.data.message == 'successfully updated') {
            this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
            setTimeout(() => { this.$router.push('/admin/level') }, 500);
          } else if (res.data.message == 'This level has already existed!') {
            this.$vs.notify({ title: res.data.message, color:'warning', position:'top-right' });
          }
        }
      )
    },
    back() {
      this.$router.push('/admin/level');
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/custom/table.scss"
</style>
