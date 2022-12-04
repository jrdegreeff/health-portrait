<!-- Reusable component representing a single insurance card and its actions -->

<template>
  <article
    class="insurance"
  >
    <section>
      <div>
        <label> Purpose: </label>
        <input
          v-if="editing"
          v-model="purpose"
        >
        <p
          v-else
        >
          {{ insurance.purpose }}
        </p>
        </label>
      </div>

      <div>
        <label> Subscriber Name: </label>
        <input
          v-if="editing"
          v-model="subscriber_name"
        >
        <p
          v-else
        >
          {{ insurance.subscriber_name }}
        </p>
        </label>
      </div>
      
      <div>
        <label> Member ID: </label>
        <input
          v-if="editing"
          v-model="member_id"
        >
        <p
          v-else
        >
          {{ insurance.member_id }}
        </p>
        </label>
      </div>
  
      <div>
        <label> Group Number: </label>
        <input
          v-if="editing"
          v-model="group_number"
        >
        <p
          v-else
        >
          {{ insurance.group_number }}
        </p>
        </label>
      </div>
  
      <div>
        <label> Plan Number: </label>
        <input
          v-if="editing"
          v-model="plan_number"
        >
        <p
          v-else
        >
          {{ insurance.plan_number }}
        </p>
        </label>
      </div>
  
      <div>
        <label> Plan Type: </label>
        <input
          v-if="editing"
          v-model="plan_type"
        >
        <p
          v-else
        >
          {{ insurance.plan_type }}
        </p>
        </label>
      </div>
  
      <div>
        <label> Notes: </label>
        <textarea
          v-if="editing"
          v-model="notes"
        >
          <p
            v-else
          >
            {{ insurance.notes }}
          </p>
          </textarea>
      </div>
    </section>
  
    <div
      class="actions"
    >
      <button
        v-if="editing"
        @click="submitEdit"
      >
        ✅ save changes
      </button>
      <button
        v-if="editing"
        @click="stopEditing"
      >
        🚫 discard changes
      </button>
      <button
        v-if="!editing"
        @click="startEditing"
      >
        ✏️ edit
      </button>
      <button @click="deleteInsurance">
        🗑️ delete
      </button>
    </div>
        
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>
    
  <script>
    
    
  export default {
    name: 'InsuranceComponent',
    components: {},
    props: {
      // Data from the stored insurance
      insurance: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        editing: false, // Whether or not this contact is in edit mode
        subscriber_name: this.insurance.subscriber_name,
        member_id: this.insurance.member_id,
        group_number: this.insurance.group_number,
        plan_number: this.insurance.plan_number,
        plan_type: this.insurance.plan_type,
        purpose: this.insurance.purpose,
        notes: this.insurance.notes,
        selected: '',
        alerts: {} // Displays success/error messages encountered during contact modification
      };
    },
    methods: {
      startEditing() {
        /**
         * Enables edit mode on this insurance.
         */
  
        this.editing = true; // Keeps track of if a contact is being edited
        this.subscriber_name = this.insurance.subscriber_name;
        this.member_id = this.insurance.member_id,
        this.group_number = this.insurance.group_number,
        this.plan_number = this.insurance.plan_number,
        this.plan_type = this.insurance.plan_type,
        this.purpose = this.insurance.purpose,
        this.notes = this.insurance.notes;
      },
      stopEditing() {
        /**
         * Disables edit mode on this insurance.
         */
        this.editing = false;
        this.subscriber_name = this.insurance.subscriber_name;
        this.member_id = this.insurance.member_id,
        this.group_number = this.insurance.group_number,
        this.plan_number = this.insurance.plan_number,
        this.plan_type = this.insurance.plan_type,
        this.purpose = this.insurance.purpose,
        this.notes = this.insurance.notes;
      },
      deleteInsurance() {
        /**
         * Deletes this insurance.
         */
        const params = {
          method: 'DELETE',
          callback: () => {
            this.$store.commit('alert', {
              message: 'Successfully deleted insurance!', status: 'success'
            });
          }
        };
        this.request(params);
      },
      submitEdit() {
        /**
         * Updates insurance to have the submitted draft content.
         */
        const params = {
          method: 'PATCH',
          message: 'Successfully edited insurance!',
          body: JSON.stringify({subscriber_name: this.subscriber_name, member_id: this.member_id, group_number: this.group_number, plan_number: this.plan_number, plan_type: this.plan_type, purpose: this.purpose, notes: this.notes}),
          callback: () => {
            this.$set(this.alerts, params.message, 'success');
            setTimeout(() => this.$delete(this.alerts, params.message), 3000);
          }
        };
        this.request(params);
      },
      async request(params) {
        /**
         * Submits a request to the insurance's endpoint
         * @param params - Options for the request
         * @param params.body - Body for the request, if it exists
         * @param params.callback - Function to run if the the request succeeds
         */
        const options = {
          method: params.method, headers: {'Content-Type': 'application/json'}
        };
        if (params.body) {
          options.body = params.body;
        }
  
        try {
          const r = await fetch(`/api/insurance-cards/${this.insurance._id}`, options);
          if (!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
          }
          this.$store.commit('refreshInsurances');
          this.editing = false;
    
          params.callback();
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      }
    }
  };
  </script>
    
  <style scoped>
  .contact {
      border: 1px solid #111;
      padding: 20px;
      position: relative;
  }
  
  p {
    display: inline;
  }
  
  div {
    display: block;
    padding: 5px;
  }
  
  small {
    color: #AAAAAA;
  }
  
   </style>