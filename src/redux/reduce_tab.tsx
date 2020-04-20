/* 
    This reducer is for Tab
*/
import { INIT_STATE, INIT_STATE_TYPE } from "./initState"

//-----------------------------------
export const ACT_TYPE_TAB_SET_TAB = 'ACT_TYPE_TAB_SET_TAB';
type actIntent_tab_SetTab = {
    type: typeof ACT_TYPE_TAB_SET_TAB
    tab: INIT_STATE_TYPE["tab"]
}
export const actcreate_tab_setTab = (tab:INIT_STATE_TYPE["tab"]):actIntent_tab_SetTab=>{
    return { type: ACT_TYPE_TAB_SET_TAB, tab };
}

//-----------------------------------
// export const ACT_TYPE_TAB_STUB = 'ACT_TYPE_TAB_STUB';
// type actIntent_tab_Stub = {
//     type: typeof ACT_TYPE_TAB_STUB
//     stub: string
// }
// export const actcreate_tab_stub = (stub:string):actIntent_tab_Stub=>{
//     return { type: ACT_TYPE_TAB_STUB, stub };
// }
//===================================


type actIntent_tab = actIntent_tab_SetTab//|actIntent_tab_Stub;
export function reduce_tab(state=INIT_STATE["tab"], action:actIntent_tab){
    switch (action.type) {
        case ACT_TYPE_TAB_SET_TAB:
            return action.tab;
        // case ACT_TYPE_TAB_STUB:
        //     console.log("ACT_TYPE_TAB_STUB");
        //     return state;
        default:
            return state;
    }
}