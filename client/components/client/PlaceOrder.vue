<!--The first of four components on the order placement process -->
<!--Here, the user specifies order instructions such as page count, formatting style etc-->
<!--IMPORTANT: There is a variable used throughout the component - clientPostOrderForm.type-->
<!--This variable determines whether a client wants to post orders to public writers or private ones-->
<!--The variable determines the fields displayed on the form.-->
<template>
  <v-card
      class="mb-8"
      flat
  >
<!--    The main element loads only after the allStatesLoaded variable is true-->
<!--    This variable is expounded on the computed properties, but essentially turns true only if-->
<!--    some state variables have been loaded successfully. This helps ensure that the DOM does-->
<!--    not break-->
    <template v-if="allStatesLoaded">
      <v-form ref="clientPostOrderForm">
        <v-row no-gutters :style="xl ? 'margin-left: 12vw; margin-right: 11vw;' : ''">
<!--          First column - with contents dependent on the type of client (public vs private)-->
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" :class="isMobile ? 'mb-6' : ''">
            <label class="text_field_label">Assignment Type</label>
            <v-select
                flat
                :items="assignmentTypes"
                item-text="type"
                item-value="id"
                data-cy="assignment-type-input-hero"
                class="text-field"
                color="green"
                label="Select assignment type"
                v-model="clientPostOrderForm.assignmentType"
                :rules="validate.assignmentTypeField"
                @change="priceCalculationIsNecessary"
                chips
                deletable-chips
                solo
            ></v-select>
            <br>
            <label class="text_field_label">Subject</label>
            <v-select
                flat
                data-cy='discipline-input'
                :items="disciplines"
                item-text="discipline"
                item-value="id"
                class="text-field"
                label="What is the subject?"
                v-model="clientPostOrderForm.paperSubject"
                :rules="validate.paperSubjectField"
                chips
                deletable-chips
                solo
            ></v-select>
            <br>
            <label
                class="text_field_label"
            >Topic</label>
            <v-text-field
                flat
                id="topic"
                class="text-field"
                label="What is the topic of your paper?"
                v-model="clientPostOrderForm.topic"
                :rules="validate.paperTopicField"
                solo
            ></v-text-field>
            <br>
            <label class="text_field_label mt-n2">Number of pages</label>
            <br>
            <div style="width: 100%; overflow: hidden; display: block">
              <div style="float: left; width: 70%">
                <v-btn-toggle
                    v-model="toggleNumOfPages"
                    mandatory
                    id="num-of-pages-btn-toggle"
                >
                  <v-btn
                      id="num-of-pages-buttons-client-remove"
                      outlined
                      :disabled="clientPostOrderForm.pageCount === 1"
                      @click="changePageCount('remove')"
                  >
                    <v-icon>remove</v-icon>
                  </v-btn>
                  <v-text-field
                      id="num_of_pages"
                      flat
                      class="num-of-pages-text-field"
                      @keypress="validateNumOfPages"
                      v-model="clientPostOrderForm.pageCount"
                      solo
                  ></v-text-field>
                  <v-btn
                      id="num-of-pages-buttons-client-add"
                      outlined
                      @click="changePageCount('add')"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </div>
              <div style="float: right; width: 30%; color: grey; font-size: 14px; padding-left: 5px; padding-right: 5px">
                {{ orderFormat.wordsPerPage }} words
                <br>
                ({{ orderFormat.spacing }})
              </div>
            </div>
            <span v-if="numOfPagesError.status" class="input-error"> {{ numOfPagesError.message }} </span>
            <br>
            <label class="text_field_label">Number of sources</label>
            <v-text-field
              flat
              class="text-field"
              id="sources"
              label="How many sources?"
              v-model="clientPostOrderForm.sources"
              @keyup="checkSourcesLimit"
              solo
            ></v-text-field>
            <span v-if="sourcesExceeded" class="input-error"> {{ sourcesExceededMessage }} </span>
            <br>
            <div>
              <label class="text_field_label">
                Deadline
                <deadline color="#007991" :deadline="deadline"></deadline>
              </label>
              <v-row no-gutters>
                <v-col cols="6" xl="6" lg="6" md="6" sm="6">
                  <v-menu
                      id="deadline_date_menu"
                      ref="deadline_date_menu"
                      v-model="deadlineDateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="400"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="clientPostOrderForm.deadlineDate"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          flat
                          class="text-field"
                          label="Date"
                          :rules="validate.deadlineDate"
                          solo
                          color="#007991"
                          append-icon="mdi-calendar"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="clientPostOrderForm.deadlineDate"
                        @input="deadlineDateMenu = false"
                        @change="priceCalculationIsNecessary"
                        :min="currentDate"
                        no-title
                        color="#007991"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="1" xl="1" lg="1" md="1" sm="1"></v-col>
                <v-col cols="5" xl="5" lg="5" md="5" sm="5">
                  <v-select
                      v-model="clientPostOrderForm.deadlineTime"
                      append-icon="schedule"
                      :items="filteredDisabledTimes"
                      :disabled="!clientPostOrderForm.deadlineDate"
                      item-text="time"
                      item-value="id"
                      flat
                      color="#007991"
                      data-cy='deadline-time-input'
                      class="text-field"
                      :rules="validate.deadlineTime"
                      @change="priceCalculationIsNecessary"
                      label="Time"
                      solo
                  ></v-select>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" :style="viewportCode !== 'xs' ? 'padding-left: 15px;' +
             'padding-right: 15px' : ''">
            <label class="text_field_label">Paper instructions</label>
            <v-textarea
                flat
                solo
                no-resize
                :height="tAHeight"
                :style="{ height: textAreaHeight }"
                id="paper_instructions"
                class="text-area"
                v-model="clientPostOrderForm.instructions"
                placeholder="Give us the specific instructions of the paper and other details"
            ></v-textarea>
            <br>
            <label
                class="text_field_label"
            >Upload supporting files</label>
            <br>
            <div
                class="text_field"
                @click='pickFile'
                @dragover.prevent @drop.prevent
                @drop="uploadCurrentFile"
            >
              <input
                  type="file"
                  style="display: none"
                  ref="image"
                  id="file"
                  accept=".pdf, .jpg, .jpeg, .png, .doc, .docx, .xls, .xlsx, .odt, .csv, .txt, video/*, audio/*"
                  @change="uploadCurrentFile"
              >
              <span v-if="supportingFileUploading">
                        <v-progress-circular
                            :size="30"
                            color="#007991"
                            indeterminate
                        ></v-progress-circular>
                      </span>
              <span v-else>
                <v-icon>cloud_upload</v-icon>
                Drag file here or click to upload
              </span>
            </div>
            <div v-if="clientPostOrderForm.supportingFiles.length > 0">
              <div
                  style="font-size: 15px; color: #403d3d;"
                  v-for="(file, key) in clientPostOrderForm.supportingFiles"
                  :key="key"
              >
                <v-chip
                    class="ma-2"
                    close
                    @click:close="removeFile(file.fileUrl)"
                >
                  {{ formatOriginalName(file.originalName) }}
                </v-chip>
              </div>
            </div>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6">
            <span v-if="['xs', 'sm'].includes(viewportCode)"><br></span>
            <label class="text_field_label">Type of service</label>
            <br>
            <v-btn-toggle
                v-model="toggleTypeOfService"
                mandatory
                class="btn-toggle"
            >
              <v-btn
                  style="height: 36px"
                  v-for="(type, key) in serviceTypes"
                  :key="key"
                  :class="clientPostOrderForm.serviceType === type.type ? 'service-type-buttons-active' :
                    'service-type-buttons-inactive'"
                  outlined
                  @click="changeServiceType(type.type)"
              >
                    <span
                        class="text-body-2 text-xl-body-2 text-lg-body-2 text-md-body-2 text-sm-body-2"
                    >{{ type.type }}</span>
              </v-btn>
            </v-btn-toggle>
            <br>
            <br>
            <label class="text_field_label">Level of study</label>
            <v-select
                flat
                :items="studyLevel"
                item-text="level"
                item-value="id"
                data-cy='level-of-study-input'
                class="text-field"
                color="green"
                label="Choose your level of study"
                v-model="clientPostOrderForm.studyLevel"
                :rules="validate.studyLevelField"
                @change="priceCalculationIsNecessary"
                chips
                deletable-chips
                solo
            ></v-select>
            <br>
            <label class="text_field_label">Formatting Style</label>
            <v-select
                flat
                :items="citationStyles"
                item-text="citation"
                item-value="id"
                data-cy='formatting-style-input'
                class="text-field"
                color="green"
                label="Choose the formatting style"
                v-model="clientPostOrderForm.citationStyleId"
                :rules="validate.formattingStyleField"
                chips
                deletable-chips
                solo
            ></v-select>
            <br>
            <label class="text_field_label">Type of Writers</label>
            <v-select
                flat
                :items="typeOfWriters"
                data-cy='formatting-style-input'
                class="text-field"
                color="green"
                label="Choose type of writers"
                v-model="clientPostOrderForm.type"
                :rules="validate.formattingStyleField"
                chips
                deletable-chips
                solo
            ></v-select>
            <br>
            <v-layout row class="pa-2 mt-2 mb-1 price-layout" v-if="clientPostOrderForm.type === 'public'">
              <v-flex v-if="totalPriceLoading">
                <v-progress-circular
                  :width="2"
                  :size="20"
                  color="#007991"
                  indeterminate
                ></v-progress-circular>
              </v-flex>
              <v-flex v-else>
                <v-layout wrap>
                  <v-flex cols="3" xl="3" lg="3" md="3" sm="3">
                    <v-btn
                      id="price-btn-remove"
                      outlined
                      :disabled="clientPostOrderForm.paymentSummary.paperPrice === clientPostOrderForm.paymentSummary.leastPaperPrice"
                      @click="changePrice('remove')"
                    >
                      <v-icon>remove</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex cols="6" xl="6" lg="6" md="6" sm="6" class="ml-lg-8 ml-xl-16 ml-sm-2">
                    <span class="price-value mx-6" :style="{ color: totalPriceLoading ? 'grey' : 'rgba(0,0,0,0.6)' }">
                      <span>{{ clientPostOrderForm.paymentSummary.currencyCode || 'KES' }}</span>
                      <v-text-field
                        flat
                        @keypress="validatePrice"
                        v-model="clientPostOrderForm.paymentSummary.paperPrice"
                        style="width: 50px; position: absolute;"
                        class="mt-n10 ml-14"
                      ></v-text-field>
                    </span>
                    <br>
                    <div v-if="Number(clientPostOrderForm.paymentSummary.discount) !== 0">
                          <span
                            class="text_field_label"
                            style="font-size: 12px; background: #20ba68; padding: 2px; border-radius: 5px; color: white">
                            {{ clientPostOrderForm.paymentSummary.discount }} % OFF
                          </span>
                      <span class="ml-2" style="font-size: 13px; text-decoration: line-through; color: grey">
                          ({{ clientPostOrderForm.paymentSummary.currencyCode || 'KES' }} {{ initialPaperPrice }})
                        </span>
                    </div>
                  </v-flex>
                  <v-flex cols="3" xl="3" lg="3" md="3" sm="3">
                    <v-btn
                      id="price-btn-add"
                      outlined
                      @click="changePrice('add')"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex v-if="priceError.status">
                    <span v-if="priceError.status" class="input-error"> {{ priceError.message }} </span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout row class="pa-2 mt-n3 mb-1" v-else>
              <v-flex v-if="totalPriceLoading">
                <v-progress-circular
                  :width="2"
                  :size="20"
                  color="#007991"
                  indeterminate
                ></v-progress-circular>
              </v-flex>
              <v-flex v-else>
                <v-layout wrap>
                  <v-flex cols="12" xl="12" lg="12" md="12" sm="12">
                    <label class="text_field_label">CPP (KES)</label>
                    <div style="overflow: hidden; display: block">
                      <div style="float: left; width: 70%">
                        <v-btn-toggle
                          v-model="toggleCPP"
                          mandatory
                          id="num-of-pages-btn-toggle-private"
                        >
                          <v-btn
                            id="num-of-pages-buttons-client-remove-private"
                            outlined
                            :disabled="clientPostOrderForm.paymentSummary.cpp === 0"
                            @click="changeCPP('remove')"
                          >
                            <v-icon>remove</v-icon>
                          </v-btn>
                          <v-text-field
                            id="cpp"
                            flat
                            class="num-of-pages-text-field"
                            v-model="clientPostOrderForm.paymentSummary.cpp"
                            @keyup="validateCPP()"
                            solo
                          ></v-text-field>
                          <v-btn
                            id="cpp-btn-add"
                            outlined
                            @click="changeCPP('add')"
                          >
                            <v-icon>add</v-icon>
                          </v-btn>
                        </v-btn-toggle>
                      </div>
                      <div
                        style="float: right; color: #007991; font-size: 16px;"
                        class="mt-4 pl-2"
                      >
                        {{ clientPostOrderForm.paymentSummary.currencyCode }} {{ clientPostOrderForm.paymentSummary.totalPrice }}
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <div v-if="cppError.status">
              <span v-if="cppError.status" class="input-error"> {{ cppError.message }} </span>
            </div>
            <alert-message :success="successObject" :error="errorObject"></alert-message>
            <br>
            <v-btn
                id="continue_btn"
                @click="proceedToNextLevel()"
                :disabled="supportingFileUploading || selectWriterBtnDisabled"
            >
                <span
                    class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
                    text-md-subtitle-1 text-sm-subtitle-1"
                >
                  <template v-if="clientPostOrderForm.type === 'public'">
                    Select a Writer
                  </template>
                  <template v-else>
                    Assign Writer
                  </template>
                </span>
              <v-icon
                  color="white"
              >keyboard_arrow_right
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <div class="text-center">
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          bottom
          color="primary"
          elevation="24"
        >
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </div>
      <v-overlay
          :value="overlay"
          opacity="0.9"
      >
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </v-overlay>
    </template>
  </v-card>
