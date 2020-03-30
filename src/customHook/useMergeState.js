import {useState} from 'react'

// State merger hook
// (this way I won't need to destructure every time I use setstate)
const useMergeState = initialState => {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => setState(prevState => Object.assign({}, prevState, newState));
  return [state, setMergedState];
}

export default useMergeState;