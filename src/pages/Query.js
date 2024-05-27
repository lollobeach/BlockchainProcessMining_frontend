import React, {useState, useEffect} from 'react';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    FilledInput,
    FormControl,
    IconButton,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    Slider,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {Link} from "react-router-dom";

import {_queryGetByQuery, _queryGetAllTransaction, _queryGetFields} from "../api/services";

function Query(props) {
    const [fields, setFields] = useState([]);
    const [selectedField, setSelectedField] = useState('');
    const [fieldValue, setFieldValue] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Fetch fields from the server
        _queryGetFields()
            .then(response => response.json())
            .then(data => setFields(data))
            .catch(error => console.error('Errore nel recupero dei campi:', error));
    }, []);

    const fetchAllTransactions = () => {
        fetch('/query/api/all')
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error('Errore nel recupero di tutte le transazioni:', error));
    };

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };

    const handleValueChange = (event) => {
        setFieldValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const query = {[selectedField]: fieldValue};

        fetch('/query/api/query', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(query)
        })
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error('Errore nell\'esecuzione della query:', error));
    };

    return (<div className="container mt-5">
        <h1>Query builder MongoDB</h1>
        <form onSubmit={handleSubmit} className="my-4">
            <div className="form-group">
                <label htmlFor="fieldSelect" className="form-label">Campi:</label>
                <div className="input-group mb-3">
                    <select
                        id="fieldSelect"
                        className="form-control"
                        value={selectedField}
                        onChange={handleFieldChange}
                        required
                    >
                        <option value="" disabled>Seleziona un campo</option>
                        {fields.map(field => (<option key={field} value={field}>{field}</option>))}
                    </select>
                    <input
                        type="text"
                        id="fieldValue"
                        className="form-control"
                        placeholder="Valore del campo"
                        value={fieldValue}
                        onChange={handleValueChange}
                        required
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Cerca</button>
            <button type="button" className="btn btn-secondary" onClick={fetchAllTransactions}>Tutte le
                transazioni
            </button>
        </form>

        <pre id="results" className="my-4">
        {results.length > 0 ? JSON.stringify(results, null, 2) : 'Nessun risultato trovato'}
      </pre>
    </div>);
}

export default Query;