<template>
  <ion-phaser 
    v-bind:game.prop="game"
    v-bind:initialize.prop="initialize"
  />
</template>

<script setup lang="ts">
import Phaser from 'phaser'
export default {
  name: 'IonPhaser',
  data() {
    return {
      initialize: false,
      game: {
        width: "100%",
        height: "100%",
        type: Phaser.AUTO,
        scene: {
          init: function() {
            this.cameras.main.setBackgroundColor('#24252A')
          },
          create: function() {
            this.helloWorld = this.add.text(
              this.cameras.main.centerX, 
              this.cameras.main.centerY, 
              "Hello World", { 
                font: "40px Arial", 
                fill: "#ffffff" 
              }
            );
            this.helloWorld.setOrigin(0.5);
          },
          update: function() {
            this.helloWorld.angle += 1;
          }
        }
      }
    }
  }
}
</script>