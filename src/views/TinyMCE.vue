<template>
  <div class="container">
    <div class="tiny-editor">
      <Editor
        api-key="22a5hpysl6pcfcctei3v4pxthc607lx40ucaa2rbrltzbkld"
        :init="config"
      />
    </div>
  </div>
  <Teleport to="body">
    <Modal :show="showModal" @close="closeModal">
      <template #header>
        <h3>Paste file URL</h3>
      </template>
      <template #body>
        <input type="text" v-model="fileUrl" />
      </template>
      <template #footer>
        <button @click="closeModal">Cancel</button>
        <button @click="handleUpload">Upload</button>
      </template>
    </Modal>
  </Teleport>
</template>

<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'
import Modal from '../components/Modal.vue'
import { ref } from 'vue'

const showModal = ref(false)
const fileUrl = ref('')

const config = {
  plugins: 'link file',
  toolbar: 'customToolbarButton',
  setup: (editor: any) => {
    editor.ui.registry.addButton('customToolbarButton', {
      text: 'Attach file',
      icon: 'attach',
      onAction: () => {
        showModal.value = true
      }
    })
  }
}

const handleUpload = () => {
  const editor = window.tinymce.activeEditor
  if (editor && fileUrl.value) {
    const tag = `<a href="${fileUrl.value}" target="_blank" class="file-button">Download File</a>`
    editor.insertContent(tag)
    closeModal()
  }
}

const closeModal = () => {
  showModal.value = false
  fileUrl.value = ''
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