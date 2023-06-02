import React from 'react';
import HospitalImage from '../components/photos/hospital.jpg';
import PatientImage from '../components/photos/patient.jpg';
import DepartmentImage from '../components/photos/department.jpg';
import MedicineImage from '../components/photos/medicine.jpg';

import { Link } from 'react-router-dom';

const card = [{
    img: HospitalImage,
    alt: 'Hastane Resmi',
    title: 'Hastaneler',
    text: 'Hastaneler',
    url: '/hospitals',
    btnText: 'Tabloya Ulaş'
}, {
    img: PatientImage,
    alt: 'Hasta Resmi',
    title: 'Hastalar',
    text: 'Hastalar',
    url: '/patients',
    btnText: 'Tabloya Ulaş'

}, {
    img: DepartmentImage,
    alt: 'Hastane Departmanı Resmi',
    title: 'Hastane Departmanı',
    text: 'Hastane Departmanı',
    url: '/departments',
    btnText: 'Tabloya Ulaş'

}, {
    img: MedicineImage,
    alt: 'İlaç Resmi',
    title: 'İlaçlar',
    text: 'İlaçlar',
    url: '/recipients',
    btnText: 'Tabloya Ulaş'

}];

export default function CardCustom() {

    return (

        <div className='row '>
            {
                card.map(function (cardValue, cardIndex) {
                    return (
                        <div key={cardValue.title + cardIndex} className="card" style={{ width: "17rem", marginLeft: "3rem", marginTop: "6rem" }}>
                            <img src={cardValue.img} className="card-img-top" style={{ width: "100%", height: "100%" }} alt={cardValue.alt} />
                            <div className="card-body ">
                                <h5 style={{ textAlign: 'center' }} className="card-title">{cardValue.title}</h5>
                                <p style={{ textAlign: 'center' }} className="card-text">
                                    {cardValue.text}
                                </p>
                                <Link to={cardValue.url} style={{ marginLeft: "55px" }} className="btn btn-primary">
                                    {cardValue.btnText}
                                </Link>
                            </div>
                        </div>);
                })

            }
        </div>

    );

}