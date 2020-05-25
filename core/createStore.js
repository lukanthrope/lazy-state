function createStore(initialState, reducer) {
    let state = initialState;
    let listeners = new Set();

    function dispatch(action) {
        state = reducer(state, action);
        inform(state);
    }

    function inform(data) {
        listeners.forEach(setter => {
            setter(data);
        });
    }

    function setState(newState) {
        state = newState;
        inform(newState);
    }

    function getState() {
        return state;
    }

    function subscribe(s) {
        listeners.add(s);
    }

    return {
        setState,
        getState,
        subscribe,
        dispatch,
    };
}

export default createStore;
