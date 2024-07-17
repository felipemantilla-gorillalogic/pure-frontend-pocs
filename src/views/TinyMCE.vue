<template>
  <div class="container">
    <div class="tiny-editor">
      <!-- TinyMCE Editor component -->
      <editor api-key="22a5hpysl6pcfcctei3v4pxthc607lx40ucaa2rbrltzbkld" :init="config" />
    </div>
  </div>
  <Teleport to="body">
    <!-- Modal component for file URL input -->
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Paste file url</h3>
      </template>
      <template #body>
        <input type="text" v-model="fileUrl" />
      </template>
      <template #footer>
        <button @click="showModal = false">Cancel</button>
        <button @click="handleUpload">Upload</button>
      </template>
    </modal>
  </Teleport>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue';
import Modal from '../components/Modal.vue'
import { ref } from 'vue'

// Reactive variables
const showModal = ref(false)
const fileUrl = ref('')

// TinyMCE configuration
const config = {
  plugins: 'customToolbarButton link file',
  toolbar: 'customToolbarButton',
  setup: () => {
    console.log(window.tinymce.PluginManager)
    window.tinymce.PluginManager.add('customToolbarButton', customToolbarButton)
  }
}

// Handle file upload
const handleUpload = () => {
  const editor = window.tinymce.activeEditor;
  const tag = `<a href="${fileUrl.value}" target="_blank" class="file-button">Download File</a>`
  editor.insertContent(tag);
  showModal.value = false
}

// Custom toolbar button setup
const customToolbarButton = (editor) => {
  editor.ui.registry.addButton('customToolbarButton', {
    text: 'Attach file',
    icon: 'attach',
    onAction: () => {
      console.log('clicked')
      showModal.value = true
    }
  })
}
</script>

<style scoped>
.tiny-editor {
  min-width: 80vw;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>