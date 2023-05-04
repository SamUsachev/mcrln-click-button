import React from 'react';

import Alert from '@mui/material/Alert';

interface IAlert {
    alertText: string;
    variant: string;
    severity: string
    children: React.ReactNode;
}

export const Error: React.FC<IAlert> = ({ alertText }) => <Alert variant="outlined" severity="error">{alertText}</Alert>