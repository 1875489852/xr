import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

function storeSessionStore (state) {
  sessionStorage.setItem("Msg",JSON.stringify(state));
}

export default new Vuex.Store({
  state:{
    authorId: "",
    authorName: '',
    bookName: '',
  },
  mutations:{
    saveAuthorId(state,authorId){
      state.authorId = authorId;
      storeSessionStore(state);
    },
    saveAuthorName(state,authorName){
      state.authorName = authorName;
      storeSessionStore(state);
    },
    saveBookName(state,bookName){
      state.bookName = bookName;
      storeSessionStore(state);
    }
  }
})
