<template>
    <div class="container">
      <div class="tiny-editor">
        <Editor api-key="22a5hpysl6pcfcctei3v4pxthc607lx40ucaa2rbrltzbkld" :init="config" />
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
  
  <script setup>
  import { ref } from 'vue';
  import Editor from '@tinymce/tinymce-vue';
  import Modal from '../components/Modal.vue';
  
  const showModal = ref(false);
  const fileUrl = ref('');
  
  const config = {
    plugins: 'customToolbarButton link file',
    toolbar: 'customToolbarButton',
    setup: (editor) => {
      window.tinymce.PluginManager.add('customToolbarButton', customToolbarButton);
    },
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  const handleUpload = () => {
    const editor = window.tinymce.activeEditor;
    const tag = `<a href="${fileUrl.value}" target="_blank" class="file-button">Download File</a>`;
    editor.insertContent(tag);
    closeModal();
  };
  
  const customToolbarButton = (editor) => {
    editor.ui.registry.addButton('customToolbarButton', {
      text: 'Attach file',
      icon: 'attach',
      onAction: () => {
        showModal.value = true;
      },
    });
  };
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
  