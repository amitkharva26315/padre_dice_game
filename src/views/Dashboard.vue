<template>
  <div id="dashboard">
    <section>
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
import { mapState } from "vuex";
import moment from "moment";

export default {
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
    };
  },
  computed: {
    ...mapState(["userProfile", "general_skills"]),
  },
  watch: {
    general_skills: function (val) {
      console.log("watch", val);
      if (this.general_skills.cost) {
        this.generalSkills.cost = this.general_skills.cost;
      }
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
