
<template>
  <div id="data-list-list-view" class="data-list-container">

    <LevelForm :isSidebarActive="addNewDataSidebar"  @closeSidebar="addNewDataSidebar = false"/>
    <!-- <vs-card> -->
    <vs-table ref="table" multiple v-model="selected"  pagination :max-items="itemsPerPage" search :data="levels">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">
          <vs-button color="danger" type="border" :style="{marginRight: '10px'}" @click="multipleLevelDelete"><feather-icon icon="TrashIcon" svgClasses="h-4 w-4" /> {{$t('delete')}}</vs-button>
          <vs-button color="success" type="border" @click="newData"><feather-icon icon="PlusIcon" svgClasses="h-4 w-4" /> {{$t('new')}}</vs-button>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ levels.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : levels.length }} of {{ levels.length }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <vs-dropdown-menu>
            <vs-dropdown-item @click="itemsPerPage=5">
              <span>5</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th sort-key="name">{{$t('name')}}</vs-th>
        <vs-th sort-key="status">{{$t('status')}}</vs-th>
        <vs-th sort-key="location">{{$t('language')}}</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td>
              <p class="product-name font-medium">{{ tr.name }}</p>
            </vs-td>
            <vs-td>
              <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{ tr.status }}</vs-chip>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium">{{ tr.location }}</p>
            </vs-td>
            <vs-td>
              <action-button-group :ID="tr._id" :status="tr.status"></action-button-group>
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <!-- </vs-card> -->
  </div>
</template>

<script>
import LevelForm from './LevelForm.vue';
import ActionButtonGroup from '../components/ActionButtonGroup.vue'
import { GETLEVEL } from '@/store/actionType';
import AdminService from '@/services/admin.service.js'
export default {
  components: {
    LevelForm,
    ActionButtonGroup
  },
  data() {
    return {
      selected: [],
      levels: [],
      itemsPerPage: 10,
      isMounted: false,
      addNewDataSidebar: false,
    }
  },
  computed: {
    currentRoute() {
      return this.$router.currentRoute.name;
    },
    currentPage() {
      if(this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    }
  },
  methods: {
    getOrderStatusColor(status) {
      if(status == 'activated') return "success"
      if(status == 'deactivated') return "warning"
    },
    newData(){
      this.addNewDataSidebar = true;
    },
    multipleLevelDelete() {
      let selectedLevel = this.selected;
      var list = [];
      selectedLevel.map(function(value) {
        list.push(value._id);
      });
      return AdminService.multipleLevelDelete(list).then(
        res => {
          this.$vs.notify({ title:'Deleted Successfully', color:'success', position:'top-right' });
          setTimeout(function(){ window.location.reload() }, 500);
          console.log(res)
        }
      )
    }
  },
  created() {
    this.$store.dispatch(GETLEVEL).then(
      res => {
        this.temps = res.data;
        const items = []
        this.temps.map(function(temp) {
           let item = {}
           item._id = temp._id;
           item.name = temp.name;
           item.status = temp.status;
           if (temp.location == 'en') {
             item.location = 'English'
           } else if (temp.location == 'fr') {
             item.location = 'French'
           } else if (temp.location == 'de') {
             item.location = 'German'
           } else if (temp.location == 'pt'){
             item.location = 'Portugese'
           }
           items.push(item);
        })
        console.log(items);
        this.levels = items;
      },
      error => {
        console.log(error);
      }
    )
  },
  mounted() {
    this.isMounted = true;
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/custom/table.scss"
</style>
