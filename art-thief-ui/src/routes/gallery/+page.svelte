<script>
  // @ts-nocheck

  import artworks, { selectedImage } from "$lib/stolenImages";
  import Painting from "$lib/Painting.svelte";
  import { goto } from "$app/navigation";

  $: console.log($artworks);
</script>

<div class="gallery">
  {#each $artworks as currentPainting (currentPainting.id)}
    <Painting
      src={currentPainting.path}
      isVertical={currentPainting.vertical}
      on:click={() => {
        selectedImage.set(currentPainting.path);
        console.log($selectedImage);
        goto("/drawing");
      }}
    />
  {/each}
</div>

<style>
  .gallery {
    background-image: url("/gallery_2.jpg");
    background-size: cover;
    background-position-y: center;

    height: calc(100vh) !important;
    display: flex;
    padding-left: 8rem;
    padding-right: 8rem;
    /* justify-content: center; */
    align-items: center;
    flex-direction: row;
    gap: 8rem;
    overflow-y: hidden;
  }
</style>
