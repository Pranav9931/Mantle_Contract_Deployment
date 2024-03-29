import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Loader, PolygonScan } from '../assets';
import { MilestoneCard, TransactionGraph, Transactions } from '../components';
import Dashboardcard from '../components/dashboardcard.component';
import { useStateContext } from '../context';

const MilestonePage = () => {
    const [
        navTitle,
        setNavTitle,
        address,
        contract,
        connect,
        getTransactions,
        getEmployees,
        payrollEmployee,
        payEmployee,
        getMilestones
    ] = useStateContext();

    const navigate = useNavigate();

    let addr = !address ? "0x000...000" : `${address.slice(0, 3)}...${address.slice(-5,)}`;


    setNavTitle(() => "Milestones");

    const handleClick = () => {
        window.location.href = "https://explorer.testnet.mantle.xyz/address/0xE10488fcd9994E1002f38Ffb1E5cE1392473B77c";
    }

    useEffect(() => {
        document.title = "Milestones | ETHForAll";
    }, [])
    const [milestones, setMilestones] = React.useState([] as any);
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        const fetchMilestone = async () => {
            setIsLoading(true);
            const data = await getMilestones();
            setMilestones(() => data);
            setIsLoading(false);
        }
        fetchMilestone();
    }, [address, contract])

    return (
        <div className="dashboard-container flex gap-10" style={{ padding: '0 20px' }}>
            <div className="main-dashboard-items" style={{ flex: 1 }}>

                <span className="page-title">Active Milestones</span>
                <div className="employee-wrapper">
                    {milestones.length < 1
                        ?
                        <center>
                            <div className="loader-container" style={{ marginTop: '-20px', width: '42.5vw', minHeight: '400px' }}>
                                <img src={Loader} />
                            </div>
                        </center>
                        :
                        milestones.map((milestone: any, idx = 0) => {
                            return (
                                <MilestoneCard obj={milestone} />
                            )
                        })
                    }
                </div>


                <div className="flex jst-spc-btw al-cnt mr-tp-20">
                    <span className="page-title">Recent Milestone Payments</span>
                    <span style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }} onClick={() => handleClick()}>
                        <img src={PolygonScan} className="arrow-icon" alt="polygonscan_logo" /></span>
                </div>
                <div className="transactions-details">
                    <Transactions filterType="Milestone Payment" />
                </div>
                <center>
                    <span className="load-more-btn">Load More</span>
                </center>
            </div>
        </div>
    )
}

export default MilestonePage