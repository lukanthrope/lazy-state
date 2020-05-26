function createStore(reducers, initialState) {
    if (!initialState) {
        throw new Error("You need to pass initial state");
    }

    let state = initialState;
    let listeners = new Set();

    function dispatch(action) {
        if (!reducers) {
            throw new Error("You have no reducers");
        }

        if (typeof reducers === "function") {
            state = reducers(state, action);
        } else {
            if (!reducers.length || reducers.length === 0) {
                throw new Error("You have no reducers");
            }

            if (reducers.length < 2) {
                console.warn("No need to combine 1 reducer");
            }

            reducers.forEach(reducer => {
                state = reducer(state, action);
            });
        }
        
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
