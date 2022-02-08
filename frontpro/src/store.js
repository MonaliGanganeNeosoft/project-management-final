import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProjectReducer, projectAllAdminReducer, projectAllDetailsReducer, projectAllnotAdminReducer, projectAllReducer, projectDeleteAdminReducer } from "./reducers/projectAllReducer";
import { userReducer } from "./reducers/userReducer";


const reducer = combineReducers({
    projectDetails:projectAllReducer,
    projectDetail:projectAllDetailsReducer,
    projectAdminDetailsAll:projectAllAdminReducer,
    
    user:userReducer,
    newProject:newProjectReducer,

    projectAdminDelete:projectDeleteAdminReducer,
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