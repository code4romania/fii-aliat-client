<template>
  <a class="inline-block button">
    <div class="button-rainbow">
      <svg viewBox="0 0 375 375" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="M0 0h375v375H0z"/></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><path d="M375 750C167.893 750 0 582.107 0 375S167.893 0 375 0s375 167.893 375 375-167.893 375-375 375zm1.5-200c97.478 0 176.5-79.022 176.5-176.5S473.978 197 376.5 197 200 276.022 200 373.5 279.022 550 376.5 550z" fill="#F41B39" fill-rule="nonzero" mask="url(#b)"/><path d="M375.5 710C190.208 710 40 559.792 40 374.5S190.208 39 375.5 39 711 189.208 711 374.5 560.792 710 375.5 710zm1-160c97.478 0 176.5-79.022 176.5-176.5S473.978 197 376.5 197 200 276.022 200 373.5 279.022 550 376.5 550z" fill="#F4601F" fill-rule="nonzero" mask="url(#b)"/><path d="M375.5 670C212.3 670 80 537.7 80 374.5S212.3 79 375.5 79 671 211.3 671 374.5 538.7 670 375.5 670zm1-120c97.478 0 176.5-79.022 176.5-176.5S473.978 197 376.5 197 200 276.022 200 373.5 279.022 550 376.5 550z" fill="#F3F137" fill-rule="nonzero" mask="url(#b)"/><path d="M376 630c-141.385 0-256-114.615-256-256s114.615-256 256-256 256 114.615 256 256-114.615 256-256 256zm.5-80c97.478 0 176.5-79.022 176.5-176.5S473.978 197 376.5 197 200 276.022 200 373.5 279.022 550 376.5 550z" fill="#29EE75" fill-rule="nonzero" mask="url(#b)"/><path d="M376 590c-119.294 0-216-96.706-216-216s96.706-216 216-216 216 96.706 216 216-96.706 216-216 216zm.5-40c97.478 0 176.5-79.022 176.5-176.5S473.978 197 376.5 197 200 276.022 200 373.5 279.022 550 376.5 550z" fill="#2024EC" fill-rule="nonzero" mask="url(#b)"/></g></svg>
    </div>
    <span class="button-text">Sunt alături de voi</span>
  </a>
</template>

<script>
    export default {
      name: 'PrideButton'
    };
</script>

<style>
.button {
  position: relative;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  cursor: pointer;
  padding: 15px 35px;
  background: #9725F3;
  border-radius: 6px;
  font-size: 26px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #F3F137;
}
.button-text {
  position: relative;
}
.button-rainbow {
  width: 150%;
  height: auto;
  top: 10px;
  left: -25%;
  position: absolute;
  transition: 1000ms transform cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateY(0) rotate(45deg);
}

.button:hover .button-rainbow {
  transform: translateY(-100%) rotate(45deg);
}
</style>
