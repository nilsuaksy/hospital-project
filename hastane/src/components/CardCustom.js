import React from 'react';
import HospitalImage from '../components/photos/hospital.jpg';
import PatientImage from '../components/photos/patient.jpg';
import DepartmentImage from '../components/photos/department.jpg';
import MedicineImage from '../components/photos/medicine.jpg';


const card = [{
    img: HospitalImage,
    alt: 'Hastane Resmi',
    title: 'Hastaneler',
    text: 'Hastaneler',
    url: '/#',
    btnText: 'Tabloya Ulaş'
}, {
    img: PatientImage,
    alt: 'Hasta Resmi',
    title: 'Hastalar',
    text: 'Hastalar',
    url: '/#',
    btnText: 'Tabloya Ulaş'

}, {
    img: DepartmentImage,
    alt: 'Hastane Departmanı Resmi',
    title: 'Hastane Departmanı',
    text: 'Hastane Departmanı',
    url: '/#',
    btnText: 'Tabloya Ulaş'

}, {
    img: MedicineImage,
    alt: 'İlaç Resmi',
    title: 'İlaçlar',
    text: 'İlaçlar',
    url: '/#',
    btnText: 'Tabloya Ulaş'

}];

export default function CardCustom() {
    return (

        <div className='row '>
            {
                card.map(function (cardValue, cardIndex) {
                    return (
                        <div key={cardValue.title + cardIndex} className="card" style={{ width: "18rem", marginLeft: "4rem", marginTop: "6rem" }}>
                            <img src={cardValue.img} className="card-img-top" style={{ width: "100%", height: "100%" }} alt={cardValue.alt} />
                            <div className="card-body ">
                                <h5 style={{ textAlign: 'center' }} className="card-title">{cardValue.title}</h5>
                                <p style={{ textAlign: 'center' }} className="card-text">
                                    {cardValue.text}
                                </p>
                                <a href={cardValue.url} style={{ marginLeft: "55px" }} className="btn btn-primary">
                                    {cardValue.btnText}
                                </a>
                            </div>
                        </div>);
                })

            }
        </div>

    );

}