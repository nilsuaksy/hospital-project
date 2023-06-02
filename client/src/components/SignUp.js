import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../http/auth-client';

export default function SignUpCustom() {

    const [identityNumber, setIdentityNumber] = useState("");
    const [personnelNumber, setPersonnelNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");

    const navigate = useNavigate();
    function handleRegister() {
        registerUser({ identityNumber, personnelNumber, firstName, lastName, email, password, birthYear, phoneNumber, gender })
            .then(res => {
                alert("Kullanıcı kaydedildi.");
            }).catch(reason => {
                console.log(reason);
            });
    }
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
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Üyelik Formu</h3>
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="identityNumber">
                                                    TC Kimlik Numarası
                                                </label>
                                                <input
                                                    type="text"
                                                    id="identityNumber"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setIdentityNumber(e.target.value)}
                                                    value={identityNumber || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="personnelNumber">
                                                    Personel Numarası
                                                </label>
                                                <input
                                                    type="text"
                                                    id="personnelNumber"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setPersonnelNumber(e.target.value)}
                                                    value={personnelNumber || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="firstName">
                                                    Ad
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    value={firstName || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="lastName">
                                                    Soyad
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    value={lastName || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="emailAddress">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="emailAddress"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="password">
                                                    Şifre
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 d-flex align-items-center">
                                            <div className="form-outline datepicker w-100">
                                                <label htmlFor="birthdayDate" className="form-label">
                                                    Doğum Tarihi
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="birthdayDate"
                                                    onChange={(e) => setBirthYear(e.target.value)}
                                                    value={birthYear || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="phoneNumber">
                                                    Telefon Numarası
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phoneNumber"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    value={phoneNumber || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <label className="form-label select-label">
                                                İş pozisyonunuzu seçiniz
                                            </label>
                                            <select className="select form-control">
                                                <option value={1} selected disabled>
                                                    Seçiniz
                                                </option>
                                                <option value={2}>Kayıt Personeli</option>
                                                <option value={3}>Hastane Personeli</option>
                                                <option value={4}>Üst Düzey Personel</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-6" style={{ marginLeft: 55 }}>
                                            <h6 style={{ marginTop: 3 }} className="mb-1 pb-3">
                                                Cinsiyet
                                            </h6>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="femaleGender"
                                                    onChange={(e) => setGender(e.target.value)}
                                                    value={gender || ''}
                                                    defaultValue="option1"
                                                    defaultChecked=""
                                                />
                                                <label className="form-check-label" htmlFor="femaleGender">
                                                    Kadın
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="maleGender"
                                                    defaultValue="option2"
                                                />
                                                <label className="form-check-label" htmlFor="maleGender">
                                                    Erkek
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ paddingLeft: "20%" }} className="mt-4 pt-2">
                                            <input
                                                className="btn btn-secondary btn-lg"
                                                type="button"
                                                defaultValue="İptal Et"
                                            />
                                        </div>
                                        <div style={{ paddingLeft: "30%" }} className="mt-4 pt-2">
                                            <input
                                                className="btn btn-primary btn-lg"
                                                type="button"
                                                defaultValue="Üye Ol"
                                                onClick={handleRegister}

                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>);

}