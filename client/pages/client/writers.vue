<!--Just like the orders page, it shows the private writers that a user has-->
<template>
  <div>
    <client-only>
      <nav-drawer :drawer="drawer" />
      <v-container fluid>
        <base-table
          :drawer="drawer"
          :selected-order="false"
          :table-data="{ headers: headers, items: items, title: orderStatusTitle }"
        >
          <template #table-filters>
            <v-row
              class="mb-n3"
              no-gutters
            >
              <v-col
                class="pr-1"
                v-bind="attrs"
              >
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  hide-details
                  label="Search"
                  single-line
                />
              </v-col>
              <v-col
                class="pl-1"
                v-bind="attrs"
              >
                <v-select
                  :items="['Time', 'Order Type']"
                  label="Filter By"
                />
              </v-col>
              <v-col
                class="pl-1"
                v-bind="attrs"
              >
                <v-select
                  v-model="selectedOrder"
                  :items="orderStatusTypes"
                  item-text="status"
                  item-value="id"
                  label="Orders"
                  @change="getWriters()"
                />
              </v-col>
            </v-row>
          </template>
        </base-table>
      </v-container>
    </client-only>
    <v-overlay
      :value="overlay"
      opacity="0.9"
    >
      <div class="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </v-overlay>
  </div>
</template>

<script>

import BaseTable from '../../components/general/BaseTable'
import api from '../../api/api'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import NavDrawer from '../../components/general/NavDrawer'
import { bus } from '../../plugins/bus'
import authMixin from '../../utils/auth'

export default {
  name: 'Writers',
  components: { NavDrawer, BaseTable },
  data () {
    return {
      headers: [
        {
          text: 'WRITER ID',
          align: 'start',
          value: 'id'
        },
        { text: 'SURNAME', value: 'Writer', subValue: 'surname', isAnArray: false },
        { text: 'OTHER NAMES', value: 'Writer', subValue: 'otherNames', isAnArray: false },
        { text: 'PHONE NUMBER', value: 'Writer', subValue: 'mobileNo', isAnArray: false },
        { text: 'MEMBER SINCE', value: 'Writer', subValue: 'createdAt', isAnArray: false },
        { text: 'APPROVED', value: 'connectionConfirmed', subValue: null, isAnArray: false }
      ],
      drawer: false,
      items: [],
      overlay: true,
      attrs: {
        cols: 12,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
      selectedOrder: 0,
      search: '',
      orderStatusTitle: 'My Writers'
    }
  },
  computed: {
    ...mapGetters(['orderStatusTypes']),
    mini () {
      let val
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          val = true
          break
        case 'sm':
          val = true
          break
        case 'md':
          val = true
          break
        case 'lg':
          val = false
          break
        case 'xl':
          val = false
          break
      }
      return val
    }
  },
  created () {
    if (process.env.VUE_ENV === 'client') {
      this.drawer = !this.mini
      if (!authMixin.tokenIsValid()) {
        this.$router.push('/')
      }
    }
    this.getWriters()
  },
  mounted () {
    this.changeFormsStateSet(false)
    this.getOrderStatusTypes()
    bus.$on('getWriters', (orderId) => {
      this.selectedOrder = orderId
      this.getWriters()
    })
    bus.$on('mutateDrawer', () => {
      this.drawer = !this.drawer
    })
    if (process.env.VUE_ENV === 'client') {
      window.scrollTo(0, 0)
    }
  },
  methods: {
    ...mapMutations(['changeFormsStateSet']),
    ...mapActions(['getOrderStatusTypes']),
    async getWriters (completed) {
      this.overlay = true
      await api.getRequest('users/v1/get_writers')
        .then(response => {
          this.items = response.writers
          this.overlay = false
        })
        .catch(() => {
          this.overlay = false
        })
    }
  },
  head: {
    title: 'Writers',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'EssaySpring Writers'
      }
    ]
  }
}
</script>

<style lang="scss" scoped>

@import "../../styles/general/general";

</style>
