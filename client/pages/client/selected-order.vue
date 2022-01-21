<template>
  <v-app>
    <client-only>
      <nav-drawer />
      <v-card
        v-if="order"
        class="ma-4"
      >
        <v-card-title>
          <v-icon
            class="mr-2"
            style="cursor: pointer"
            @click="$router.push('/client/orders')"
          >
            chevron_left
          </v-icon>
          Order &#8470; {{ order.id }}
          <v-spacer />
          <v-chip
            v-if="order.OrderStatus"
            :color="orderProgress.filter(progress => progress.progress === order.OrderStatus.status)[0].color"
            class="ma-2"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>
                {{
                  orderProgress.filter(progress => progress.progress === order.OrderStatus.status)[0].icon
                }}
              </v-icon>
            </v-avatar>
            {{ order.OrderStatus.status }}
          </v-chip>
          <v-chip
            v-if="order.OrderStatus && resumableOrders.includes(order.OrderStatus.status)"
            class="ma-2"
            color="primary"
            style="cursor: pointer"
            text-color="white"
            @click="getOrderDetail"
          >
            <template v-if="loadingOrder">
              <div class="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
              </div>
            </template>
            <template v-else>
              <v-icon>mdi-square-edit-outline</v-icon>
              <span class="ml-2">Resume</span>
            </template>
          </v-chip>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row no-gutters>
            <v-col
              v-for="(item, key) in headers"
              :key="key"
              v-bind="attrs"
            >
              <v-list
                subheader
                three-line
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <template v-if="item.text === 'Deadline'">
                        <assignment-deadline
                          :deadline="deadline"
                          color="grey"
                        />
                      </template>
                      <template v-else>
                        {{ getOrderItemDetail(item) }}
                      </template>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <v-divider />
          <v-card flat>
            <v-card-title>Instructions</v-card-title>
            <v-card-text>
              <template v-if="order.instructions">
                {{ order.instructions }}
              </template>
              <template v-else>
                No instructions
              </template>
            </v-card-text>
          </v-card>
          <v-divider />
          <v-card
            v-if="order.OrderStatus && order.OrderStatus.status === 'Undergoing revision'"
            flat
          >
            <v-card-title>Revision Instructions</v-card-title>
            <v-card-text>
              <template v-if="revisionInstructions.length > 0">
                <v-row
                  v-for="(revision, revisionKey) in revisionInstructions"
                  :key="revisionKey"
                  no-gutters
                >
                  <v-col
                    v-for="(instructionKey, instructionValue) in revision.revisionInstructions"
                    :key="instructionValue"
                    class="my-2"
                    v-bind="attrs12"
                  >
                    <h3>{{ instructionValue }}</h3>
                    <div>
                      <template v-if="instructionKey">
                        {{ instructionKey }}
                      </template>
                      <template v-else>
                        N/A
                      </template>
                    </div>
                  </v-col>
                  <v-col
                    class="my-2"
                    v-bind="attrs12"
                  >
                    <h3>Deadline</h3>
                    <div>
                      <template v-if="revision.deadline">
                        {{ revision.deadline }}
                      </template>
                      <template v-else>
                        N/A
                      </template>
                    </div>
                  </v-col>
                </v-row>
                <v-divider />
                <v-row no-gutters>
                  <v-col
                    class="my-2"
                    v-bind="attrs12"
                  >
                    <h3 class="my-2">
                      Revision files
                    </h3>
                    <div>
                      <template v-if="revisionSupportingFiles.length > 0">
                        <v-chip
                          v-for="(revSupportingFile, revSupportingFileKey) in revisionSupportingFiles"
                          :key="revSupportingFileKey"
                          class="mr-2 my-1"
                          style="cursor: pointer; text-decoration: underline;"
                          @click="getFile(revSupportingFile.fileUrl, null, 'view')"
                        >
                          <v-img
                            :src="require(`@/assets/${regMixin.fileExtensionIcon(revSupportingFile.fileUrl.split('.').pop())}.png`)"
                            class="mr-2 my-1"
                            sizes="20"
                          />
                          {{ formatOriginalName(revSupportingFile.originalName) }}
                        </v-chip>
                      </template>
                      <template v-else>
                        N/A
                      </template>
                    </div>
                  </v-col>
                </v-row>
              </template>
              <template v-else>
                N/A
              </template>
            </v-card-text>
          </v-card>
          <v-divider />
          <v-card flat>
            <v-card-title>Order Papers</v-card-title>
            <v-card-text>
              <template v-if="orderPapers.length > 0">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          File
                        </th>
                        <th class="text-left">
                          Uploaded At
                        </th>
                        <th class="text-left">
                          Paper Order
                        </th>
                        <th class="text-left">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(file, fileKey) in orderPapers"
                        :key="fileKey"
                      >
                        <td>
                          <v-chip
                            class="mr-2 my-1"
                            style="cursor: pointer; text-decoration: underline;"
                            @click="getFile(file.fileUrl, null, 'view')"
                          >
                            <v-img
                              :src="require(`@/assets/${regMixin.fileExtensionIcon(file.fileUrl.split('.').pop())}.png`)"
                              class="mr-2 my-1"
                              sizes="20"
                            />
                            {{ formatOriginalName(file.originalName) }}
                          </v-chip>
                        </td>
                        <td>{{ file.createdAt }}</td>
                        <td>
                          <v-icon
                            v-if="file.submittedPaper"
                            color="success"
                          >
                            mdi-check-circle-outline
                          </v-icon>
                          <v-icon v-else>
                            mdi-close-circle-outline
                          </v-icon>
                        </td>
                        <td class="order-paper-action">
                          <div v-if="fileDownloading && selectedFileUrl === file.fileUrl">
                            <v-progress-circular
                              color="primary"
                              indeterminate
                            />
                          </div>
                          <v-icon
                            v-else
                            @click="getFile(file.fileUrl, file.originalName, 'download')"
                          >
                            mdi-file-download
                          </v-icon>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <template v-else>
                No order paper
              </template>
            </v-card-text>
          </v-card>
          <v-divider />
          <v-card flat>
            <v-card-title>Supporting files</v-card-title>
            <v-card-text>
              <template v-if="supportingFiles.length > 0">
                <v-chip
                  v-for="(file__, fileKey__) in supportingFiles"
                  :key="fileKey__"
                  class="mr-2 my-1"
                  style="cursor: pointer; text-decoration: underline;"
                  @click="getFile(file__.fileUrl, null,'view')"
                >
                  <v-img
                    :src="require(`@/assets/${regMixin.fileExtensionIcon(file__.fileUrl.split('.').pop())}.png`)"
                    class="mr-2 my-1"
                    sizes="20"
                  />
                  {{ formatOriginalName(file__.originalName) }}
                </v-chip>
              </template>
              <template v-else>
                No supporting files
              </template>
            </v-card-text>
          </v-card>
          <v-divider />
          <v-card
            v-if="order.OrderStatus && revisableOrderStatuses.includes(order.OrderStatus.status)"
            flat
          >
            <v-card-text>
              <v-row
                class="mt-10"
                no-gutters
              >
                <v-btn
                  id="revision_order_btn"
                  @click="requestRevisionDialog = !requestRevisionDialog"
                >
                  <span
                    class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
                  text-md-subtitle-1 text-sm-subtitle-1"
                  >Request Revision</span>
                </v-btn>
                <v-spacer />
                <v-btn
                  v-if="order.OrderStatus && order.OrderStatus.status === 'Submitted'"
                  id="confirm_order_btn"
                  outlined
                  @click="confirmOrderDialog =! confirmOrderDialog"
                >
                  <span
                    class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1"
                  >
                    Confirm Order
                  </span>
                </v-btn>
                <v-btn
                  v-if="order.OrderStatus && order.OrderStatus.status === 'Completed' && !rated"
                  id="confirm_order_btn_2"
                  outlined
                  @click="rateWriterDialog =! rateWriterDialog"
                >
                  <span
                    class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1"
                  >
                    Rate Writer
                  </span>
                </v-btn>
              </v-row>
            </v-card-text>
          </v-card>
          <alert-message
            v-if="bodyAlertObject"
            :error="errorObject"
            :success="successObject"
          />
        </v-card-text>
      </v-card>
      <v-dialog
        v-model="requestRevisionDialog"
        eager
        max-width="700"
      >
        <v-card>
          <v-toolbar
            color="#344754"
            flat
            short
          >
            <v-toolbar-title
              class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1
            text-sm-subtitle-1 white--text"
              v-text="'Specify revision instructions'"
            />
            <v-spacer />
            <v-toolbar-items>
              <v-btn
                dark
                icon
                @click="requestRevisionDialog = !requestRevisionDialog"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-form
            ref="requestRevisionForm"
            @submit.prevent=""
          >
            <v-card-text class="mt-2">
              <template v-if="!revisionRequestDone">
                <div
                  v-for="(checklist, checklistKey) in submissionChecklist"
                  :key="checklistKey"
                >
                  <v-switch
                    v-model="revisionForm[checklist.aspect].key"
                    :label="checklist.aspectDescription"
                    class="ml-2"
                    inset
                    @change="checkIfRevisionRequired"
                  />
                  <v-textarea
                    v-if="revisionForm[checklist.aspect].key"
                    v-model="revisionForm[checklist.aspect].val"
                    class="text-area"
                    flat
                    height="200"
                    no-resize
                    placeholder="Describe revision instructions"
                    solo
                  />
                </div>
                <template v-if="revisionRequired">
                  <v-divider />
                  <v-row
                    class="mb-5"
                    no-gutters
                  >
                    <v-col v-bind="attrs6">
                      <v-menu
                        ref="deadlineDateMenu"
                        v-model="deadlineDateMenu"
                        :close-on-content-click="false"
                        :return-value.sync="revisionDeadline.date"
                        full-width
                        lazy
                        min-width="290px"
                        offset-y
                        transition="scale-transition"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="revisionDeadline.date"
                            :rules="validate.revisionDeadlineDate"
                            label="Deadline date"
                            prepend-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="revisionDeadline.date"
                          :min="currentDate"
                          :show-current="currentDate"
                          no-title
                          scrollable
                          @change="selectedToday = currentDate === revisionDeadline.date"
                          @input="$refs.deadlineDateMenu.save(revisionDeadline.date)"
                        />
                      </v-menu>
                    </v-col>
                    <v-col v-bind="attrs6">
                      <v-menu
                        ref="deadlineTimeMenu"
                        v-model="deadlineTimeMenu"
                        :close-on-content-click="false"
                        :return-value.sync="revisionDeadline.time"
                        full-width
                        lazy
                        min-width="290px"
                        offset-y
                        transition="scale-transition"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="revisionDeadline.time"
                            :rules="validate.revisionDeadlineTime"
                            label="Deadline time"
                            prepend-icon="access_time"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-if="selectedToday"
                          v-model="revisionDeadline.time"
                          :min="currentTime"
                          :show-current="currentTime"
                          color="#6b5b95"
                          format="24hr"
                          @input="$refs.deadlineTimeMenu.save(revisionDeadline.time)"
                        />
                        <v-time-picker
                          v-else
                          v-model="revisionDeadline.time"
                          color="#6b5b95"
                          format="24hr"
                          @input="$refs.deadlineTimeMenu.save(revisionDeadline.time)"
                        />
                      </v-menu>
                    </v-col>
                  </v-row>
                  <div
                    class="text_field"
                    @click="pickFile"
                    @drop="uploadCurrentFile"
                    @dragover.prevent
                    @drop.prevent
                  >
                    <input
                      id="file"
                      ref="image"
                      accept=".pdf, .jpg, .jpeg, .png, .doc, .docx, .xls, .xlsx, .odt, .csv, .txt, video/*, audio/*"
                      style="display: none"
                      type="file"
                      @change="uploadCurrentFile"
                    >
                    <span v-if="supportingFileUploading">
                      <v-progress-circular
                        :size="30"
                        color="#007991"
                        indeterminate
                      />
                    </span>
                    <span v-else>
                      <v-icon>cloud_upload</v-icon>
                      Drag file here or click to upload
                    </span>
                  </div>
                  <div v-if="revisionFormSupportingFiles.length > 0">
                    <div
                      v-for="(file, key) in revisionFormSupportingFiles"
                      :key="key"
                      style="font-size: 15px; color: #403d3d;"
                    >
                      <v-chip
                        class="ma-2"
                        close
                        @click:close="removeFile(file)"
                      >
                        {{ file.originalName }}
                      </v-chip>
                    </div>
                  </div>
                </template>
              </template>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-row no-gutters>
                <v-col v-bind="attrs12">
                  <alert-message
                    :error="errorObject"
                    :success="successObject"
                  />
                </v-col>
                <v-col v-bind="attrs12">
                  <v-btn
                    id="submit-revision-btn"
                    :disabled="submitRevisionBtnDisabled"
                    outlined
                    @click="submitRevisionRequest"
                  >
                    <div
                      v-if="revisionRequestOngoing"
                      class="lds-ellipsis"
                    >
                      <div />
                      <div />
                      <div />
                      <div />
                    </div>
                    <span
                      v-else
                      class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1"
                    >
                      <v-icon>mdi-check-circle-outline</v-icon> Submit
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="confirmOrderDialog"
        eager
        max-width="600"
      >
        <v-card>
          <v-toolbar
            color="#344754"
            flat
            short
          >
            <v-toolbar-title
              class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1
            text-sm-subtitle-1 white--text"
              v-text="'Confirm order'"
            />
            <v-spacer />
            <v-toolbar-items>
              <v-btn
                dark
                icon
                @click="confirmOrderDialog = !confirmOrderDialog"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text class="mt-5">
            <div class="text-h6">
              By clicking <b>"Confirm"</b>, you confirm that the order meets the requirements, and that that the order
              is now completed.
            </div>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-row no-gutters>
              <v-col v-bind="attrs12">
                <alert-message
                  :error="errorObject"
                  :success="successObject"
                />
              </v-col>
              <v-col
                class="text-end"
                v-bind="attrs12"
              >
                <v-btn
                  id="confirm-order-btn"
                  :disabled="confirmOrderBtnDisabled"
                  class="my-2"
                  outlined
                  @click="confirmOrder"
                >
                  <div
                    v-if="confirmOrderOngoing"
                    class="lds-ellipsis"
                  >
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                  <span
                    v-else
                    class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1"
                  >
                    <v-icon>mdi-check-circle-outline</v-icon> Confirm
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="rateWriterDialog"
        eager
        max-width="600"
      >
        <v-card>
          <v-toolbar
            color="#344754"
            flat
            short
          >
            <v-toolbar-title
              class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1
            text-sm-subtitle-1 white--text"
              v-text="'Rate Writer'"
            />
            <v-spacer />
            <v-toolbar-items>
              <v-btn
                dark
                icon
                @click="rateWriterDialog = !rateWriterDialog"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text class="mt-5">
            <v-rating
              v-model="rating"
              background-color="#F2A737"
              color="#F2A737"
              x-large
            />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-row no-gutters>
              <v-col v-bind="attrs12">
                <alert-message
                  :error="errorObject"
                  :success="successObject"
                />
              </v-col>
              <v-col
                class="text-end"
                v-bind="attrs12"
              >
                <v-spacer />
                <v-btn
                  id="rate-writer-btn"
                  :disabled="rateWriterBtnDisabled"
                  class="my-2"
                  outlined
                  @click="rateWriter"
                >
                  <div
                    v-if="rateWriterOngoing"
                    class="lds-ellipsis"
                  >
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                  <span
                    v-else
                    class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1"
                  >
                    <v-icon>mdi-check-circle-outline</v-icon> Submit
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="fileDialog"
        :fullscreen="getViewPortCode === 'xs'"
        eager
      >
        <v-card>
          <v-card-title>
            <div v-if="selectedFileUrl && selectedFileUrl.split('.').pop() === 'pdf'">
              <v-chip
                id="prev"
                class="mx-2"
              >
                Previous
              </v-chip>
              <v-chip
                id="next"
                class="mx-2"
              >
                Next
              </v-chip>
              &nbsp; &nbsp;
              <span style="font-size: 14px">Page: <span id="page_num" /> / <span id="page_count" /></span>
            </div>
            <v-spacer />
            <v-btn
              id="close-file"
              color="red"
              icon
              outlined
              @click="fileDialog = !fileDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <template v-if="failed2PullFile">
              <h2>Error while loading file</h2>
            </template>
            <template v-else>
              <v-img
                v-if="selectedFileUrl && ['jpeg', 'jpg', 'png'].includes(selectedFileUrl.split('.').pop())"
                :src="selectedFile"
              />
              <div style="text-align: center">
                <canvas
                  id="the-canvas"
                  style="display: inline;"
                />
              </div>
              <iframe
                v-if="selectedFileUrl && ['doc', 'docx'].includes(selectedFileUrl.split('.').pop())"
                :src="selectedFile"
                class="word-doc"
              />
              <template v-if="!selectedFile">
                <div class="lds-ellipsis">
                  <div class="lds-local" />
                  <div class="lds-local" />
                  <div class="lds-local" />
                  <div class="lds-local" />
                </div>
              </template>
            </template>
          </v-card-text>
        </v-card>
      </v-dialog>
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
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex'
import api from '@/api/api'
import { deadline, deadlineHoursAmPm } from '@/mixins/time'
import AssignmentDeadline from '@/components/client/AssignmentDeadline'
import AlertMessage from '@/components/general/AlertMessage'
import registrationMixin from '@/mixins/registration'
import Time from '@/utils/time'
import Validation from '@/plugins/Validation'
import NavDrawer from '@/components/general/NavDrawer'
import authMixin from '../../utils/auth'
import filesMixin from '../../mixins/filesMixin'

