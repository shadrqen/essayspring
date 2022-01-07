<<<<<<< HEAD
import { shallowMount, mount } from '@vue/test-utils'
import Index from '@/pages/Index.vue'

// The component to test
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg']
}

const Counter = {
  template: `
    <div>
      <button @click="count++">Add up</button>
      <p>Total clicks: {{ count }}</p>
    </div>
  `,
  data () {
    return { count: 0 }
  }
}

test('displays message', () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(MessageComponent, {
    propsData: {
      msg: 'Hello world'
    }
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello world')
})

test('increments counter value on click', async () => {
  const wrapper = mount(Counter)
  const button = wrapper.find('button')
  const text = wrapper.find('p')

  expect(text.text()).toContain('Total clicks: 0')

  await button.trigger('click')

  expect(text.text()).toContain('Total clicks: 1')
})

/*
describe('Index', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Index, {
=======
import { shallowMount } from '@vue/test-utils'
import Index from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
>>>>>>> 3728584... Feature commenting (#223)
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
<<<<<<< HEAD
 */
=======
>>>>>>> 3728584... Feature commenting (#223)
