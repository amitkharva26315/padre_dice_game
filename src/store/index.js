import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

// realtime firebase
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setPosts', postsArray)
})


fb.employeeCollection.onSnapshot(snapshot => {
  let employeesArray = []

  snapshot.forEach(doc => {
    let employee = doc.data()
    employee.id = doc.id

    employeesArray.push(employee)
  })

  store.commit('setEmployees', employeesArray)
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    employees: [],
    general_skills: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    },
    setPosts(state, val) {
      state.posts = val
    },
    setEmployees(state, val) {
      state.employees = val
    },
    setGeneralSkill(state, val) {
      state.general_skills = val
    }
  },
  actions: {
    async calulateGeneralSkills({ state, commit }, generalSkill) {
      if (generalSkill.dpAllocation) {
        const res1 = Math.floor(generalSkill.dpAllocation / generalSkill.cost);

        // tablas_ranks
        const identityDocs = await fb.identityCollection.get()
        if (identityDocs && identityDocs.size && identityDocs.size > 0) {
          var Culture_Status = "";
          var index = 0;
          identityDocs.forEach((doc) => {
            if (index == 0) {
              const item = doc.data();
              console.log("identityDocs", item);
              Culture_Status = item.Culture_Status;
            }
            index++;
          });

          const tablasRanksDocs = await fb.tablasRanksCollection.where('CultureRanks', '==', generalSkill.skill).get()
          if (tablasRanksDocs && tablasRanksDocs.size && tablasRanksDocs.size > 0) {
            index = 0;
            tablasRanksDocs.forEach((doc) => {
              if (index == 0) {
                const item = doc.data();
                const res2 = item[Culture_Status];
                console.log(res1, res2);
                // alert(res1 + res2);
                generalSkill.Rank = res1 + res2;
                store.commit('setGeneralSkill', generalSkill)
                if (generalSkill.Rank == "" || generalSkill.Rank == 0) {
                  generalSkill.Rank = 0;
                } else {
                  var rankval1 = 30, rankval2 = 0, rankval3 = 0;
                  if (generalSkill.Rank <= 10) {
                    rankval1 = generalSkill.Rank * 3;
                  }
                  if (generalSkill.Rank > 10) {
                    if (generalSkill.Rank <= 20) {
                      rankval2 = (generalSkill.Rank - 10) * 2;
                    } else {
                      rankval2 = 20;
                    }
                  }
                  if (generalSkill.Rank > 20) {
                    rankval3 = generalSkill.Rank - 20;
                  }
                  generalSkill.RankValue = rankval1 + rankval2 + rankval3;
                }
                store.commit('setGeneralSkill', generalSkill);
              }
              index++;
            });
            // generalSkill
            const categoryDocs = await fb.categoriesCollection.where('Category', '==', generalSkill.category).get();
            if (categoryDocs && categoryDocs.size && categoryDocs.size > 0) {
              index = 0;
              categoryDocs.forEach((doc) => {
                if (index == 0) {
                  const item = doc.data();
                  console.log("categoryDocs", item);
                  generalSkill.CatValue = item.Modified;
                  store.commit('setGeneralSkill', generalSkill);
                }
                index++;
              });
            }
            // statValue
            const statsDocs = await fb.statsCollection.where('Alias', '==', generalSkill.stat).get()
            if (statsDocs && statsDocs.size && statsDocs.size > 0) {
              index = 0;
              statsDocs.forEach((doc) => {
                if (index == 0) {
                  const item = doc.data();
                  console.log("stats", item);
                  generalSkill.StatValue = item.Total;
                  store.commit('setGeneralSkill', generalSkill)
                }
                index++;
              });
            }
            generalSkill.Total =
              generalSkill.RankValue +
              generalSkill.CatValue +
              generalSkill.StatValue +
              generalSkill.Talent +
              generalSkill.Special;
            store.commit('setGeneralSkill', generalSkill)
          }
        }
      }
    },
    async calulateCosts({ state, commit }, generalSkill) {
      // if (generalSkill.dpAllocation) {
      // alert(generalSkill.dpAllocation);
      const statsDocs = await fb.statsCollection.where('Alias', '==', generalSkill.stat).get()
      if (statsDocs && statsDocs.size && statsDocs.size > 0) {
        var current_stats = "";
        var index = 0;
        statsDocs.forEach((doc) => {
          if (index == 0) {
            const item = doc.data();
            console.log(item);
            current_stats = item.Stats;
          }
          index++;
        });
        // alert(current_stats);
        if (current_stats) {
          const stateProgDocs = await fb.stateProgressionCollection.where('STAT', '==', current_stats).get()
          var CostSKILL = "";
          var index_statProg = 0;
          stateProgDocs.forEach((doc) => {
            if (index_statProg == 0) {
              const item_statProg = doc.data();
              console.log("item_statProg", item_statProg);
              CostSKILL = item_statProg["Cost SKILL"];
              generalSkill.cost = CostSKILL;
              // alert("CostSKILL" + CostSKILL);
              store.commit('setGeneralSkill', generalSkill);
            }
            index_statProg++;
          });
        }
      }
      const talentsTablesPivot = await fb.talentsTablesPivotCollection.where('AfectedSkill', '==', generalSkill.skill).get();
      if (talentsTablesPivot && talentsTablesPivot.size && talentsTablesPivot.size > 0) {
        index = 0;
        talentsTablesPivot.forEach((doc) => {
          if (index == 0) {
            const item = doc.data();
            console.log("SUM_ofTotalBonus", item);
            generalSkill.Talent = item.SUM_ofTotalBonus;
            store.commit('setGeneralSkill', generalSkill);
          }
          index++;
        });
      }
      // }
      // console.log(statsDocs);
      // statsDocs.forEach(doc => {
      //   console.log(doc.data());
      //   // fb.postsCollection.doc(doc.id).update({
      //   //   userName: user.name
      //   // })
      // })
    },
    async createEmployee({ state, commit }, employee) {
      // create employee in firebase
      await fb.employeeCollection.add({
        createdOn: new Date(),
        content: employee.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name
      })
    },
    async updateEmployee({ state, commit }, employee) {
      // update employee in firebase
      await fb.employeeCollection.doc(employee.id).update({
        content: employee.content
      })
    },
    async deleteEmployee({ state, commit }, employee_id) {
      console.log(employee_id);
      // update employee in firebase
      await fb.employeeCollection.doc(employee_id).delete()
    },
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut()

      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      router.push('/login')
    },
    async createPost({ state, commit }, post) {
      // create post in firebase
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },
    async likePost({ commit }, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { return }

      // create post
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })

      // update post likes count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1
      })
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title
      })

      dispatch('fetchUserProfile', { uid: userId })

      // update all posts by user
      const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
      postDocs.forEach(doc => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name
        })
      })

      // update all comments by user
      const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
      commentDocs.forEach(doc => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name
        })
      })
    }
  }
})

export default store
