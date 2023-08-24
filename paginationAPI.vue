<template>
    <div class="modal-overlay" >
        <div class="modal">
            <div class="card">
                <h6>{{ $t('create') }}</h6>
                <form @submit.prevent="handleSubmit" class="form">
                    <!-- ... other input fields ... -->
                    <label for="Name" class="label">Name</label>
                    <input v-model="formData.name" type="text" id="Name" class="input" required>

                    <label for="imagePath" class="label">Image</label>
                    <input type="file" @change="handleImageChange" id="imagePath" class="input" accept="image/*" required>
                    <!-- <img v-if="formData.imagePath" :src="formData.imagePath" alt="Selected Image"> -->

                    <label for="pricePerDay" class="label">pricePerDay</label>
                    <input v-model="formData.pricePerDay" type="text" id="pricePerDay" class="input" required>

                    <label for="district" class="label">District</label>
                    <input v-model="formData.district" type="text" id="district" class="input" required>

                    <label for="region" class="label">Region</label>
                    <input v-model="formData.region" type="text" id="region" class="input" required>

                    <label for="address" class="label">Address</label>
                    <input v-model="formData.address" type="text" id="address" class="input" required>

                    <label for="status" class="label">Status</label>
                    <select v-model.number="formData.status" id="status" class="input" required>
                        <option value="0">Bo'sh</option>
                        <option value="1">Arendada</option>
                    </select>

                    <label for="phoneNumber" class="label">Phone Number</label>
                    <input v-model="formData.phoneNumber" type="text" id="phoneNumber" class="input" required>

                    <label for="description" class="label">Description</label>
                    <textarea v-model="formData.description" id="description" class="input" required></textarea>

                    <div class="button-container">
                        <button type="submit" class="button create-button">{{ $t('create') }}</button>
                        <button type="button" @click="closeModal" class="button cancel-button">{{ $t('cancel') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import axios from '@/plugins/axios';
import { InstrumentCreateDto } from '../../dtos/instruments/InstrumentCreateDto'; // Adjust the import path
import { useI18n } from 'vue-i18n';

export default {
    name: 'TransportCreateModal',
    data() {
        return {
            formData: new InstrumentCreateDto(),
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        handleImageChange(event) {
            this.formData.imagePath = event.target.files[0];
        },
        async handleSubmit() {
            try {
                const formData = new FormData();
                for (const key in this.formData) {
                    if (key === 'imagePath') {
                        formData.append(key, this.formData[key], this.formData[key].name);
                    } else {
                        formData.append(key, this.formData[key]);
                    }
                }
                console.log(formData);

                const response = await axios.post('/api/instruments', formData);
                this.closeModal();
                alert('Item created successfully!');
                // Handle the response or redirect as needed
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },
    },
    setup() {
        const { t } = useI18n();
        return {
            t,
        };
    },
};
</script>

<style scoped>
/* Modal overlay */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* overflow: scroll; */
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Modal */
.modal {
    width: auto;
    height: 500px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    overflow: scroll;
}

/* Form styles */
.form {
    display: flex;
    flex-direction: column;
}

.card {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.label {
    font-weight: bold;
    margin-bottom: 8px;
}

.input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 12px;
}

/* Button styles */
.button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
}

.button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.create-button {
    background-color: #3490dc;
    color: white;
}

.cancel-button {
    background-color: #ccc;
    color: #333;
}

.button:hover {
    background-color: #4a9ed9;
}
</style>