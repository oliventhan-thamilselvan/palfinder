<script setup lang="ts">
import LogoIcon from '@/components/icons/PalFinderFooter.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer
    class="lg:grid lg:gap-12 lg:grid-cols-12 space-y-6 bg-sky-600 py-16 px-6 text-white lg:space-y-0"
  >
    <div class="mb-12">
      <RouterLink to="/">
        <LogoIcon />
      </RouterLink>
    </div>
    <nav class="space-y-4 col-span-3 col-start-7">
      <h3 class="font-bold uppercase">Menu</h3>
      <ul class="lg:space-y-4 font-light text-sm">
        <li><RouterLink to="">Mentions légales</RouterLink></li>
        <li><RouterLink to="">Formulaire de contact</RouterLink></li>
      </ul>
    </nav>

    <div class="col-span-3 col-start-10 space-y-3">
      <h3 class="font-bold uppercase">contact</h3>
      <address>
        4 place Tharradin<br />25200 Montbéliard<br />
        <a href="mailto:PalFinder@gmail.com@gmail.com">PalFinder@gmail.com</a>
      </address>
    </div>
    <p class="col-span-12 text-xs">
      *PalFinder décline toute responsabilité en cas de problème sur un terrain. Les terrains sont
      publics et ne sont en aucun cas la propriété du joueur ou de l'équipe PalFinder. Si un terrain
      est occupé à votre arrivée, nous ne sommes en aucun cas responsables. Veuillez nous contacter
      pour obtenir de plus amples informations.
    </p>
  </footer>
</template>
