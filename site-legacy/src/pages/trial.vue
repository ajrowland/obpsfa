<template>
  <Layout>
    <div class="trial-form">
      <div class="ml-embedded" data-form="29OKUs"></div>
    </div>
  </Layout>
</template>

<style lang="scss">
.trial-form {
  @include mq($from: tablet) {
    width: 70%;
  }
}

input.custom-control-input[type="checkbox"] {
  z-index: auto !important;
}

.ml-form-formContent {
  margin-bottom: 100px !important;
}

.ml-field-group label {
  padding: 0;
}
</style>
