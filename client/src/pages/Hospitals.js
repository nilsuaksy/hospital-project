import { useEffect, useState } from 'react';
import { Button, FormGroup, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Pagination, PaginationItem, PaginationLink, Spinner, Table } from 'reactstrap';
import { deleteHospital, getHospitals, insertOrUpdateHospital } from '../http/hospital-client';

export default function Hospitals() {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [hospital, setHospital] = useState({
        hname: '',
        address: '',
        type: ''
    });

    useEffect(function () {
        getHospitals().then(function (res) {
            setHospitals(res.data);
            setLoading(false);
        }).catch(function (err) {
            console.error(err);
            setLoading(false);
        });
    }, []);

    function clearValues() {
        setHospital({
            hname: '',
            address: '',
            type: ''
        });
    }

    function selectHospitalToEdit(id) {
        const findSelectedHospital = hospitals.find(h => h.id === id);
        if (findSelectedHospital) {
            setHospital({
                id: id,
                hname: findSelectedHospital.hname,
                address: findSelectedHospital.address,
                type: findSelectedHospital.type
            });
            setIsOpen(true);
        }
    }

    function saveHospital() {
        insertOrUpdateHospital(hospital)
            .then(response => {
                console.log(response);
                alert(response.data);
                getHospitals().then(function (res) {
                    setHospitals(res.data);
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

    function deleteHospitalOnTable(id) {
        deleteHospital(id)
            .then(res => {
                alert('Kayıt Silindi');
            }).catch(reason => {
                console.log(reason);
                alert(reason.response.data);
            });
    }




    function changePage(page) {
        setPageNumber(page);
    }

    return (
        <>
            {loading ? (<Spinner color='success'>
                Yükleniyor
            </Spinner>) :
                <>
                    <div >
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
                        <Offcanvas isOpen={isOpen} toggle={() => { setIsOpen(!isOpen); }}  >
                            <OffcanvasHeader toggle={() => setIsOpen(!isOpen)}>
                                Yeni Hastane Ekle
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <div>
                                    <FormGroup>
                                        <Label> Hastane Adı </Label>
                                        <Input
                                            placeholder="Hastane Adı"
                                            value={hospital.hname || ''}
                                            type='textarea'
                                            onChange={
                                                (e) => setHospital({
                                                    ...hospital,
                                                    hname: e.target.value
                                                })
                                            }

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label> Hastane Adresi </Label>
                                        <Input
                                            placeholder="Hastane Adresi"
                                            value={hospital.address || ''}
                                            type='textarea'
                                            onChange={
                                                (e) => setHospital({
                                                    ...hospital,
                                                    address: e.target.value
                                                })
                                            }

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label> Hastane Türü </Label>
                                        <Input
                                            placeholder="Hastane Türü"
                                            value={hospital.type || ''}
                                            type='textarea'
                                            onChange={
                                                (e) => setHospital({
                                                    ...hospital,
                                                    type: e.target.value
                                                })
                                            }

                                        />
                                    </FormGroup>
                                    <Button color='success' style={{
                                        marginRight: 10
                                    }}
                                        onClick={saveHospital}
                                    >Kaydet</Button>
                                    <Button color='secondary' onClick={clearValues}> Temizle </Button>
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
                        {Array.from(Array(Math.ceil(hospitals.length / 10)).keys()).map( //her sayfada kaç tane görmek istediğim
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
                                onClick={() => changePage(pageNumber === Math.ceil(hospitals.length / 10) ? Math.ceil(hospitals.length / 10) : pageNumber + 1)}
                            />
                        </PaginationItem>
                    </Pagination>
                    <Table className='custom-margin-top'>
                        <thead >
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Hastane Adı
                                </th>
                                <th>
                                    Hastane Adresi
                                </th>
                                <th>
                                    Hastane Türü
                                </th>
                                <th>
                                    Aksiyonlar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {hospitals.slice((pageNumber - 1) * 10, pageNumber * 10).map(function (hospital, index) {
                                return (
                                    <tr key={`hospital- ${index + 1}`}>
                                        <th scope='row'> {(pageNumber - 1) * 10 + index + 1}</th>
                                        <td title={hospital.hname}>{hospital.hname}</td>
                                        <td title={hospital.address}>{hospital.address}</td>
                                        <td title={hospital.type}>{hospital.type}</td>
                                        <td>
                                            <Button
                                                color='primary '
                                                onClick={() => selectHospitalToEdit(hospital.id)}
                                            >
                                                Düzenle
                                            </Button>
                                            <Button
                                                style={{ marginLeft: 10 }}
                                                color="danger"
                                                onClick={() => deleteHospitalOnTable(hospital.id)}
                                            >
                                                Kaldır
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

