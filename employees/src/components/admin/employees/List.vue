<template>
  <div class="employees">
    <h1>Employees List</h1>
    <v-app>
    <v-card class="wrap">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
       <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.salary" label="Salary"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.age" label="Age"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search" :loading="loading" loading-text="Loading... Please wait">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-3" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem()">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
  </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
export default {
  name: 'Employees',
  data() {
    return {
      search: '',
      loading: false,
      dialog: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: 'Username', value: 'employee_name', sortable: false},
        { text: 'Salary', value: 'employee_salary', sortable: false },
        { text: 'Age', value: 'employee_age', sortable: true },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      data: [],
      editedItem: {
        id: null,
        username: '',
        salary: 0,
        age: 0
      },
      editedIndex: -1,
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  mounted() {
    this.loadEmployees()
  },
  methods: {
    loadEmployees() {
      this.loading = true
      this.$store.dispatch('getEmployees').then(response => {
        this.loading = false
        this.data = response.data
      })
    },
    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.dialog = true
    },
    deleteItem () {
     
    },
    close () {
      this.dialog = false
    },
    createEmployees() {
      let data = {
        name: this.editItem.username,
        salary: this.editItem.salary,
        age: this.editItem.age
      }
       this.$store.dispatch('createEmployees', {params: data}).then(() => {
         this.loadEmployees()
       }).catch(() => {
         console.log('errors')
       }) 
    },
    save () {
      if (this.editedIndex > -1) {
        // Object.assign(this.desserts[this.editedIndex], this.editedItem)
        console.log('edit')
      } else {
        this.createEmployees()
        this.loadEmployees()
      }
      this.close()
    },
  }
}
</script>
<style lang="scss" scoped>
  .employees {
    .wrap {
      width: 80%;
      max-width: 1000px;
      margin: 0 auto;
      margin-top: 30px;
    }
  }
</style>
