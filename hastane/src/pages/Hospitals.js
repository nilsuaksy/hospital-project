import { useEffect, useState } from 'react';
import { Spinner, Table } from 'reactstrap';
import { getHospitals } from '../http/hospital-client';

export default function Hospitals() {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        getHospitals().then(function (res) {
            setHospitals(res.data);
            setLoading(false);
        }).catch(function (err) {
            console.error(err);
            setLoading(false);
        });
    }, []);


    return (
        <>
            {loading ? (<Spinner color='success'>
                Yükleniyor
            </Spinner>) :

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
                        </tr>
                    </thead>
                    <tbody>
                        {hospitals.map(function (hospital, index) {
                            return (
                                <tr key={`hospital- ${index + 1}`}>
                                    <th scope='row'> {index + 1}</th>
                                    <td title={hospital.name}>{hospital.name}</td>
                                    <td title={hospital.address}>{hospital.address}</td>
                                    <td title={hospital.type}>{hospital.type}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            }
        </>
    );
}

