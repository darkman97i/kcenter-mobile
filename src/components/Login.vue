<template>
  <ion-page>

    <ion-content padding class="h-100">
      username: {{username}}<br/>
      password: {{password}}<br/>
      selectedLanguage: {{selectedLanguage}}<br/>
      language: {{languages}}
      <ion-grid class="h-100">
        <ion-row class="h-100 ion-align-items-center">
          <ion-col>
            <ion-card>
              <div>
                <form @submit.prevent="executeLogin">
                  <ion-row>
                    <ion-col>
                      <ion-list inset>

                        <ion-item>
                          <ion-input ref="userName" @keyup.enter.prevent="executeLogin" v-model="username" type="text" placeholder="Username" name="username" required></ion-input>
                        </ion-item>

                        <ion-item>
                          <IonInput @keyup.enter.prevent="executeLogin" v-model="password" type="password" placeholder="Password" name="password" autocomplete="current-password" required></IonInput>
                        </ion-item>

                        <ion-item>
                          <ion-label>Language</ion-label>
                          <IonSelect v-model="selectedLanguage" required>
                            <ion-select-option v-for="language in languages" :value="language.id" :key="language.id">{{language.name}}</ion-select-option>
                          </IonSelect>
                        </ion-item>

                      </ion-list>
                    </ion-col>
                  </ion-row>

                  <ion-row>
                    <ion-col>
                      <ion-button expand="block" type="submit">Sign In</ion-button>
                    </ion-col>
                  </ion-row>

                </form>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from 'vue';
  import { mapActions, mapGetters } from "vuex";
  import { IonPage, IonButton , IonContent, IonCol, IonRow, IonGrid, IonInput, IonItem, IonList, IonCard, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';

  export default defineComponent({
    name: 'Login',
    components: { IonPage, IonButton, IonContent, IonCol, IonRow, IonGrid, IonInput, IonItem, IonList, IonCard, IonLabel, IonSelect, IonSelectOption },
    data: () => ({
      username: 'okmAdmin',
      password: 'admin',
      selectedLanguage: 'en-GB',
      error: null
    }),
    created() {
      this.getLanguages();
    },
    computed: {
      ...mapGetters('language', ['languages']),
    },
    methods: {
      ...mapActions('language', ['getLanguages']),
      ...mapActions('user', ['login', 'setTryingLogin']),
      executeLogin() {
        this.getLanguages(); // Not Works
      }
    }
  });
</script>