export default {
  name: 'SelectedOrder',
  head: {
    title: 'Selected Order',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Selected Order. Essay Writing Service - Freelance Academic Writing Assistance EssaySpring.com - EssaySpring.com'
      }
    ],
    script: [
      {
        hid: 'pdfjs',
        src: 'https://mozilla.github.io/pdf.js/build/pdf.js',
        defer: true
      }
    ]
  },
  mixins: [filesMixin],
  components: {
    NavDrawer,
    AssignmentDeadline,
    AlertMessage
  },
  data () {
    return {
      headers: [
        { text: 'Topic', value: 'topic', subValue: null },
        { text: 'Discipline', value: 'Discipline', subValue: 'discipline' },
        { text: 'Number of pages', value: 'pageCount', subValue: null },
        { text: 'Deadline', value: 'deadline', subValue: null },
        { text: 'CPP', value: '', subValue: 'cpp' },
        { text: 'Cost', value: '', subValue: 'totalPrice' },
        { text: 'Education level', value: '', subValue: 'level' },
        { text: 'Paper format', value: '', subValue: 'spacing' },
        { text: 'Type of service', value: '', subValue: 'spacing' },
        { text: 'Citation style', value: '', subValue: 'style' }
      ],
      order: {},
      revisionInstructions: [],
      revisionSupportingFiles: [],
      orderPapers: [],
      supportingFiles: [],
      submissionChecklist: [],
      overlay: false,
      rating: 0,
      attrs: {
        cols: 12,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
      attrs12: {
        cols: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      },
      errorObject: {
        value: false,
        message: null
      },
      successObject: {
        value: false,
        message: null
      },
      bodyAlertObject: false,
      orderProgress: [
        { progress: 'Ongoing', color: 'green darken-4', icon: 'mdi-progress-check' },
        { progress: 'Completed', color: 'teal', icon: 'mdi-check-circle-outline' },
        { progress: 'Submitted', color: 'teal lighten-1', icon: 'mdi-send-circle-outline' },
        { progress: 'Pending payment', color: 'red lighten-1', icon: 'mdi-currency-usd' },
        { progress: 'Pending revision', color: 'blue darken-1', icon: 'mdi-account-clock-outline' },
        { progress: 'Undergoing revision', color: 'red darken-4', icon: 'mdi-redo' },
        { progress: 'Available', color: 'green lighten-2', icon: 'mdi-compass' },
        { progress: 'Bidding ongoing', color: 'green lighten-1', icon: 'mdi-arrow-right-drop-circle' },
        { progress: 'Pending writer acknowledgement', color: 'light-green darken-1', icon: 'mdi-timer-outline' }
      ],
      fileDialog: false,
      fileDownloading: false,
      selectedFile: null,
      selectedFileUrl: null,
      failed2PullFile: false,
      currentPage: 1,
      pageCount: 22,
      resumableOrders: [
        'Pending payment',
        'Pending writer acknowledgement',
        'Available',
        'Bidding ongoing'
      ],
      loadingOrder: false,
      pdfRendered: false,
      requestRevisionDialog: false,
      confirmOrderDialog: false,
      rateWriterDialog: false,
      revisionForm: {
        'Page count': {
          key: false,
          val: null
        },
        Topic: {
          key: false,
          val: null
        },
        Instructions: {
          key: false,
          val: null
        },
        Deadline: {
          key: false,
          val: null
        },
        Sources: {
          key: false,
          val: null
        },
        Formatting: {
          key: false,
          val: null
        },
        'Type of service': {
          key: false,
          val: null
        },
        Other: {
          key: false,
          val: null
        }
      },
      revisionFormSupportingFiles: [],
      revisionDeadline: {
        date: null,
        time: null
      },
      deadlineDateMenu: false,
      deadlineTimeMenu: false,
      supportingFileUploading: false,
      currentDate: null,
      currentTime: null,
      attrs6: {
        cols: 12,
        xl: 6,
        lg: 6,
        md: 6,
        sm: 6
      },
      selectedToday: false,
      revisionRequired: false,
      submitRevisionBtnDisabled: true,
      rateWriterBtnDisabled: true,
      confirmOrderBtnDisabled: false,
      revisableOrderStatuses: ['Completed', 'Submitted', 'Undergoing revision'],
      revisionRequestOngoing: false,
      confirmOrderOngoing: false,
      rateWriterOngoing: false,
      revisionRequestDone: false,
      rated: true,
      regMixin: registrationMixin,
      validate: Validation
    }
  },
  computed: {
    ...mapGetters(['client', 'getViewPortCode', 'clientPostOrderForm']),
    deadline () {
      if (this.order.TimeAmPm) {
        const timeIn24Hrs = deadlineHoursAmPm(this.order.TimeAmPm.time)
        return deadline(this.order.deadlineDate, timeIn24Hrs)
      } else {
        return null
      }
    }
  },
  watch: {
    rating () {
      this.rateWriterBtnDisabled = this.rating === 0
    }
  },
  methods: {
    formatOriginalName (name) {
      return registrationMixin.formatOriginalName(name)
    },
    async getOrder () {
      this.overlay = true
      await api.postRequest('orders/v1/get_orders', {
        multiple: false,
        orderId: this.client.selectedOrder
      })
        .then(response => {
          this.order = response.details
          this.rated = response.rated
          this.revisionInstructions = response.revisionInstructions || []
          this.orderPapers = this.order.OrderFile.filter(file => file.OrderFileType.type === 'Paper')
          this.supportingFiles = this.order.OrderFile.filter(file => file.OrderFileType.type === 'Client Supporting' || file.OrderFileType.type === 'Writer Supporting')
          this.revisionSupportingFiles = this.order.OrderFile.filter(file => file.OrderFileType.type === 'Revision Supporting')
          this.submissionChecklist = response.submissionChecklist
        })
        .catch(() => {
          this.bodyAlertObject = true
          this.errorObject = {
            message: 'Failed to load order details',
            value: true
          }
          setTimeout(() => {
            this.errorObject = {
              message: null,
              value: false
            }
            this.bodyAlertObject = false
          }, 2000)
        })
      this.overlay = false
    },
    getOrderItemDetail (header) {
      /* subValue here refers to 'discipline' like in here this.order.Discipline.discipline */
      if (header.subValue) {
        switch (header.text) {
          case 'Discipline':
            return this.order.Discipline ? this.order.Discipline.discipline : null
          case 'CPP':
            return this.order.OrderPaymentDetail && this.order.OrderPaymentDetail.length > 0 ? 'KES ' + Math.floor(this.order.OrderPaymentDetail[0].cpp) : null
          case 'Cost':
            return this.order.OrderPaymentDetail && this.order.OrderPaymentDetail.length > 0 ? 'KES ' + Math.floor(this.order.OrderPaymentDetail[0].totalPrice) : null
          case 'Education level':
            return this.order.EducationLevel ? this.order.EducationLevel.level : null
          case 'Paper format':
            return this.order.OrderFormat ? String(this.order.OrderFormat.wordsPerPage).concat(' words per page, ', this.order.OrderFormat.spacing) : null
          case 'Type of service':
            return this.order.OrderServiceType ? this.order.OrderServiceType.type : null
          case 'Citation style':
            return this.order.CitationStyle ? this.order.CitationStyle.citation : null
          default:
            return ''
        }
      } else {
        /* Otherwise a header without a subValue looks like one here this.item.pageCount */
        return this.order[header.value]
      }
    },
    async getFile (fileUrl, fileName, purpose) {
      this.selectedFileUrl = fileUrl
      const fileExtension = fileUrl.split('.').pop()
      if (purpose === 'view') {
        this.fileDialog = true
        this.failed2PullFile = false
      } else {
        this.fileDownloading = true
      }
      this.selectedFile = null
      await api.postRequest('orders/v1/get_file', { fileUrl: fileUrl })
        .then(res => {
          if (res.message === 'success') {
            let fileExtensionApplication
            if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
              fileExtensionApplication = 'image' + fileUrl.split('.').pop()
            } else if (fileExtension === 'pdf') {
              fileExtensionApplication = 'application/pdf'
              if (purpose === 'view') {
                this.loadPdfFull(res.file)
              }
            } else if (fileExtension === 'doc') {
              fileExtensionApplication = 'application/msword'
            } else if (fileExtension === 'docx') {
              fileExtensionApplication = 'application/vnd.openxmlformats-officedocument.wordprocessingml.'
            }
            if (purpose === 'download') {
              this.selectedFile = 'data:' + fileExtensionApplication + ';base64,' + atob(res.file)
              this.fileDownloading = false
              /* TODO: To make the functionality below to be more performant */
              const byteCharacters = atob(res.file)
              const byteNumbers = new Array(byteCharacters.length)
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i)
              }
              const byteArray = new Uint8Array(byteNumbers)
              this.saveFile(new Blob([byteArray],
                { type: fileExtensionApplication }), fileName)
            }
          }
        })
        .catch(e => {
          this.failed2PullFile = true
        })
    },
    b64toBlob (b64Data, contentType = '', sliceSize = 512) {
      const byteCharacters = atob(b64Data)
      const byteArrays = []

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
      }

      return new Blob(byteArrays, { type: contentType })
    },
    saveFile (blob, fileName) {
      // Check the Browser type and download the File.
      const isIE = !!document.documentMode
      if (isIE) {
        window.navigator.msSaveBlob(blob, fileName)
      } else {
        try {
          const url = window.URL || window.webkitURL
          const link = url.createObjectURL(blob)
          const a = document.createElement('a')
          a.setAttribute('download', fileName)
          a.setAttribute('href', link)
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        } catch (e) {
          console.log(e)
        }
      }
    },
    async getOrderDetail () {
      this.loadingOrder = true
      await api.postRequest('orders/v1/get_order_details', { orderId: this.order.id })
        .then(res => {
          if (res) {
            this.$router.push({
              name: 'client-place-order',
              params: {
                response: JSON.stringify(res)
              }
            })
          } else {
            this.loadingOrder = false
          }
        })
        .catch(() => {
          this.loadingOrder = false
        })
    },
    loadPdfFull (data) {
      // atob() is used to convert base64 encoded PDF to binary-like data.
      // (See also https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/
      // Base64_encoding_and_decoding.)
      const pdfData = atob(data)

      // Loaded via <script> tag, create shortcut to access PDF.js exports.
      const pdfjsLib = window['pdfjs-dist/build/pdf']

      // The workerSrc property shall be specified.
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js'

      let pdfDoc = null
      let pageNum = 1
      let pageRendering = false
      let pageNumPending = null
      const scale = 1
      const canvas = document.getElementById('the-canvas')
      const ctx = canvas.getContext('2d')

      /**
       * Get page info from document, resize canvas accordingly, and render page.
       * @param num Page number.
       */
      function renderPage (num) {
        pageRendering = true
        // Using promise to fetch the page
        pdfDoc.getPage(num).then(function (page) {
          const viewport = page.getViewport({ scale: scale })
          canvas.height = viewport.height
          canvas.width = viewport.width
          // Render PDF page into canvas context
          const renderContext = {
            canvasContext: ctx,
            viewport: viewport
          }
          const renderTask = page.render(renderContext)

          // Wait for rendering to finish
          renderTask.promise.then(function () {
            pageRendering = false
            if (pageNumPending !== null) {
              // New page rendering is pending
              renderPage(pageNumPending)
              pageNumPending = null
            }
          })
        })

        // Update page counters
        document.getElementById('page_num').textContent = num
      }

      /**
       * If another page rendering in progress, waits until the rendering is
       * finised. Otherwise, executes rendering immediately.
       */
      function queueRenderPage (num) {
        if (pageRendering) {
          pageNumPending = num
        } else {
          renderPage(num)
        }
      }

      /**
       * Displays previous page.
       */
      function onPrevPage () {
        if (pageNum <= 1) {
          return
        }
        pageNum--
        queueRenderPage(pageNum)
      }

      document.getElementById('prev').addEventListener('click', onPrevPage)

      /**
       * Displays next page.
       */
      function onNextPage () {
        if (pageNum >= pdfDoc.numPages) {
          return
        }
        pageNum++
        queueRenderPage(pageNum)
      }

      document.getElementById('next').addEventListener('click', onNextPage)

      /**
       * Asynchronously downloads PDF.
       */
      pdfjsLib.getDocument({ data: pdfData }).promise.then(function (pdfDoc_) {
        pdfDoc = pdfDoc_
        document.getElementById('page_count').textContent = pdfDoc.numPages
        document.getElementById('close-file').addEventListener('click', () => {
          pdfDoc_.destroy()
        })
        // Initial/first page rendering
        renderPage(pageNum)
      })
    },
    async submitRevisionRequest () {
      this.revisionRequestDone = false
      if (this.$refs.requestRevisionForm.validate()) {
        let checklistProvided = false
        /* We need to ensure that a user has marked at least one item in the checklist that indicates areas
        * of revision. Failure to mark at least one item means that the paper lacks a ground for revision */
        for (const key in this.revisionForm) {
          if (this.revisionForm[key].key) {
            checklistProvided = true
          }
        }
        if (checklistProvided) {
          this.submitRevisionBtnDisabled = true
          this.revisionRequestOngoing = true
          await api
            .postRequest('orders/v1/request_revision', {
              orderId: this.client.selectedOrder,
              checklist: this.revisionForm,
              deadline: this.revisionDeadline,
              supportingFiles: this.revisionFormSupportingFiles
            })
            .then(response => {
              if (response.success) {
                this.$refs.requestRevisionForm.reset()
                this.revisionRequestDone = true
                this.revisionRequestOngoing = false
                this.successObject = {
                  message: 'Revision requested successfully',
                  value: true
                }
                setTimeout(() => {
                  this.successObject = {
                    message: null,
                    value: false
                  }
                  this.getOrder()
                  this.submitRevisionBtnDisabled = false
                  this.requestRevisionDialog = false
                  this.revisionRequestDone = false
                }, 2000)
              } else {
                this.revisionRequestDone = true
                this.errorObject = {
                  message: 'Failed to request a revision',
                  value: true
                }
                setTimeout(() => {
                  this.errorObject = {
                    message: null,
                    value: false
                  }
                  this.submitRevisionBtnDisabled = false
                  this.revisionRequestOngoing = false
                  this.revisionRequestDone = false
                }, 2000)
              }
            })
            .catch(() => {
              this.revisionRequestDone = true
              this.errorObject = {
                message: 'Failed to request a revision',
                value: true
              }
              setTimeout(() => {
                this.errorObject = {
                  message: null,
                  value: false
                }
                this.submitRevisionBtnDisabled = false
                this.revisionRequestOngoing = false
                this.revisionRequestDone = false
              }, 2000)
            })
        } else {
          this.errorObject = {
            message: 'Kindly provide at least one revision instruction',
            value: true
          }
          setTimeout(() => {
            this.errorObject = {
              message: null,
              value: false
            }
            this.revisionRequestDone = false
          }, 2000)
        }
      } else {
        this.errorObject = {
          message: 'Kindly ensure all mandatory fields are filled to continue',
          value: true
        }
        setTimeout(() => {
          this.errorObject = {
            message: null,
            value: false
          }
          this.revisionRequestDone = false
        }, 2000)
      }
    },
    async uploadCurrentFile (e) {
      const file = document.getElementById('file').files[0]
      this.supportingFileUploading = true
      this.uploadFile(e)
        .then(response => {
          if (!response.error) {
            this.revisionFormSupportingFiles.push({
              fileUrl: response.filename,
              originalName: file.name
            })
          }
          this.supportingFileUploading = false
        })
        /* TODO: To handle this error */
        .catch(() => {
          this.supportingFileUploading = false
        })
    },
    /* TODO: To also find a way of making the functionality below more reusable */
    removeFile (file) {
      const elementExists = this.revisionFormSupportingFiles.find(element => element === file)
      // const index = this.revisionFormSupportingFiles.filter(element => element === file).indexOf(file)
      const index = this.revisionFormSupportingFiles.map(function (e) { return e }).indexOf(file)
      if (elementExists) {
        this.revisionFormSupportingFiles.splice(index, 1)
      }
    },
    checkIfRevisionRequired () {
      let revisionNeeded = false
      for (const key in this.revisionForm) {
        if (this.revisionForm[key].key) {
          revisionNeeded = true
        }
      }
      this.revisionRequired = revisionNeeded
      this.submitRevisionBtnDisabled = !revisionNeeded
    },
    async confirmOrder () {
      this.confirmOrderBtnDisabled = true
      this.confirmOrderOngoing = true
      await api
        .postRequest('orders/v1/confirm_order_completion', {
          orderId: this.client.selectedOrder
        })
        .then(res => {
          if (res.updated) {
            this.confirmOrderOngoing = false
            this.successObject = {
              message: 'Order confirmed successfully',
              value: true
            }
            setTimeout(() => {
              this.successObject = {
                message: null,
                value: false
              }
              this.getOrder()
              this.confirmOrderBtnDisabled = false
              this.confirmOrderDialog = false
            }, 2000)
          }
        })
        .catch(() => {
          this.errorObject = {
            message: 'Failed to confirm order! Kindly try again',
            value: true
          }
          setTimeout(() => {
            this.errorObject = {
              message: null,
              value: false
            }
            this.confirmOrderBtnDisabled = false
            this.confirmOrderOngoing = false
          }, 2000)
        })
    },
    async rateWriter () {
      if (this.rating > 0) {
        this.rateWriterBtnDisabled = true
        this.rateWriterOngoing = true
        await api
          .postRequest('orders/v1/rate_writer', {
            orderId: this.client.selectedOrder,
            rating: this.rating
          })
          .then(res => {
            if (res.rated) {
              this.rateWriterOngoing = false
              this.successObject = {
                message: 'Writer rated successfully',
                value: true
              }
              setTimeout(() => {
                this.successObject = {
                  message: null,
                  value: false
                }
                this.getOrder()
                this.rateWriterBtnDisabled = false
                this.rateWriterOngoing = false
                this.rateWriterDialog = false
              }, 2000)
            }
          })
          .catch(() => {
            this.errorObject = {
              message: 'Failed to rate writer! Kindly try again',
              value: true
            }
            setTimeout(() => {
              this.errorObject = {
                message: null,
                value: false
              }
              this.rateWriterBtnDisabled = false
              this.rateWriterOngoing = false
            }, 2000)
          })
      }
    }
  },
  created () {
    if (process.env.VUE_ENV === 'client') {
      if (!authMixin.tokenIsValid()) {
        this.$router.push('/')
      }
    }
    const dateTime = new Time.DateTime()
    this.currentDate = dateTime.date()
    this.currentTime = dateTime.time24Hr
    this.getOrder()
  },
  mounted () {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }
}
</script>

