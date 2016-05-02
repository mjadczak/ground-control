//Accessor functions for the state

export const getQueryVariablesFromQuery = (eventsQuery) => {
  let variables = eventsQuery.toJS()
  variables.hostFilters = {}
  variables.filters = {}
  return variables
}