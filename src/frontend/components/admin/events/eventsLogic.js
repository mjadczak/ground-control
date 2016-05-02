import Immutable from 'immutable'
import Relay from 'react-relay'

export const approvalFilterOptions = {
  PENDING_APPROVAL: {
    text: 'Pending Approval',
    actions: Immutable.OrderedSet(['delete', 'approve', 'edit', 'email'])
  },
  PENDING_REVIEW: {
    text: 'Pending Review',
    actions: Immutable.OrderedSet(['delete', 'demote', 'approve', 'edit', 'email'])
  },
  APPROVED: {
    text: 'Public Events',
    actions: Immutable.OrderedSet(['delete', 'demote', 'edit', 'email', 'fastForward', 'downloadRSVPs'])
  },
  FAST_FWD_REQUEST: {
    text: 'FastFwd Requests',
    actions: Immutable.OrderedSet(['fastForward'])
  }
}

export const resultLengthOptions = [10, 25, 50, 100, 500]

export const availableActions = ({status, currentUser}) => {
  let actions = approvalFilterOptions[status].actions
  if (!currentUser.isSuperuser)
    actions = actions.delete('delete')

  return actions
}

availableActions.currentUserFragment = Relay.QL`
    fragment on User {
      isSuperuser
    }
  `