<style lang="scss" scoped>

@import "../../styles/general/general";
@import "../../styles/mixins/general";

#request-payment {
  @include darkGreenBlueBtnConfig(auto, white, $paymentButtonColor);
  margin-top: 28px;
}

.lds-local {
  background-color: #007991 !important;
}

.word-doc {
  width: 100%;
  height: 100%;
}

#the-canvas {
  //direction: ltr;
  //width: 100%;
}

#prev, #next {
  text-transform: none;
  cursor: pointer;
}

.order-paper-action {
  cursor: pointer;
}

#revision_order_btn {
  @include darkGreenBlueBtnConfig(auto, white, #B71C1C);
}

#confirm_order_btn, #confirm_order_btn_2, #confirm-order-btn {
  @include darkGreenBlueBtnConfig(auto, white, $primaryDarkGreenBlueColor);
}

#rate-writer-btn {
  @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
}

#submit-revision-btn {
  @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
}

.text-area{
  height: 202px;
  ::v-deep label {
    color: #989696;
  }
}

.text_field {
  border: 1px dashed $primaryDarkGreenBlueColor;
  border-radius: 5px;
  height: 82px;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  span{
    position: relative;
    top: 23px;
    padding: 20px;
    font-size: 14px;
    color: #cac8c8;
  }
}

</style>
