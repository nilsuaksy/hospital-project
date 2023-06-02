import { useEffect, useState } from 'react';
import { Button, FormGroup, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Spinner, Table } from 'reactstrap';

export default function MR() {
    const [mr, setMr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [hospital, setHospital] = useState({
        name: '',
        address: '',
        type: ''
    });
}