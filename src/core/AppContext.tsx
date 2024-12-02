import {createContext, ParentComponent, useContext} from 'solid-js';
import {createStore, SetStoreFunction} from 'solid-js/store';

export type AppState = {
  // add global app state here
}

type AppContextValue = {
  state: AppState;
  setState: SetStoreFunction<AppState>;
}

const AppContext = createContext<AppContextValue>();

/**
 * Usage: just add to root like
 * ```
 * const App: Component = () => {
 *   return (
 *     <div class={styles.App}>
 *         <AppProvider>
 *           ...
 *         </AppProvider>
 *     </div>
 *   );
 * };
 * ```
 */
export const AppProvider: ParentComponent = (props) => {
  const [state, setState] = createStore<AppState>({});
  const contextValue: AppContextValue = {
    state,
    setState,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};