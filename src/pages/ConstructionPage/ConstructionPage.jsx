import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import spaceTravelService from '../../services/spaceTravelService.js';
import styles from './ConstructionPage.module.css';

export default function ConstructionPage ({ onRefreshAll }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        capacity: "",
        description: "",
        pictureUrl: "",
    });
    
    const [statusMessage, setStatusMessage] = useState('');

function handleChange (event) {
        const { name, value} = event.target;
        setFormData((form) => ({
            ...form,
            [name]: value,
        }));
    }

async function handleSubmit (event) {
        event.preventDefault();
        setStatusMessage('Please hold while we build your spacecraft...');

        try {
            const payload = {
                name: formData.name.trim(),
                capacity: Number(formData.capacity),
                description: formData.description.trim(),
                pictureUrl: formData.pictureUrl.trim() || undefined,
            };

        if(!payload.name) {
                setStatusMessage('Name is required.');
                return;
            }

        if (!Number.isInteger(payload.capacity) || payload.capacity <= 0) {
                setStatusMessage('Capacity must be a positive integer.');
                return;
        }

        if (!payload.description) {
            setStatusMessage('Description is required.');
            return;
        }

    const response = await spaceTravelService.buildSpacecraft({payload});
        
        if (!response || response.isError || !response.data) {
            console.log('Error building spacecraft:');
            setStatusMessage('Failed to build spacecraft.');
            return;

        } else {
            setStatusMessage(`Spacecraft "${response.data.name}" is ready!`);

            await onRefreshAll();
          
            navigate(`/spacecrafts/${response.data.id}`);
        }

        } catch (error) {
            console.log('Error building spacecraft:', error);
            setStatusMessage('Failed to build spacecraft.');
        }

        
    }

       return (
        <main className={styles.page}>
        <div className={styles.card}>
        <h3 className={styles.title}>Construct a New Spacecraft</h3>

            <form className={styles.form} onSubmit={handleSubmit}>

                <div className={styles.field}>
                    <label 
                    className={styles.name}  
                    htmlFor="name"
                    >
                    Name:
                    </label>

                    <input
                        className={styles.input}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                
                <div className={styles.field}>

                    <label 
                    className={styles.name}
                    htmlFor="capacity"
                    >
                    Capacity:
                    </label>

                    <input
                        className={styles.input}
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>

                    <label 
                    className={styles.name}
                    htmlFor="description"
                    >
                    Description:
                    </label>

                      <textarea
                        className={styles.textarea}
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>

                <label 
                   className={styles.name}
                   htmlFor="pictureUrl"
                   >
                   Picture:
                   </label>
                    <textarea
                        className={styles.textarea}
                        type="text"
                        id="pictureUrl"
                        name="pictureUrl"
                        value={formData.pictureUrl}
                        onChange={handleChange}
                        />
                </div>

               <div className={styles.actions}>

                <button 
                className={styles.button}
                type="submit"
                >
                Build Spacecraft
                </button>

            </div>

        </form>

            {statusMessage ? <p className={styles.status}>{statusMessage}</p> : null}
          
          </div>
        
        </main>
    );

}

/*Notes:

This page equates to form for the Build Spacecraft page. State must be used here to allow component
to remember data and update UI once form is submitted. useNavigate is used to change browsers
location in response to a user's actions (submit form).
Since the form requires user inputs, use the .trim() method to keep data clean and consistent.

ReactJS useNavigate() Hook:
https://www.geeksforgeeks.org/reactjs/reactjs-usenavigate-hook/

*/