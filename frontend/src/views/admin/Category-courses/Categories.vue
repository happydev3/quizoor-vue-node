
<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-card>
      <div slot="header">
        <h3>
          Category Add Form
        </h3>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input class="w-full" label-placeholder="Name" v-validate="'required'" name="name" v-model="name" />
          <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-select v-validate="'required'" v-model="level" name="level" autocomplete label="Level" class="w-full">
            <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in levels" />
          </vs-select>
          <span class="text-danger text-sm"  v-show="errors.has('level')">{{ errors.first('level') }}</span>
        </div>
      </div>
      <div class="vx-row" :style="{marginTop: '10px'}">
        <div class="vx-col w-full">
          <vs-button class="mr-3 mb-2" @click.prevent="submitForm">Add Data</vs-button>
          <vs-button color="warning" type="border" class="mb-2" @click="name = level = '';">Reset</vs-button>
        </div>
      </div>
    </vs-card>
    <vs-card>
    <vs-table ref="table" multiple v-model="selected"  pagination :max-items="itemsPerPage" search :data="levels">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">
          <vs-button color="danger" type="border" :style="{marginRight: '10px'}" @click="multipleLevelDelete"><feather-icon icon="TrashIcon" svgClasses="h-4 w-4" /> {{$t('delete')}}</vs-button>
          <!-- <vs-button color="success" type="border" @click="newData"><feather-icon icon="PlusIcon" svgClasses="h-4 w-4" /> {{$t('new')}}</vs-button> -->
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

      <!-- <template slot-scope="{data}">
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
      </template> -->
    </vs-table>
    </vs-card>
  </div>
</template>

<script>
import ActionButtonGroup from '../components/ActionButtonGroup.vue'
import AdminService from '@/services/admin.service.js'
import { GETLEVEL } from '@/store/actionType';
import { mapState } from 'vuex';
export default {
  components: {
    ActionButtonGroup
  },
  data() {
    return {
      selected: [],
      levels: [],
      itemsPerPage: 10,
      isMounted: false,
      name: '',
      level: '',
      locations: []
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
    submitForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          let rdata = {
            name: this.name,
            levelID: this.level,
            userID: this.user
          }
          console.log('+_++++++++++++++++++',rdata);
          return AdminService.addCategory(rdata).then(
            res => {
              this.$vs.notify({ title: res.data.message, color:'success', position:'top-right' });
              setTimeout(() => { window.location.reload() }, 500);
            }
          )
        }
      })
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
        this.items = res.data;
        let tempData = [];
        this.items.map(function(item) {
          if(item.status == 'activated') {
            tempData.push({
              id: item._id,
              name: item.name
            })
          }
        })
        this.levels = tempData;
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
