<template>
  <div class="container">
    <div class="tiny-editor">
      <Editor
        api-key="22a5hpysl6pcfcctei3v4pxthc607lx40ucaa2rbrltzbkld"
        :init="editorConfig"
        v-model="editorContent"
      />
    </div>
  </div>
  <Modal :show="showModal" @close="closeModal">
    <template #header>
      <h3>Paste file URL</h3>
    </template>
    <template #body>
      <input type="text" v-model="fileUrl" placeholder="Enter file URL" />
    </template>
    <template #footer>
      <button @click="closeModal">Cancel</button>
      <button @click="handleUpload" :disabled="!fileUrl">Upload</button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import Modal from '../components/Modal.vue'

const showModal = ref(false)
const fileUrl = ref('')
const editorContent = ref('')

const editorConfig = reactive({
  plugins: 'link file',
  toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link | customToolbarButton',
  setup: (editor: any) => {
    editor.ui.registry.addButton('customToolbarButton', {
      text: 'Attach file',
      icon: 'attach',
      onAction: () => {
        showModal.value = true
      }
    })
  }
})

const handleUpload = () => {
  const editor = (window as any).tinymce.activeEditor
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
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tiny-editor {
  min-width: 100%;
}
</style>