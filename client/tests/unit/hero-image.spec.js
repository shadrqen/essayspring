import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/Index.vue'

// eslint-disable-next-line no-undef
describe('Index', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Index, {})
  })
})
