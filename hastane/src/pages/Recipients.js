import { useEffect, useState } from 'react';
import { getRecipients } from '../http/hospital-client';
import { Spinner, Table } from 'reactstrap';

export default function Departments() {
    const [recipients, setRecipients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        getRecipients().then(function (res) {
            setRecipients(res.data);
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
                                İlaç Adı
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {recipients.map(function (recipient, index) {
                            return (
                                <tr key={`recipient- ${index + 1}`}>
                                    <th scope='row'> {index + 1}</th>
                                    <td title={recipient.code}>{recipient.code}</td>
                                    <td title={recipient.muayeneid}>{recipient.muayeneid}</td>

                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            }
        </>
    );
}


