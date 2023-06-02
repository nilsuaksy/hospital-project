import { useEffect, useState } from 'react';
import { Button, FormGroup, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Pagination, PaginationItem, PaginationLink, Spinner, Table } from 'reactstrap';
import { getHospitals, getPatients, insertOrUpdatePatient } from '../http/hospital-client';


export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [patient, setPatient] = useState({
        pname: '',
        surname: '',
        birtyear: '',
        birthplace: '',
        gender: '',
    });

    const [hospitals, setHospitals] = useState([]);

    useEffect(function () {
        getHospitals().then(res => {
            setHospitals(res.data);
        });
        getPatients().then(function (res) {
            setPatients(res.data);
            setLoading(false);
        }).catch(function (err) {
            console.error(err);
            setLoading(false);
        });
    }, []);

    function clearValues() {
        setPatient({
            pname: '',
            surname: '',
            birthyear: '',
            birthplace: '',
            gender: ''
        });
    }

    function selectPatientToEdit(id) {
        const findSelectedPatient = patients.find(p => p.id === id);
        if (findSelectedPatient) {
            setPatient({
                id: id,
                name: findSelectedPatient.pname,
                surname: findSelectedPatient.surname,
                birthyear: findSelectedPatient.birthyear,
                birthplace: findSelectedPatient.birthplace,
                gender: findSelectedPatient.gender
            });
            setIsOpen(true);
        }
    }

    function savePatient() {
        insertOrUpdatePatient(patient)
            .then(response => {
                console.log(response);
                alert(response.data);
                getPatients().then(function (res) {
                    setPatients(res.data);
                    setLoading(false);
                }).catch(function (err) {
                    console.error(err);
                    setLoading(false);
                });
            }).catch(reason => {
                console.log(reason);
                alert(reason.response.data);
            });
    }

    useEffect(function () {
        console.log(pageNumber);
        console.log([...patients].slice((pageNumber - 1) * 10, pageNumber * 5));
    }, [pageNumber]);

    function changePage(page) {
        setPageNumber(page);
    }

    return (
        <>
            {loading ? (<Spinner color='success'>
                Yükleniyor
            </Spinner>) :
                <>
                    <div>
                        <Button
                            color="primary"
                            style={{ marginTop: '3rem' }}
                            onClick={() => {
                                clearValues();
                                setIsOpen(true);
                            }}

                        >
                            Yeni Ekle
                        </Button>
                        <Offcanvas isOpen={isOpen} toggle={() => { setIsOpen(!isOpen); }}>
                            <OffcanvasHeader toggle={() => setIsOpen(!isOpen)}>
                                Yeni Hasta Ekle
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <div>
                                    <FormGroup>
                                        <Label> Hasta Adı</Label>
                                        <Input
                                            placeholder="Hasta Adı"
                                            type='textarea'
                                            value={patient.pname || ''}
                                            onChange={
                                                (e) => setPatient({
                                                    ...patient,
                                                    pname: e.target.value
                                                })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label> Hasta Soyadı</Label>
                                        <Input
                                            placeholder="Hasta Soyadı"
                                            type='textarea'
                                            value={patient.surname || ''}
                                            onChange={
                                                (e) => setPatient({
                                                    ...patient,
                                                    surname: e.target.value
                                                })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label> Doğum Tarihi</Label>
                                        <Input
                                            placeholder="Doğum Tarihi"
                                            type='textarea'
                                            value={patient.birthyear || ''}
                                            onChange={
                                                (e) => setPatient({
                                                    ...patient,
                                                    birthyear: e.target.value
                                                })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label> Doğum Yeri</Label>
                                        <Input
                                            placeholder="Doğum Yeri"
                                            type='textarea'
                                            value={patient.birthplace || ''}
                                            onChange={
                                                (e) => setPatient({
                                                    ...patient,
                                                    birthplace: e.target.value
                                                })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label> Cinsiyeti</Label>
                                        <Input
                                            placeholder="Cinsiyeti"
                                            type='textarea'
                                            value={patient.gender || ''}
                                            onChange={
                                                (e) => setPatient({
                                                    ...patient,
                                                    gender: e.target.value
                                                })
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type='select'>
                                            <option selected disabled >Hastane Seçiniz</option>

                                            {hospitals.map(h => {
                                                return <option key={h.id} value={h.id}>{h.hname}</option>;
                                            })}
                                        </Input>
                                    </FormGroup>
                                    <Button
                                        color='success'
                                        style={{
                                            marginRight: 10
                                        }}
                                        onClick={savePatient}
                                    >
                                        Kaydet
                                    </Button>
                                    <Button color='secondary' onClick={clearValues}> Temizle</Button>
                                </div>
                            </OffcanvasBody>
                        </Offcanvas>
                    </div>



                    <Pagination>
                        <PaginationItem>
                            <PaginationLink
                                previous
                                onClick={() => changePage(pageNumber === 1 ? 1 : pageNumber - 1)}
                            />
                        </PaginationItem>
                        {Array.from(Array(Math.ceil(patients.length / 15)).keys()).map( //her sayfada kaç tane görmek istediğim
                            function (page, index) {
                                return (
                                    <PaginationItem key={`page-${index}`}>

                                        <PaginationLink
                                            onClick={() => changePage(page + 1)}
                                        >
                                            {page + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            }
                        )}

                        <PaginationItem>
                            <PaginationLink
                                next
                                onClick={() => changePage(pageNumber === Math.ceil(patients.length / 15) ? Math.ceil(patients.length / 15) : pageNumber + 1)}
                            />
                        </PaginationItem>
                    </Pagination>
                    <Table className='custom-margin-top'>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Hasta Adı
                                </th>
                                <th>
                                    Hasta Soyadı
                                </th>
                                <th>
                                    Doğum Tarihi
                                </th>
                                <th>
                                    Doğum Yeri
                                </th>
                                <th>
                                    Cinsiyeti
                                </th>
                                <th>
                                    Hastane İsmi
                                </th>
                                <th>
                                    Aksiyonlar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.slice((pageNumber - 1) * 15, pageNumber * 15).map(function (patient, index) {
                                return (
                                    <tr key={`patient- ${index + 1}`}>
                                        <th scope='row'> {(pageNumber - 1) * 15 + index + 1}</th>
                                        <td title={patient.pname}>{patient.pname}</td>
                                        <td title={patient.surname}>{patient.surname}</td>
                                        <td title={patient.birthyear}>{patient.birthyear}</td>
                                        <td title={patient.birthplace}>{patient.birthplace}</td>
                                        <td title={patient.gender}>{patient.gender}</td>
                                        <td title={patient.hname}>{patient.hname}</td>
                                        <td>
                                            <Button
                                                color='primary'
                                                onClick={() => selectPatientToEdit(patient.id)}
                                            >
                                                Düzenle
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </>
            }
        </>
    );
}