import React, { useState } from 'react';

export default function AdminCustom() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div
                            className="card shadow-2-strong card-registration"
                            style={{ borderRadius: 20 }}
                        >
                            <div className="card-body p-4 p-md-5">
                                <h2 className="mb-4 pb-2 pb-md-0 mb-md-5">
                                    Hastane Kayıt Sistemi Admin Paneli
                                </h2>
                                <h5>
                                    Hastane kayıtlarına ulaşmak için lütfen admin girişi yapmanız
                                    gerekmektedir.
                                </h5>
                                <br />
                                <br />
                                <h6>
                                    Hastane kayıtlarına ulaşmak için lütfen{" "}
                                    <a href="/signin"> admin girişinizi</a> yapınız.
                                </h6>
                                <h6>
                                    Admin üyeliğiniz yoksa lütfen personel numaranızla{" "}
                                    <a href="/signup">kayıt formunu</a> doldurunuz.
                                </h6>
                                <br />
                                <br />
                                <p style={{ color: "grey", textShadow: "5cm" }}>
                                    *Personel numaranızı bilmiyorsanız lütfen hastaneniz yönetimiyle
                                    iletişime geçiniz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}