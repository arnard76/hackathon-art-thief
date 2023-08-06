<script>
  import Typewriter from "svelte-typewriter";
  import Button from "$lib/Button.svelte";
  import { afterUpdate } from "svelte";
  import "./styles.css";
  import { goto } from "$app/navigation";

  let startBtn;
  let showStartBtn = true;
  let showContinueButton = false;
  let showBox = false;
  let keepCursorOnFinish = true;
  let interval = 75;

  const handleClick = () => {
    showBox = true;
    showStartBtn = false;
  };
  const textLength = 208;

  afterUpdate(() => {
    if (!showContinueButton) {
      setTimeout(() => {
        showContinueButton = true;
      }, interval * textLength * 1.5);
    }
  });
</script>

<svelte:head>
  <title>The Art Thief</title>
  <meta name="description" content="The Art Thief" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{#if showStartBtn}
  <div class="button-container" bind:this={startBtn} on:click={handleClick}>
    <Button>Start</Button>
  </div>
{/if}

<div class="game-title-container"><h1 class="title">The Art Thief</h1></div>

{#if showBox}
  <div class="box-container">
    <div class="box">
      <Typewriter {interval} {keepCursorOnFinish}>
        <p class="mission-statement">
          You are an art thief... 
          Your mission is to steal a historic piece of artwork and replace it with a forgery. 
          Should you succeed in stealing the piece of artwork, you will have successfully rewritten history...
        </p>
      </Typewriter>
      {#if showContinueButton}
        <div class="button-container">
          <Button on:click={() => goto("/gallery")}>Continue</Button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<div class="background">
  <img src="./gameArt/landingPage.svg" alt="" srcset="" />
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Press Start 2P", Helvetica, sans-serif;
  }

  .game-title-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    padding-top: 24px;
    color: black;
  }

  .box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .mission-statement {
    font-size: 32px;
    color: white;
    --cursor-width: 8px;
    --cursor-color: white;
  }

  .box-container .box {
    width: 50%;
    height: 600px;
    background-color: rgba(91, 91, 91, 0.718);
    padding: 8px;
    border-radius: 16px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    padding: 16px 0;
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    display: flex;
    align-items: center;
    justify-content: center; /* Center both horizontally and vertically */
  }

  .background > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
