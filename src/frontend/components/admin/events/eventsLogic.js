export const approvalFilterOptions = {
  PENDING_APPROVAL: {
    text: 'Pending Approval',
    actions: ['delete', 'approve', 'edit', 'email']
  },
  PENDING_REVIEW: {
    text: 'Pending Review',
    actions: ['delete', 'demote', 'approve', 'edit', 'email']
  },
  APPROVED: {
    text: 'Public Events',
    actions: ['delete', 'demote', 'edit', 'email', 'fastForward', 'downloadRSVPs']
  },
  FAST_FWD_REQUEST: {
    text: 'FastFwd Requests',
    actions: ['fastForward']
  }
}

export const resultLengthOptions = [10, 25, 50, 100, 500]