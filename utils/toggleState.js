export const toggleState = (state, id) => {
  const _stateSet = new Set(state, id);
  _stateSet.has(id) ? _stateSet.delete(id) : _stateSet.add(id);
  return Array.from(_stateSet);
};
