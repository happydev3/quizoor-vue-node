
<template>
  <div id="data-list-list-view" class="data-list-container">

    <vs-table ref="table" multiple v-model="selected"  pagination :max-items="itemsPerPage" search :data="users">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">
          <vs-button color="danger" type="border" :style="{marginRight: '10px'}" @click="multipleUserDelete"><feather-icon icon="TrashIcon" svgClasses="h-4 w-4" /> {{$t('delete')}}</vs-button>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ users.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : users.length }} of {{ users.length }}</span>
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
        <vs-th sort-key="status">{{$t('email')}}</vs-th>
        <vs-th sort-key="status">{{$t('role')}}</vs-th>
        <vs-th sort-key="status">{{$t('status')}}</vs-th>
        <vs-th sort-key="status">{{$t('createdAt')}}</vs-th>
        <vs-th sort-key="status">{{$t('location')}}</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td>
              <p class="product-name font-medium">{{ tr.firstname }} {{ tr.lastname }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium">{{ tr.email }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium">{{ tr.role }}</p>
            </vs-td>
            <vs-td>
              <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{ tr.status }}</vs-chip>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium">{{ tr.create_date }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium">{{ tr.locations.join() }}</p>
            </vs-td>
            <vs-td>
              <action-button-group :ID="tr._id" :status="tr.status"></action-button-group>
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
import ActionButtonGroup from '../components/ActionButtonGroup.vue'
import AdminService from '@/services/admin.service.js'
export default {
  components: {
    ActionButtonGroup
  },
  data() {
    return {
      selected: [],
      users: [],
      itemsPerPage: 10,
      isMounted: false,
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
    multipleUserDelete() {
      let selectedLevel = this.selected;
      var list = [];
      selectedLevel.map(function(value) {
        list.push(value._id);
      });
      return AdminService.multipleUserDelete(list).then(
        res => {
          this.$vs.notify({ title:'Deleted Successfully', color:'success', position:'top-right' });
          setTimeout(function(){ window.location.reload() }, 500);
          console.log(res);
        }
      )
    }
  },
  created() {
    return AdminService.getAllUser().then(
      res => {
        // this.users = res.data;
        const items = res.data;
        const temps = [];
        items.map(function(item) {
          const temp = {};
          temp._id = item._id;
          temp.firstname = item.firstname;
          temp.lastname = item.lastname;
          temp.email = item.email;
          temp.role = item.role;
          temp.status = item.status;
          temp.create_date = item.create_date;
          const tempLocation = [];
          item.locations.map(function(location) {
            tempLocation.push(location.text)
          });
          temp.locations = tempLocation;
        temps.push(temp);
        });
        this.users = temps;
      },
      error => {
        this.users = [];
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
