
<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-table ref="table" multiple v-model="selected"  pagination :max-items="itemsPerPage" search :data="categories">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">
          <vs-button color="danger" type="filled" :style="{marginRight: '10px'}" @click="multipleCategoryDelete"><feather-icon icon="TrashIcon" svgClasses="h-4 w-4" /> {{$t('delete')}}</vs-button>
          <vs-button color="success" type="filled" @click="newData"><feather-icon icon="PlusIcon" svgClasses="h-4 w-4" /> {{$t('new')}}</vs-button>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ categories.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : categories.length }} of {{ categories.length }}</span>
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
        <vs-th sort-key="level">{{$t('level')}}</vs-th>
        <!-- <vs-th sort-key="location">{{$t('language')}}</vs-th> -->
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
              <p class="product-name font-medium">{{ tr.level.name }}</p>
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
import ActionButtonGroup from '../components/ActionButtonGroup.vue';
import AdminService from '@/services/admin.service.js';
import { mapState } from 'vuex';
export default {
  components: {
    ActionButtonGroup
  },
  data() {
    return {
      selected: [],
      itemsPerPage: 10,
      isMounted: false,
      locations: [],
      categories: []
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
    },
    ...mapState({
      user: state => state.admin.user.user._id
    })
  },
  methods: {
    getOrderStatusColor(status) {
      if(status == 'activated') return "success"
      if(status == 'deactivated') return "warning"
    },
    multipleCategoryDelete() {
      let selectedCategory = this.selected;
      var list = [];
      selectedCategory.map(function(value) {
        list.push(value._id);
      });
      return AdminService.multipleCategoryDelete(list).then(
        res => {
          this.$vs.notify({ title:'Deleted Successfully', color:'success', position:'top-right' });
          setTimeout(function(){ window.location.reload() }, 500);
          console.log(res)
        }
      )
    },
    newData() {
      this.$router.push('/admin/category-courses/categories/add');
    }
  },
  created() {
    return AdminService.getCategory(this.user).then(
      res => {
        return this.categories = res.data;
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
