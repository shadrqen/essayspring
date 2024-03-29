<template>
  <div>
    <client-only>
      <nav-drawer :drawer="drawer" />
      <v-container fluid>
        <base-table
          :drawer="drawer"
          :selected-order="false"
          :table-data="{ headers: headers, items: orders, title: orderStatusTitle }"
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
                  @change="getOrders(false)"
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
  name: 'Orders',
  components: { NavDrawer, BaseTable },
  data () {
    return {
      drawer: false,
      headers: [
        {
          text: 'ORDER ID',
          align: 'start',
          value: 'id'
        },
        { text: 'TOPIC', value: 'topic', subValue: null, isAnArray: false },
        { text: 'DISCIPLINE', value: 'Discipline', subValue: 'discipline', isAnArray: false },
        { text: 'PAGES', value: 'pageCount', subValue: null, isAnArray: false },
        { text: 'DEADLINE', value: 'deadlineDate', subValue: null, isAnArray: false },
        { text: 'STATUS', value: 'OrderStatus', subValue: 'status', isAnArray: false },
        { text: 'CPP', value: 'OrderPaymentDetail', subValue: 'cpp', isAnArray: true },
        { text: 'TOTAL', value: 'OrderPaymentDetail', subValue: 'totalPrice', isAnArray: true }
      ],
      orders: [],
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
      orderStatusTitle: 'All Orders'
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
  },
  mounted () {
    this.changeFormsStateSet(false)
    this.getOrders(true)
    this.getOrderStatusTypes()
    bus.$on('getOrders', (orderId) => {
      this.selectedOrder = orderId
      this.getOrders(false)
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
    async getOrders (unFiltered) {
      this.overlay = true
      let orderStatusID = null
      if (!unFiltered) {
        orderStatusID = this.selectedOrder
      }
      /* The url get_orders is used both for getting single and multiple orders */
      await api.postRequest('orders/v1/get_orders', {
        multiple: true,
        orderStatusID: orderStatusID
      })
        .then(response => {
          if (!unFiltered) {
            this.orderStatusTitle = this.orderStatusTypes.filter(type => type.id === this.selectedOrder)[0].status
          }
          this.orders = response.orders
          this.overlay = false
        })
        .catch(() => {
          this.overlay = false
        })
    }
  },
  head: {
    title: 'Orders',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'EssaySpring Orders'
      }
    ]
  }
}
</script>

<style lang="scss" scoped>

@import "../../styles/general/general";

</style>
