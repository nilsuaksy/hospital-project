import React, { useState } from 'react';
import { loginUser } from '../http/auth-client';
import { useNavigate } from 'react-router-dom';

export default function SignInCustom() {
    const [personnelNumber, setPersonnelNumber] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    function handleLogin() {
        loginUser(personnelNumber, password)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/');
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
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Giriş Ekranı</h3>
                                <form>
                                    <div className="row">
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
                                                defaultValue="Giriş Yap"
                                                onClick={handleLogin}
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