</template>

<script>

import Validation from '../../plugins/Validation.ts'
import { mapGetters, mapMutations } from 'vuex'
import registrationMixin from '@/mixins/registration'
import Time from '@/utils/time'
import api from '@/api/api.ts'
import AlertMessage from '@/components/general/AlertMessage'
import TimeMixin from '@/mixins/time'
import Deadline from '@/components/client/Deadline'
import DeadlineTimeDisabler from '../../mixins/deadlineTimeDisabler'

export default {
  name: 'PlaceOrder',
  components: {
    AlertMessage,
    Deadline
  },
  mixins: [DeadlineTimeDisabler],
  data () {
    return {
      typeOfService: 'writing',
      typeOfWriters: ['private', 'public'],
      toggleTypeOfService: undefined,
      toggleNumOfPages: undefined,
      toggleCPP: undefined,
      numOfPages: 1,
      deadlineDateMenu: false,
      validate: Validation,
      snackbar: false,
      text: 'You can choose \'Engineering\' as the Assignment Type so as to try out the system at a cost of KES 1 per page',
      timeout: -1,
      numOfPagesError: {
        status: false,
        message: ''
      },
      cppError: {
        status: false,
        message: ''
      },
      priceError: {
        status: false,
        message: ''
      },
      currentDate: null,
      formFields: ['email', 'paperSubject', 'assignmentType', 'pageCount', 'sources', 'deadlineDate', 'deadlineTime', 'serviceType',
        'studyLevel', 'citationStyleId', 'topic', 'supportingFiles', 'instructions'],
      overlay: false,
      supportingFileUploading: false,
      errorObject: {
        value: false,
        message: null
      },
      successObject: {
        value: false,
        message: null
      },
      deadlineDateInitialized: false,
      textAreaHeight: null,
      tAHeight: 0,
      isMobile: false,
      disabledTimes: [],
      sourcesExceeded: false,
      sourcesExceededMessage: null,
      totalPriceLoading: false,
      selectWriterBtnDisabled: false
    }
  },
  computed: {
    ...mapGetters({
      viewportCode: 'getViewPortCode',
      disciplines: 'disciplines',
      assignmentTypes: 'assignmentTypes',
      citationStyles: 'citationStyles',
      orderFormats: 'orderFormats',
      time: 'timeAmPm',
      serviceTypes: 'serviceType',
      studyLevel: 'orderStudyLevels',
      clientPostOrderForm: 'clientPostOrderForm',
      client: 'client',
      extraOrderServices: 'extraOrderServices',
      serviceType: 'serviceType',
      orderStudyLevels: 'orderStudyLevels'
    }),
    /* As hinted above, the computed property below helps to check whether the given states have been set.
    * These states are used in the DOM. They need to be set to prevent errors or rather unwanted (user) behaviour
    * or experience */
    allStatesLoaded: function () {
      const expectedStates = [
        'citationStyles', 'disciplines', 'extraOrderServices', 'orderFormats', 'serviceType', 'orderStudyLevels',
        'timeAmPm'
      ]
      return expectedStates.filter(state => !state).length === 0
    },
    /* Order formats are more than 1. However, at any given point, only one is in use. A field currentlyInUse is
    * used to determine whether a given format is in use. The function below returns that format - given that the
    * formats are many.
    * TODO: To move this functionality to the back-end so as to return the once currently in use */
    orderFormat: function () {
      if (this.orderFormats.length === 0) {
        return { wordsPerPage: 0, spacing: '' }
      } else {
        const orderFormatInUse = this.orderFormats.filter(format => format.currentlyInUse === true)
        return {
          wordsPerPage: this.clientPostOrderForm.pageCount * orderFormatInUse[0].wordsPerPage,
          spacing: orderFormatInUse[0].spacing
        }
      }
    },
    /* The days and hours remaining before a deadline lapses needs to be formatted in a more visual and
    * user-friendly manner. That's why this function formats the same */
    deadline () {
      if (this.clientPostOrderForm.deadlineTime) {
        const targetDeadlineTime = this.time.filter(time => time.id === this.clientPostOrderForm.deadlineTime)[0].time
        const timeIn24Hrs = TimeMixin.deadlineHoursAmPm(targetDeadlineTime)
        return TimeMixin.deadline(this.clientPostOrderForm.deadlineDate, timeIn24Hrs)
      } else {
        return null
      }
    },
    filteredDisabledTimes () {
      return this.time.map(item => {
        return {
          id: item.id,
          time: item.time,
          disabled: this.disabledTimes.includes(item)
        }
      })
    },
    initialPaperPrice () {
      const percentageAsDecimal = this.clientPostOrderForm.paymentSummary.discount / 100
      return Math.round(this.clientPostOrderForm.paymentSummary.paperPrice / (1 - percentageAsDecimal))
    },
    xl () {
      let val
      switch (this.$vuetify.breakpoint.name) {
        case 'xl':
          val = true
          break
        default:
          val = false
      }
      return val
    }
  },
  watch: {
    /* When a user changes the date, we re-calculate the disabled times in response */
    deadlineDateMenu () {
      if (!this.deadlineDateMenu) {
        this.disablePossibleDeadlineTimes()
      }
    }
  },
  methods: {
    ...mapMutations(['changeClientPostOrderForm', 'changeLoginDialog']),
    pickFile () {
      this.$refs.image.click()
    },
    formatOriginalName (name) {
      return registrationMixin.formatOriginalName(name)
    },
    /* There is a given sources limit per paper. It's important to confirm that the value inputed by the
    * user does not exceed the given limit. More importantly, the value given also needs to be formatted
    * in a way that makes it possible for the validation to succeed. A letter as the value, for example,
    * is not allowed etc. */
    checkSourcesLimit () {
      if (this.clientPostOrderForm.sources.match('^[0-9]+$') === null ||
          this.clientPostOrderForm.sources.match(/^ *$/) !== null ||
          isNaN(this.clientPostOrderForm.sources.toString().split()[0])) {
        this.sourcesExceededMessage = 'Please use numbers only'
        this.sourcesExceeded = true
      } else {
        if (this.clientPostOrderForm.sources < 0) {
          this.sourcesExceededMessage = 'Please use a number larger than zero'
          this.sourcesExceeded = true
        } else {
          this.sourcesExceededMessage = (Number(this.clientPostOrderForm.sources) > 30)
            ? 'Maximum sources limit exceeded'
            : null
          this.sourcesExceeded = Number(this.clientPostOrderForm.sources) > 30
        }
      }
    },
    changeServiceType (type) {
      this.clientPostOrderForm.serviceType = type
      setTimeout(() => {
        this.priceCalculationIsNecessary()
      }, 0)
    },
    /* The number of pages inputted by a user also needs to be checked to ensure that they are of the right type,
    * without letters or non-number characters. It also needs to be not more than a given limit, just like the
    * sources. */
    validateNumOfPages () {
      setTimeout(() => {
        const validateNumOfPages_ = registrationMixin.validateNumOfPages(this.clientPostOrderForm.pageCount)
        if (!validateNumOfPages_.status) {
          this.numOfPagesError.status = true
          this.numOfPagesError.message = validateNumOfPages_.message
          setTimeout(() => {
            this.numOfPagesError.status = false
            this.numOfPagesError.message = ''
          }, 3000)
        }
        setTimeout(() => {
          this.priceCalculationIsNecessary()
        }, 0)
      }, 0)
    },
    /* The CPP also requires the same validation, with the value having to be at least 1 or above etc */
    validateCPP () {
      setTimeout(() => {
        const validateCPP_ = registrationMixin.validateCPP(this.clientPostOrderForm.paymentSummary.cpp)
        if (!validateCPP_.status) {
          this.cppError.status = true
          this.cppError.message = validateCPP_.message
          setTimeout(() => {
            this.cppError.status = false
            this.cppError.message = ''
          }, 3000)
        } else {
          this.clientPostOrderForm.paymentSummary.cpp = validateCPP_.number
          this.changeCPP(null)
        }
      }, 0)
    },
    validatePrice () {
      /* The are different prices here:
      * 1. leastPaperPrice
      *   This is the minimum allowable price per paper. This comes in when a user wants to set a price
      *   for a public writer. He/she is not allowed to set a value less than a given minimum.
      * 2. paperPrice
      *   This is the amount a user is supposed to pay for the order, minus the extras.
      * 3. totalPrice
      *   This is the combined paper price and the extrasTotalPrice. This is what a user is supposed
      *   to pay for an order.
      * 4. cpp
      *   This is the totalPrice divide by the number of pages
      * 5. extrasTotalPrice
      *   This is the total price of the extras that a user selects.
      * Each of them plays a key role */
      if (!this.clientPostOrderForm.paymentSummary.paperPrice >= this.clientPostOrderForm.leastPaperPrice) {
        this.priceError.status = true
        this.priceError.message = 'You cannot set a value less than the minimum price!'
        this.changeClientPostOrderForm({
          key: 'paymentSummary',
          subKey: 'paperPrice',
          val: this.clientPostOrderForm.paymentSummary.leastPaperPrice,
          option: null
        })
        setTimeout(() => {
          this.priceError.status = false
          this.priceError.message = ''
        }, 3000)
      }
    },
    changePrice (sign) {
      if (this.clientPostOrderForm.paymentSummary.paperPrice >= this.clientPostOrderForm.paymentSummary.leastPaperPrice) {
        switch (sign) {
          case 'add':
            this.clientPostOrderForm.paymentSummary.paperPrice += 1
            break
          case 'remove':
            this.clientPostOrderForm.paymentSummary.paperPrice -= 1
            break
          default:
            break
        }
        this.changeClientPostOrderForm({
          key: 'paymentSummary',
          subKey: 'paperPrice',
          val: this.clientPostOrderForm.paymentSummary.paperPrice,
          option: null
        })
        this.changeClientPostOrderForm({
          key: 'paymentSummary',
          subKey: 'totalPrice',
          val: this.clientPostOrderForm.paymentSummary.paperPrice + this.clientPostOrderForm.paymentSummary.extrasTotalPrice,
          option: null
        })
        this.changeClientPostOrderForm({
          key: 'paymentSummary',
          subKey: 'cpp',
          val: this.clientPostOrderForm.paymentSummary.paperPrice / this.clientPostOrderForm.pageCount,
          option: null
        })
      } else {
        this.priceError.status = true
        this.priceError.message = 'You cannot set a value less than the minimum allowable price!'
        this.changeClientPostOrderForm({
          key: 'paymentSummary',
          subKey: 'paperPrice',
          val: this.clientPostOrderForm.paymentSummary.leastPaperPrice,
          option: null
        })
        setTimeout(() => {
          this.priceError.status = false
          this.priceError.message = ''
        }, 3000)
      }
    },
    changePageCount (sign) {
      const validatePageCount = registrationMixin.validateNumOfPages(this.clientPostOrderForm.pageCount)
      if (validatePageCount.status) {
        this.clientPostOrderForm.pageCount = validatePageCount.number
        switch (sign) {
          case 'add':
            this.clientPostOrderForm.pageCount += 1
            break
          case 'remove':
            this.clientPostOrderForm.pageCount -= 1
            break
          default:
            break
        }
        this.changeClientPostOrderForm({
          key: 'pageCount',
          subKey: null,
          val: this.clientPostOrderForm.pageCount,
          option: null
        })
        if (this.clientPostOrderForm.type === 'public') {
          setTimeout(() => {
            this.priceCalculationIsNecessary()
          }, 0)
        } else {
          if (this.clientPostOrderForm.paymentSummary.cpp) {
            this.clientPostOrderForm.paymentSummary.totalPrice = this.clientPostOrderForm.paymentSummary.cpp * this.clientPostOrderForm.pageCount
            this.changeClientPostOrderForm({
              key: 'paymentSummary',
              subKey: 'totalPrice',
              val: this.clientPostOrderForm.paymentSummary.totalPrice,
              option: null
            })
          }
        }
      } else {
        this.numOfPagesError.status = true
        this.numOfPagesError.message = validatePageCount.message
        setTimeout(() => {
          this.numOfPagesError.status = false
          this.numOfPagesError.message = ''
        }, 3000)
      }
    },
    changeCPP (sign) {
      if (sign) {
        const validateCPP = registrationMixin.validateCPP(this.clientPostOrderForm.paymentSummary.cpp)
        if (validateCPP.status) {
          switch (sign) {
            case 'add':
              this.clientPostOrderForm.paymentSummary.cpp += 1
              break
            case 'remove':
              this.clientPostOrderForm.paymentSummary.cpp -= 1
              break
            default:
              break
          }
        } else {
          this.cppError.status = true
          this.cppError.message = validateCPP.message
          setTimeout(() => {
            this.cppError.status = false
            this.cppError.message = ''
          }, 3000)
        }
      }
      this.changeClientPostOrderForm({
        key: 'paymentSummary',
        subKey: 'cpp',
        val: this.clientPostOrderForm.paymentSummary.cpp,
        option: null
      })
      if (this.clientPostOrderForm.paymentSummary.cpp) {
        this.clientPostOrderForm.paymentSummary.totalPrice = this.clientPostOrderForm.paymentSummary.cpp * this.clientPostOrderForm.pageCount
        this.changeClientPostOrderForm({
          key: 'paymentSummary',
          subKey: 'totalPrice',
          val: this.clientPostOrderForm.paymentSummary.totalPrice,
          option: null
        })
      }
    },
    async proceedToNextLevel () {
      if (this.$refs.clientPostOrderForm.validate()) {
        if (this.clientPostOrderForm.paymentSummary.paperPrice >= this.clientPostOrderForm.paymentSummary.leastPaperPrice) {
          this.overlay = true
          this.changeClientPostOrderForm({
            key: 'paymentSummary',
            subKey: 'paperPrice',
            val: this.clientPostOrderForm.paymentSummary.paperPrice,
            option: null
          })
          if (this.clientPostOrderForm.type === 'public') {
            this.clientPostOrderForm.paymentSummary.totalPrice = this.clientPostOrderForm.paymentSummary.paperPrice + this.clientPostOrderForm.paymentSummary.extrasTotalPrice
            this.changeClientPostOrderForm({
              key: 'paymentSummary',
              subKey: 'cpp',
              val: this.clientPostOrderForm.paymentSummary.paperPrice / this.clientPostOrderForm.pageCount,
              option: null
            })
          } else {
            this.clientPostOrderForm.paymentSummary.totalPrice = this.clientPostOrderForm.paymentSummary.cpp * this.clientPostOrderForm.pageCount
          }
          this.changeClientPostOrderForm({
            key: 'paymentSummary',
            subKey: 'totalPrice',
            val: this.clientPostOrderForm.paymentSummary.totalPrice,
            option: null
          })
          const validateNumOfPages_ = registrationMixin.validateNumOfPages(this.clientPostOrderForm.pageCount)
          if (validateNumOfPages_.status) {
            const validateCPP = registrationMixin.validateCPP(this.clientPostOrderForm.paymentSummary.cpp)
            if (!validateCPP.status) {
              this.overlay = false
              this.errorObject.message = 'Kindly use numbers only as CPP'
              this.errorObject.value = true
              setTimeout(() => {
                this.errorObject.value = false
                this.errorObject.message = null
              }, 2000)
            } else {
              this.formFields.forEach(field => {
                this.changeClientPostOrderForm({
                  key: field,
                  subKey: null,
                  val: this.clientPostOrderForm[field],
                  option: null
                })
              })
              await this.saveOrderDetails()
                .then(res => {
                  switch (res.response) {
                    case 'success':
                      this.changeClientPostOrderForm({
                        key: 'orderSavingProgress',
                        subKey: 'details',
                        val: true,
                        option: null
                      })
                      /* One of the response objects is the order Id - It is returned and saved on the client in case
                    * it is the first record in the session. However, it should be null for consequent requests, since
                    * you already have one  */
                      if (res.orderId !== undefined) {
                        this.changeClientPostOrderForm({
                          key: 'orderId',
                          subKey: null,
                          val: res.orderId,
                          option: null
                        })
                      }
                      this.overlay = false
                      this.$emit('progress-to-next-level', 2)
                      window.scrollTo(0, 0)
                      break
                    default:
                      this.errorObject.message = 'Failed to save. Kindly try again'
                      this.errorObject.value = true
                      setTimeout(() => {
                        this.errorObject.value = false
                        this.errorObject.message = null
                      }, 2000)
                      break
                  }
                })
                .catch(() => {
                  this.overlay = false
                  this.errorObject.message = 'Failed to save. Kindly try again'
                  this.errorObject.value = true
                  setTimeout(() => {
                    this.errorObject.value = false
                    this.errorObject.message = null
                  }, 2000)
                })
            }
          } else {
            this.numOfPagesError.status = true
            this.numOfPagesError.message = validateNumOfPages_.message
            setTimeout(() => {
              this.numOfPagesError.status = false
              this.numOfPagesError.message = ''
            }, 3000)
          }
        } else {
          this.errorObject.message = 'You cannot set a value less than the minimum price!'
          this.errorObject.value = true
          this.changeClientPostOrderForm({
            key: 'paymentSummary',
            subKey: 'paperPrice',
            val: this.clientPostOrderForm.paymentSummary.leastPaperPrice,
            option: null
          })
          setTimeout(() => {
            this.errorObject.value = false
            this.errorObject.message = null
          }, 2000)
        }
      } else {
        this.errorObject.message = 'Kindly fill all required fields'
        this.errorObject.value = true
        setTimeout(() => {
          this.errorObject.value = false
          this.errorObject.message = null
        }, 2000)
      }
    },
    async saveOrderDetails () {
      return await api.postRequest('orders/v1/save_order_details', this.clientPostOrderForm)
        .then(savingResponse => {
          return savingResponse
        })
        .catch(error => {
          return Promise.reject(error)
        })
    },
    async uploadCurrentFile (e) {
      const file = document.getElementById('file').files[0]
      this.supportingFileUploading = true
      this.uploadFile(e)
        .then(response => {
          if (!response.error) {
            if (!this.clientPostOrderForm.supportingFiles.some(file_ => file_ === response.filename)) {
              if (response.filename) {
                this.changeClientPostOrderForm({
                  key: 'supportingFiles',
                  subKey: null,
                  val: { originalName: file.name, fileUrl: response.filename },
                  option: 'push'
                })
              }
            }
          }
          this.supportingFileUploading = false
        })
        /*TODO: To handle this error*/
        .catch(() => {
          this.supportingFileUploading = false
        })
    },
    async removeFile (file) {
      await api.postRequest('orders/v1/remove_file', { filename: file, orderId: this.clientPostOrderForm.orderId })
        .then(res => {
          if (res.itemDeleted || res.message === 'Item not found') {
            this.changeClientPostOrderForm({ key: 'supportingFiles', subKey: null, val: file, option: 'pop' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    setTextAreaHeight () {
      switch (this.viewportCode) {
        case 'xs':
          this.tAHeight = 100
          this.textAreaHeight = '102px'
          break
        default:
          this.tAHeight = 290
          this.textAreaHeight = '300px'
      }
    },
    priceCalculationIsNecessary () {
      if (this.clientPostOrderForm.type === 'public') {
        if (this.clientPostOrderForm.deadlineDate && this.clientPostOrderForm.deadlineTime &&
            this.clientPostOrderForm.pageCount && this.clientPostOrderForm.assignmentType &&
            this.clientPostOrderForm.studyLevel
        ) {
          setTimeout(() => {
            this.calculatePrice()
          }, 0)
        }
      }
    },
    async calculatePrice () {
      if (this.clientPostOrderForm.deadlineTime) {
        this.totalPriceLoading = true
        this.selectWriterBtnDisabled = true
        await api.postRequest('payments/v1/price/calculation', {
          deadlineDate: this.clientPostOrderForm.deadlineDate,
          deadlineTime: this.time.filter(t => t.id === this.clientPostOrderForm.deadlineTime)[0].time,
          pageCount: this.clientPostOrderForm.pageCount,
          serviceType: this.clientPostOrderForm.serviceType,
          assignmentType: this.clientPostOrderForm.assignmentType,
          studyLevel: this.studyLevel.find(level => level.id === this.clientPostOrderForm.studyLevel).level
        })
          .then(response => {
            const percentageAsDecimal = response.discount / 100
            const finalPrice = Math.round(response.basePrice * (1 - percentageAsDecimal))
            this.changeClientPostOrderForm({
              key: 'paymentSummary',
              subKey: 'totalPrice',
              val: finalPrice + this.clientPostOrderForm.paymentSummary.extrasTotalPrice,
              option: null
            })
            this.changeClientPostOrderForm({
              key: 'paymentSummary',
              subKey: 'paperPrice',
              val: finalPrice,
              option: null
            })
            this.changeClientPostOrderForm({
              key: 'paymentSummary',
              subKey: 'leastPaperPrice',
              val: finalPrice,
              option: null
            })
            this.changeClientPostOrderForm({
              key: 'paymentSummary',
              subKey: 'cpp',
              val: finalPrice / this.clientPostOrderForm.pageCount,
              option: null
            })
            this.changeClientPostOrderForm({
              key: 'paymentSummary',
              subKey: 'discount',
              val: response.discount,
              option: null
            })
            this.changeClientPostOrderForm({
              key: 'paymentSummary',
              subKey: 'currencyCode',
              val: response.currencyCode,
              option: null
            })
            this.totalPriceLoading = false
            this.selectWriterBtnDisabled = false
          })
          .catch(() => {
            this.totalPriceLoading = false
          })
      }
    }
  },
  created () {
    if (!this.clientPostOrderForm.paymentSummary.currencyCode) {
      this.changeClientPostOrderForm({
        key: 'paymentSummary',
        subKey: 'currencyCode',
        val: 'KES',
        option: null
      })
    }
  },
  mounted () {
    const dateTime = new Time.DateTime()
    this.currentDate = dateTime.date()
    this.setTextAreaHeight()
    if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true
    }
    this.disablePossibleDeadlineTimes()
    window.scrollTo(0, 0)
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    /* setTimeout(() => {
      this.snackbar = true
    }, 5000) */
  }
}
</script>

<style scoped lang="scss">

@import "../../styles/mixins/general";

@import "../../styles/general/general";

.v-card {
  padding: 40px;
  margin-top: -44px !important;
  #continue_btn {
    margin-top: 2px;
    @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
  }

  .num-of-pages-text-field{
    border: 0.1px solid $primaryDarkGreenBlueColor;
    height: 50px;
    border-radius: 0;
    ::v-deep input{
      text-align: center !important;
    }
  }

  #price-btn-remove{
    float: left;
    height: 50px !important;
    @include darkGreenBlueBtnConfig(auto, $primaryDarkGreenBlueColor, white);
    //border: 0.1px solid $primaryDarkGreenBlueColor !important;
    .v-icon {
      color: $primaryDarkGreenBlueColor !important;
    }
    span{
      color: black;
    }
  }

  #num-of-pages-buttons-client-remove{
    height: 50px !important;
    @include darkGreenBlueBtnConfig(33.3333%, $primaryDarkGreenBlueColor, white);
    border: 0.1px solid $primaryDarkGreenBlueColor !important;
    .v-icon {
      color: $primaryDarkGreenBlueColor !important;
    }
    span{
      color: black;
    }
  }

  #num-of-pages-buttons-client-remove-private{
    @extend #num-of-pages-buttons-client-remove;
  }

  #num-of-pages-buttons-client-add{
    @extend #num-of-pages-buttons-client-remove;
  }

  #cpp-btn-add{
    @extend #num-of-pages-buttons-client-remove;
  }

  #price-btn-add{
    @extend #price-btn-remove;
    float: right !important;
  }

  .service-type-buttons-active{
    color: white !important;
    @include darkGreenBlueBtnConfig(33.333333%, white, $primaryDarkGreenBlueColor)
  }

  .service-type-buttons-inactive{
    border: 1px solid $primaryDarkGreenBlueColor;
    @include darkGreenBlueBtnConfig(33.333333%, $primaryDarkGreenBlueColor, white)
  }

  .btn-toggle{
    width: 100%;
    border: 1px solid #007991;
  }

  #num-of-pages-btn-toggle{
    //width: 75%;
  }

  .text_field {
    border: 1px dashed $primaryDarkGreenBlueColor;
    border-radius: 5px;
    height: 192px; /* FIXME: To make this a dynamic variable for private and public instances */
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    span{
      position: relative;
      top: 75px; /* FIXME: To make this a dynamic variable for private and public instances */
      padding: 20px;
      font-size: 14px;
      color: #cac8c8;
    }
  }

  .price-value {
    font-size: 15px;
  }

  .price-layout {
    background: #f4f4f4;
    border-radius: 10px
  }

  .input-error {
    color: red;
    font-size: 14px;
  }
}

</style>
