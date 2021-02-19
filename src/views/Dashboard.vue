<template>
  <div id="dashboard">
    <transition name="fade">
      <CommentModal
        v-if="showCommentModal"
        :post="selectedPost"
        @close="toggleCommentModal()"
      ></CommentModal>
    </transition>
    <section>
      <!-- <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <div class="create-post">
            <p>create a post</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content"></textarea>
              <button @click="createPost()" :disabled="post.content === ''" class="button">post</button>
            </form>
          </div>
        </div>
      </div> -->
      <!-- <div class="col2">
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <h5>{{ post.userName }}</h5>
            <span>{{ post.createdOn | formatDate }}</span>
            <p>{{ post.content | trimLength }}</p>
            <ul>
              <li><a @click="toggleCommentModal(post)">comments {{ post.comments }}</a></li>
              <li><a @click="likePost(post.id, post.likes)">likes {{ post.likes }}</a></li>
              <li><a @click="viewPost(post)">view full post</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div> -->
      <!-- <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <div class="create-post">
            <p>create a employee</p>
            <form @submit.prevent>
              <textarea v-model.trim="employee.content"></textarea>
              <button @click="createEmployee()" :disabled="employee.content === ''" class="button">Create Employee</button>
              <button @click="updateEmployee()" :disabled="employee.content === ''" class="button">Update Employee</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="employees.length">
          <div v-for="employee in employees" :key="employee.id" class="post">
            <p>{{ employee.content | trimLength }}</p>
            <button type="button" @click="editEmployee(employee)">edit</button>
            <button type="button" @click="deleteEmployee(employee.id)">delete</button>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no employees</p>
        </div>
      </div> -->

      <!-- full post modal -->
      <!-- <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal()" class="close">close</a>
          <div class="post">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li><a>comments {{ fullPost.comments }}</a></li>
              <li><a>likes {{ fullPost.likes }}</a></li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div v-for="comment in postComments" :key="comment.id" class="comment">
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition> -->
      <div style="width: 100%; overflow-x: auto">
        <table border="1" cellpadding="0" cellspacing="0" id="responsive-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Skill</th>
              <th>Stat</th>
              <th>DP ALLOCATION</th>
              <th>Cost</th>
              <th># Rank</th>
              <th>Rank Value</th>
              <th>Cat Value</th>
              <th>Stat Value</th>
              <th>Talent</th>
              <th>Special</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  class="input-field"
                  type="text"
                  v-model="generalSkills.category"
                />
              </td>
              <td>
                <input
                  class="input-field"
                  type="text"
                  v-model="generalSkills.skill"
                />
              </td>
              <td>
                <input
                  class="input-field"
                  type="text"
                  v-model="generalSkills.stat"
                />
              </td>
              <td>
                <input
                  class="input-field bg-yellow"
                  type="text"
                  v-model="generalSkills.dpAllocation"
                  @change="dpAllocationChange(generalSkills)"
                />
              </td>
              <td>
                <input
                  class="input-field"
                  type="text"
                  v-model="generalSkills.cost"
                />
              </td>
              <td>
                <input
                  class="input-field"
                  type="text"
                  v-model="generalSkills.Rank"
                />
              </td>
              <td>
                <input
                  class="input-field"
                  type="text"
                  v-model="generalSkills.RankValue"
                />
              </td>
              <td>
                <input
                  class="input-field"
                  type="text"
                  v-model="generalSkills.CatValue"
                />
              </td>
              <td>
                <input
                  class="input-field"
                  type="text"
                  v-model="generalSkills.StatValue"
                />
              </td>
              <td>
                <input
                  class="input-field"
                  type="text"
                  v-model="generalSkills.Talent"
                />
              </td>
              <td>
                <input
                  class="input-field"
                  type="text"
                  v-model="generalSkills.Special"
                />
              </td>
              <td>
                <input
                  class="input-field"
                  type="text"
                  v-model="generalSkills.Total"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import { commentsCollection } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
import CommentModal from "@/components/CommentModal";

export default {
  components: {
    CommentModal,
  },
  data() {
    return {
      generalSkills: {
        category: "Animals",
        skill: "Riding",
        stat: "in",
        dpAllocation: "",
        cost: 0,
        Rank: 0,
        RankValue: 0,
        CatValue: 0,
        StatValue: 0,
        Talent: 0,
        Special: 0,
        Total: 0,
      },
      post: {
        content: "",
      },
      employee: {
        id: "",
        content: "",
      },
      showCommentModal: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: [],
    };
  },
  computed: {
    ...mapState(["userProfile", "posts", "employees", "general_skills"]),
  },
  watch: {
    general_skills: function (val) {
      console.log("watch", val);
      if (this.general_skills.cost) {
        this.generalSkills.cost = this.general_skills.cost;
      }
      // if (!this.generalSkills.RankValue) {
      //   this.generalSkills.RankValue = 0;
      // }
      // if (!this.generalSkills.CatValue) {
      //   this.generalSkills.CatValue = 0;
      // }
      // if (!this.generalSkills.StatValue) {
      //   this.generalSkills.StatValue = 0;
      // }
      // if (!this.generalSkills.Talent) {
      //   this.generalSkills.Talent = 0;
      // }
      // if (!this.generalSkills.Special) {
      //   this.generalSkills.Special = 0;
      // }
      // console.log("total");
      // this.generalSkills.Total =
      //   this.generalSkills.RankValue +
      //   this.generalSkills.CatValue +
      //   this.generalSkills.StatValue +
      //   this.generalSkills.Talent +
      //   this.generalSkills.Special;
    },
  },
  mounted() {
    this.$store.dispatch("calulateCosts", this.generalSkills);
  },
  methods: {
    dpAllocationChange(generalSkills) {
      if (generalSkills.dpAllocation) {
        this.$store.dispatch("calulateGeneralSkills", generalSkills);
      }
    },
    createEmployee() {
      this.$store.dispatch("createEmployee", {
        content: this.employee.content,
      });
      this.employee.content = "";
    },
    updateEmployee() {
      this.$store.dispatch("updateEmployee", {
        id: this.employee.id,
        content: this.employee.content,
      });
      this.employee.content = "";
    },
    editEmployee(employee_data) {
      this.employee.id = employee_data.id;
      this.employee.content = employee_data.content;
    },
    deleteEmployee(id) {
      if (confirm("Are you sure want to delete current employee?")) {
        this.$store.dispatch("deleteEmployee", id);
      }
    },
    createPost() {
      this.$store.dispatch("createPost", { content: this.post.content });
      this.post.content = "";
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal;

      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post;
      } else {
        this.selectedPost = {};
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
    async viewPost(post) {
      const docs = await commentsCollection
        .where("postId", "==", post.id)
        .get();

      docs.forEach((doc) => {
        let comment = doc.data();
        comment.id = doc.id;
        this.postComments.push(comment);
      });

      this.fullPost = post;
      this.showPostModal = true;
    },
    closePostModal() {
      this.postComments = [];
      this.showPostModal = false;
    },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }

      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (!val) {
        return "";
      }
      if (val && val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}
#responsive-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#responsive-table td,
#responsive-table th {
  max-width: 25px;
  border: 1px solid #ddd;
  padding: 8px;
}

input[type="text"].input-field {
  width: 100%;
}

#responsive-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

#responsive-table tr:hover {
  background-color: #ddd;
}

#responsive-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #30a0ee;
  color: white;
}
.bg-yellow {
  border: 3px solid #30a0ee;
}
</style>
