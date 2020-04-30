
<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>ADD NEW LEVEL</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
      <div class="p-6">
        <vs-input v-validate="'required'" label="Name" name="name" v-model="name" class="mt-5 w-full" />
        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>
        <vs-select v-validate="'required'" v-model="location" name="location"  label="Location" class="w-full">
          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in locations" />
        </vs-select>
        <span class="text-danger text-sm"  v-show="errors.has('location')">{{ errors.first('location') }}</span>
        <div class="flex flex-wrap items-center justify-center p-6 custom-button-between" slot="footer">
          <vs-button class="mr-6 btnCustom" @click="addLevel">Add Data</vs-button>
          <vs-button type="border btnCustom" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
        </div>
      </div>
    </VuePerfectScrollbar>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { ADDLEVEL } from '@/store/actionType'
import { mapState } from 'vuex'
export default {
  name: 'form-level',
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    }
    // locations: {
    //   type: Array
    // }
  },
  data() {
    return {
      name: '',
      settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
      },
      location: "",
    }
  },
  computed: {
    token() {
      return this.$store
    },
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        if(!val) {
          this.$emit('closeSidebar');
          this.name = '';
          window.location.reload();
        }
      }
    },
    ...mapState({
      locations: state => state.auth.initialState.user.user.locations,
      userID: state => state.auth.initialState.user.user._id,
    })
  },
  created() {

  },
  methods: {
    addLevel() {
      this.$validator.validateAll().then(result => {
        if (result) {
          let rdata = {
            name: this.name,
            location: this.location,
            userID: this.userID,
          }
          this.$store.dispatch(ADDLEVEL, rdata).then(
            res => {
              if(res.data.message == 'Added successfully') {
                  this.$vs.notify({ title: res.data.message,  color:'success', position:'top-right' })
              } else if (res.data.message == 'This level has already existed!') {
                  this.$vs.notify({ title: res.data.message,  color:'warning', position:'top-right' })
              }

              this.name = '';
              this.location = ''
            },
            error => {
              console.log(error);
            }
          )
        }
      }
    )
    }
  },
  components: {
    VuePerfectScrollbar,
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    height: calc(100% - 4.3rem);
}
@media(max-width: 800px) {
  .custom-button-between {
    margin-top: 10px;
    padding: 1rem !important;
  }
  .btnCustom {
    padding: .75rem 1rem !important;
  }
}
</style>
