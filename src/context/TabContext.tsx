import React from 'react';

const TabContext = React.createContext({});
const { Provider, Consumer } = TabContext;


export interface TabContextProviderProps {
    
}
 
const TabContextProvider: React.FC<TabContextProviderProps> = (props) => {
    return ( <></> );
}
 
export default TabContextProvider;