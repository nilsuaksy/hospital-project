import { useEffect, useState } from 'react';
import { getDetails } from '../http/hospital-client';
import { Pagination, PaginationItem, PaginationLink, Spinner, Table } from 'reactstrap';

export default function AllDetails() {
    const [allDetails, setAllDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(function () {
        getDetails().then(function (res) {
            setAllDetails(res.data);
            setLoading(false);
        }).catch(function (err) {
            console.error(err);
            setLoading(false);
        });
    }, []);

    useEffect(function () {
        console.log(pageNumber);
        console.log([...allDetails].slice((pageNumber - 1) * 15, pageNumber * 5));
    }, { pageNumber });

    function changePage(page) {
        setPageNumber(page);
    }

    return (
        <>
            {loading ? (<Spinner color='success'>
                Yükleniyor
            </Spinner>) :
                <>
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink
                                previous
                                onClick={() => changePage(pageNumber === 1 ? 1 : pageNumber - 1)}
                            />
                        </PaginationItem>
                        {Array.from(Array(allDetails.length / 10).keys()).map(
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
                                onClick={() => changePage(pageNumber === allDetails.length / 30 ? allDetails.length / 30 : pageNumber + 1)}
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
                                    Hastane Adı
                                </th>
                                <th>
                                    Hastane Adresi
                                </th>
                                <th>
                                    Hastane Türü
                                </th>
                                <th>
                                    Muayene
                                </th>
                                <th>
                                    İlaç Adı
                                </th>


                            </tr>
                        </thead>
                        <tbody>
                            {allDetails.slice((pageNumber - 1) * 30, pageNumber * 30).map(function (allDetail, index) {
                                return (
                                    <tr key={`recipient- ${index * 30 + 1}`}>
                                        <th scope='row'> {(pageNumber - 1) * 30 + index + 1}</th>
                                        <td title={allDetail.name}>{allDetail.name}</td>
                                        <td title={allDetail.surname}>{allDetail.surname}</td>
                                        <td title={allDetail.birthyear}>{allDetail.birthyear}</td>
                                        <td title={allDetail.birthplace}>{allDetail.birthplace}</td>
                                        <td title={allDetail.gender}>{allDetail.gender}</td>
                                        <td title={allDetail.hospital}>{allDetail.hospital}</td>
                                        <td title={allDetail.address}>{allDetail.address}</td>
                                        <td title={allDetail.type}>{allDetail.type}</td>
                                        <td title={allDetail.description}>{allDetail.description}</td>
                                        <td title={allDetail.code}>{allDetail.code}</td>
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


