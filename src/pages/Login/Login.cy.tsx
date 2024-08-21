import { LoginPage } from './Login'
import "../../output.css"

describe('<LoginPage />', () => {
  it('renders', () => {
    cy.mount(<LoginPage />)
  })
})