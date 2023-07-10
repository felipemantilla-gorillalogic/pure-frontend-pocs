<template>
    <div class="container">
        <div class="tiny-editor">
            <editor api-key="22a5hpysl6pcfcctei3v4pxthc607lx40ucaa2rbrltzbkld" :init="config" />
        </div>
    </div>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
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

const showModal = ref(false)

const fileUrl = ref('')

const config = {
    // menubar: false,
    file_picker_callback: (callback, value, meta) => {

    },
    plugins: 'customToolbarButton link file',
    toolbar: 'customToolbarButton',
    setup: () => {
        console.log(window.tinymce.PluginManager)

        window.tinymce.PluginManager.add('customToolbarButton', customToolbarButton)
    }
}

const handleUpload = () => {
    console.log(fileUrl.value)
    // fetch(fileUrl.value)
    //     .then(response => response.blob())
    //     .then(blob => {
    //         // Create a file object from the fetched blob

    //         console.log(blob)

    //         const file = new File([blob], `file.${blob.type.split('/')[1]}`, { type: blob.type });

    //         // Convert the file object to a data URL
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const dataUrl = reader.result;

    //             // Attach the file to TinyMCE
    //             const editor = window.tinymce.activeEditor; // Access the active editor instance
    //             const tag = `<a href="${dataUrl}" download>Download File</a>`

    //             console.log(tag)
    //             editor.insertContent(tag);
    //         };
    //         reader.readAsDataURL(file);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching file:', error);
    //     });

    const editor = window.tinymce.activeEditor; // Access the active editor instance
    // const tag = `<a href="${fileUrl.value}" >Download File</a>`
    const tag = `<a href="${fileUrl.value}" target="_blank" class="file-button">Download File</a>`
    editor.insertContent(tag);

    showModal.value = false
}


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