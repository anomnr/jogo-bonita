import type { InjectionKey, Ref } from 'vue'

/**
 * Shared between UiResizableNavbar (provider) and UiResizableNavBody
 * (consumer). React injects this through React.Children.map + cloneElement,
 * which has no Vue equivalent — provide/inject is the idiomatic stand-in.
 */
export const navbarVisibleKey: InjectionKey<Ref<boolean>> = Symbol('navbar-visible')
