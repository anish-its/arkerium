import React from 'react';
import './Digital.css';
import { motion } from "framer-motion";

export default function Digital(){
    return(
        <div className='digitalbody'>
            <span className='digitalhead'>DIGITIZE TO CONNECT</span>
            <div className='digitalheadsub'>
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration: 0.5 }}>
                    <h1 className='digitalheadsubh1'>Arkerium - Your Crypto Destination!</h1>
                </motion.div>
                <span className='digitalheadsubspan'>
                    We are the safe and trusted place to build your crypto portfolio. We deliver the power to you to deal in 
                    cryptocurrencies and seize the opportunities in the crypto marketplace.
                </span>
            </div>
            <div className='digitalmain'>
                <div className='digitalmainsub'>
                    <motion.div initial={{ y: 300 }} whileInView={{ y: 0,transition: {type: "spring",bounce: 0.4,duration: 0.6}}}>
                        <h1 className='digitalmainh1'>
                            Everyone deserves access to financial services. You are invited to Arkerium!
                        </h1>
                    </motion.div>
                    <div className="digitaltimeline">
                        <div className="digitalouter">
                            <motion.div initial={{ x: -300 }} whileInView={{ x: 0,transition: {type: "spring",bounce: 0.4,duration: 0.3}}}>
                            <div className="digitalcard">
                                <div className="digitalinfo">
                                    <h3 className="digitaltitle">Utility Token</h3>
                                    <p>Currently, the main objective of Arkerium is to function as a utility token and be used to reward users.</p>
                                </div>
                            </div>
                            </motion.div>
                            <motion.div initial={{ x: -300 }} whileInView={{ x: 0,transition: {type: "spring",bounce: 0.4,duration: 0.6}}}>
                            <div className="digitalcard">
                                <div className="digitalinfo">
                                    <h3 className="digitaltitle">Enhanced Asset Security</h3>
                                    <p>Integrated security tools based on the blockchain encryption technology we assure maximum security.</p>
                                </div>
                            </div>
                            </motion.div>
                            <motion.div initial={{ x: -300 }} whileInView={{ x: 0,transition: {type: "spring",bounce: 0.4,duration: 0.6}}}>
                            <div className="digitalcard">
                                <div className="digitalinfo">
                                    <h3 className="digitaltitle">Specific Blockchain Ecosystem</h3>
                                    <p>A specific blockchain allowing token holders to receive exclusive transactional benefits on token use.</p>
                                </div>
                            </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <img className='digitalmainimg' src={process.env.PUBLIC_URL+'/logo/about.png'} alt='img_not_found'/>
            </div> 
        </div>
    )
}