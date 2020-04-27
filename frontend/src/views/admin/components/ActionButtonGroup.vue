<template>
  <div class="examplex">
    <vs-dropdown>
      <vs-button class="btn-drop" color="success" type="border" icon="expand_more">{{$t('actions')}}</vs-button>
      <vs-dropdown-menu>
        <vs-dropdown-item @click="updateData()">
          Update
        </vs-dropdown-item>
        <vs-dropdown-item @click="changeStatus()">
          Change Status
        </vs-dropdown-item>
        <vs-dropdown-item @click="removeData()">
          Delete
        </vs-dropdown-item>
        <vs-dropdown-item @click="moveDetail()" v-if="this.route == 'quizz-all' || this.route == 'quizz-activated' || this.route == 'quizz-deactivated' || this.route == 'quizz-unchecked'">
          Detail
        </vs-dropdown-item>
        <!-- <vs-dropdown-item @click="CheckVerfication()" v-if="this.route == 'quizz-all' || this.route == 'quizz-activated' || this.route == 'quizz-deactivated' || this.route == 'quizz-unchecked'">
          Check
        </vs-dropdown-item> -->
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>

</template>
<script>
import { REMOVEDATA, CHANGESTATUS } from '@/store/actionType';
export default {
  name: 'action-button-group',
  data() {
    return {
      isSidebarActive: '',
    }
  },
  props: {
    ID: {
      type: String
    },
    status: {
      type: String
    }
  },
  computed: {
    route() {
      return this.$router.currentRoute.name;
    }
  },
  methods: {
    updateData() {
      let id = this.ID;
      if (this.route == 'level') {
        this.$router.push('level/edit/' + id);
      } else if(this.route == 'users') {
        this.$router.push('users/edit/' + id);
      } else if(this.route == 'categories') {
        this.$router.push('categories/edit/' + id);
      } else if(this.route == 'subjects') {
        this.$router.push('subjects/edit/' + id);
      } else if(this.route == 'chapters') {
        this.$router.push('chapters/edit/' + id);
      } else if(this.route == 'quizz-all' || this.route == 'quizz-activated' || this.route == 'quizz-deactivated' || this.route == 'quizz-unchecked' ) {
        this.$router.push('edit/' + id);
      }
    },
    changeStatus() {
      let rdata = {
        id: this.ID,
        status: this.status,
        route: this.$router.currentRoute.name
      }
      this.$store.dispatch(CHANGESTATUS, rdata).then(
        res => {
          this.$vs.notify({ title:'Changed Status Successfully', color:'success', position:'top-right' })
          setTimeout(function(){ window.location.reload() }, 500);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      )
    },
    removeData() {
      let rdata = {
        id: this.ID,
        route: this.$router.currentRoute.name
      }
      this.$store.dispatch(REMOVEDATA, rdata).then(
        res => {
          this.$vs.notify({ title:'Deleted Successfully', color:'success', position:'top-right' })
          setTimeout(function(){ window.location.reload() }, 500);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      )
    },
    moveDetail() {
      let id = this.ID;
      this.$router.push('detail/' + id);
    }
  }
}
</script>
