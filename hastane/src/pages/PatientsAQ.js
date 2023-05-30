import { useEffect, useState } from 'react';
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader, Pagination, PaginationItem, PaginationLink, Spinner, Table } from 'reactstrap';
import { getPatients } from '../http/hospital-client';


export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [visible, setVisible] = useState(false);




    useEffect(function () {
        getPatients().then(function (res) {
            setPatients(res.data);
            setLoading(false);
        }).catch(function (err) {
            console.error(err);
            setLoading(false);
        });
    }, []);

    useEffect(function () {
        console.log(visible);
        console.log([...patients].slice((pageNumber - 1) * 10, pageNumber * 5));
    }, [visible]);

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
                            onClick={function noRefCheck() { setVisible(true); }}

                        >
                            Open
                        </Button>
                        <Offcanvas isOpen={visible} toggle={function noRefCheck() { setVisible(!visible); }}>
                            <OffcanvasHeader toggle={function noRefCheck() { setVisible(!visible); }}>
                                Offcanvas
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <strong>
                                    This is the Offcanvas body.
                                </strong>
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
                        {Array.from(Array(patients.length / 10).keys()).map(
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
                                onClick={() => changePage(pageNumber === patients.length / 10 ? patients.length / 10 : pageNumber + 1)}
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
                            </tr>
                        </thead>
                        <tbody>
                            {patients.slice((pageNumber - 1) * 15, pageNumber * 15).map(function (patient, index) {
                                return (
                                    <tr key={`patient- ${index + 1}`}>
                                        <th scope='row'> {(pageNumber - 1) * 15 + index + 1}</th>
                                        <td title={patient.name}>{patient.name}</td>
                                        <td title={patient.surname}>{patient.surname}</td>
                                        <td title={patient.birthyear}>{patient.birthyear}</td>
                                        <td title={patient.birthplace}>{patient.birthplace}</td>
                                        <td title={patient.gender}>{patient.gender}</td>
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