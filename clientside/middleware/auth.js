import authTokenProcessor from '../utils/auth'

export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!authTokenProcessor.tokenIsValid()) {
    return redirect('/')
  }
}
