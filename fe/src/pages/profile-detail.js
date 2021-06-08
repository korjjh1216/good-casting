import React from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { navigate } from 'gatsby';
import Swal from 'sweetalert2';

import PageWrapper from '../components/PageWrapper';
import ProfileSidebar from '../components/ProfileSidebar';

const CandidateProfile = ({ location }) => {
    const userInfo =
        typeof window !== `undefined`
            ? JSON.parse(localStorage.getItem('USER'))
            : null;

    return (
        <>
            <PageWrapper headerConfig={{ button: 'profile' }}>
                <div className="bg-default-2 pt-22 pt-lg-25 pb-13 pb-xxl-32">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-xxl-3 col-lg-4 col-md-5 mb-11 mb-lg-0"></div>
                            <div className="col-12 col-xxl-6 col-lg-8 col-md-7 order-2 order-xl-1">
                                <div className="row justify-content-center">
                                    <div className="col-12 dark-mode-texts">
                                        <div className="mb-9">
                                            <button
                                                style={{
                                                    background: 'transparent',
                                                    boxShadow:
                                                        '0px 0px 0px transparent',
                                                    border:
                                                        '0px solid transparent',
                                                    outline: 'none',
                                                }}
                                                onClick={() => {
                                                    navigate(-1);
                                                }}
                                                className="d-flex align-items-center ml-4"
                                            >
                                                <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                                                <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                                                    Back
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <Tab.Container
                                    id="left-tabs-example"
                                    defaultActiveKey="one"
                                >
                                    <div className="bg-white rounded-4 shadow-9">
                                        <Nav
                                            className="nav border-bottom border-mercury pl-12"
                                            role="tablist"
                                        >
                                            <li className="tab-menu-items nav-item pr-12">
                                                <Nav.Link
                                                    eventKey="one"
                                                    className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                                                >
                                                    Overview
                                                </Nav.Link>
                                            </li>
                                            <li className="tab-menu-items nav-item pr-12">
                                                {userInfo !== null ? (
                                                    userInfo[1].actorId ===
                                                    undefined ? (
                                                        <Nav.Link
                                                            eventKey="two"
                                                            className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                                                        >
                                                            Contact
                                                        </Nav.Link>
                                                    ) : (
                                                        <></>
                                                    )
                                                ) : (
                                                    <Nav.Link
                                                        className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                icon: 'error',
                                                                title:
                                                                    '로그인해주세요!',
                                                            });
                                                        }}
                                                    >
                                                        Contact
                                                    </Nav.Link>
                                                )}
                                            </li>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="one">
                                                <ProfileSidebar
                                                    id={location.state.id}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="two">
                                                <div className="pr-xl-11 p-5 pl-xs-12 pt-9 pb-11">
                                                    <form action="/">
                                                        <div className="row">
                                                            <div className="col-12 mb-7">
                                                                <label
                                                                    htmlFor="name3"
                                                                    className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                                                >
                                                                    Your Name
                                                                </label>
                                                                <input
                                                                    id="name3"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Jhon Doe"
                                                                />
                                                            </div>
                                                            <div className="col-lg-6 mb-7">
                                                                <label
                                                                    htmlFor="email3"
                                                                    className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                                                >
                                                                    E-mail
                                                                </label>
                                                                <input
                                                                    id="email3"
                                                                    type="email"
                                                                    className="form-control"
                                                                    placeholder="example@gmail.com"
                                                                />
                                                            </div>
                                                            <div className="col-lg-6 mb-7">
                                                                <label
                                                                    htmlFor="subject3"
                                                                    className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                                                >
                                                                    Subject
                                                                </label>
                                                                <input
                                                                    id="subject3"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Special contract"
                                                                />
                                                            </div>
                                                            <div className="col-lg-12 mb-7">
                                                                <label
                                                                    htmlFor="message3"
                                                                    className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                                                >
                                                                    Message
                                                                </label>
                                                                <textarea
                                                                    name="message"
                                                                    id="message3"
                                                                    placeholder="Type your message"
                                                                    className="form-control h-px-144"
                                                                ></textarea>
                                                            </div>
                                                            <div className="col-lg-12 pt-4">
                                                                <button className="btn btn-primary text-uppercase w-100 h-px-48">
                                                                    Send Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </Tab.Container>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    );
};
export default CandidateProfile;
