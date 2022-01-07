import { mount } from '@vue/test-utils'
import Logo from '@/components/Logo.vue'

// eslint-disable-next-line no-undef
describe('Logo', () => {
  // eslint-disable-next-line no-undef
  test('is a Vue instance', () => {
    const wrapper = mount(Logo)
    // eslint-disable-next-line no-undef
    expect(wrapper.vm).toBeTruthy()
  })
})
