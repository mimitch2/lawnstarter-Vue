import { shallowMount } from '@vue/test-utils'
import Main from '@/components/Main.vue'

describe('Main.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'new message'
    const wrapper = shallowMount(Main, {
      propsData: { title }
    })
    expect(wrapper.text()).toMatch(title)
  })
})
