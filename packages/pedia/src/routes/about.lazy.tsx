import { createLazyFileRoute } from '@tanstack/react-router'

import { TwoColumnContainer } from '../components/two-column-container'

export const Route = createLazyFileRoute('/about')({
  component: Page,
})

function Page() {
  return <TwoColumnContainer left={<>Hello</>} right={<>There</>} />
}
