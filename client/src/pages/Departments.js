import { useEffect, useState } from 'react';
import { getDepartments } from '../http/hospital-client';
import { Spinner, Table } from 'reactstrap';

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        getDepartments().then(function (res) {
            setDepartments(res.data);
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
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>

                            <th>
                                Muayene
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(function (department, index) {
                            return (
                                <tr key={`department- ${index + 1}`}>
                                    <th scope='row'> {index + 1}</th>
                                    <td title={department.description}>{department.description}</td>
                                    <td title={department.hastaid}>{department.hastaid}</td>

                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            }
        </>
    );
}


