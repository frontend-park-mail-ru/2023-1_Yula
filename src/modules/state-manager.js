const store = (() => {
    const states = {};
    const subscribes = {};
    
    const setState = (name, newState) => {
        states[name] = newState;
        if (subscribes[name]) {
            subscribes[name].forEach(callback => {
                callback(newState);
            });
        }
    };

    const getState = (name) => states[name];

    const subscribe = (name, callback) => {
        if (!subscribes[name]) {
            subscribes[name] = [];
        }
        subscribes[name].push(callback);
    };

    const unsubscribe = (name, callback) => {
        if (!subscribes[name]) {
            throw new Error(`Событие ${name} не существует`);
        }
        const index = subscribes[name].indexOf(callback);
        if (index === -1) {
            throw new Error(`Событие ${name} не содержит callback`);
        }
        subscribes[name].splice(index, 1);
    };

    return {
        setState,
        getState,
        subscribe,
        unsubscribe
    };
})();

export default store;
  