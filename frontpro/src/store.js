import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProjectAllReducer, newProjectReducer, projectAllAdminReducer, projectAllDetailsReducer, projectAllnotAdminReducer, projectAllReducer, projectDeleteAdminReducer, projectUpdateAdminReducer } from "./reducers/projectAllReducer";
import { userReducer } from "./reducers/userReducer";


const reducer = combineReducers({
    projectDetails:projectAllReducer,

    newAllproject:newProjectAllReducer,
    projectDetail:projectAllDetailsReducer,

    projectAdminDetailsAll:projectAllAdminReducer,
    
    user:userReducer,
    newProject:newProjectReducer,

    projectAdminDelete:projectDeleteAdminReducer,
    projectUpdate:projectUpdateAdminReducer,
});
let initialState = {
    
  };
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;