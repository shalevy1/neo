import MainContainer from './MainContainer.mjs';

const onStart = () => Neo.app({
    appPath : 'examples/tableFiltering/',
    mainView: MainContainer,
    name    : 'TestApp'
});

export {onStart as onStart};