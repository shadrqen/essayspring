<!--Component to show the deadline of papers-->
<template>
  <!--  Uses the deadline prop to determine whether to show this span element or not-->
  <span
    v-if="deadline"
    :style="{ color: color }"
  >
    <span v-if="deadline.days !== 0">
      <span
        v-if="Math.sign(deadline.days) === -1"
        style="color: red"
      >
        <span v-if="Math.abs(deadline.days + 1) !== 0">
          Past due date by {{ Math.abs(deadline.days + 1) }}
        </span>
      </span>
      <template v-else>
        {{ deadline.days }}
      </template>
      <span v-if="deadline.days === 1 || Math.abs(deadline.days + 1) === 1">
        day
      </span>
      <span v-else-if="Math.sign(deadline.days) === -1 && Math.abs(deadline.days + 1) === 0" />
      <span v-else>
        days
      </span>
    </span>
    <span v-if="deadline.hours !== 0">
      <span
        v-if="Math.sign(deadline.hours) === -1"
        style="color: #ff0000"
      >
        <span v-if="Math.abs(deadline.days + 1) === 0">
          Past due time by
        </span>
        {{ Math.abs(deadline.hours) }}
        <span v-if="Math.abs(deadline.hours) === 1"> hour </span>
        <span v-else> hours </span>
      </span>
      <span v-else>
        <span
          v-if="deadline.hours === 1"
          :style="deadline.days === 0 ? 'color: #D01C1C' : ''"
        >
          {{ String(deadline.hours) }} hour left
        </span>
        <span
          v-else
          :style="deadline.days === 0 && deadline.hours < 4 ? 'color: #D01C1C' : ''"
        >
          {{ String(deadline.hours) }} hours left
        </span>
      </span>
    </span>
    <span v-else>
      left
    </span>
  </span>
</template>

<script>
export default {
  name: 'AssignmentDeadline',
  props: {
    deadline: {
      type: Object,
      required: false,
      default: () => {}
    },
    color: {
      type: String,
      required: false,
      default: '#D01C1C'
    }
  }
}
</script>

<style scoped>

</style>
