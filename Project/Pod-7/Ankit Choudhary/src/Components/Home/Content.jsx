import React from 'react';

import ChooseSHG from "../../Assets/ChooseSHG.svg";
import ChooseCryptoWallet from "../../Assets/ChooseCryptoWallet.svg";
import AnyTokens from "../../Assets/AnyTokens.svg";
import Repayment from "../../Assets/Repayment.svg";

const Content = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-[50px] w-full z-[inherit]">

            <h2 className="font-mammoth text-primaryBlack font-medium text-3xl text-center">
                How it works
            </h2>

            <div className='flex flex-col justify-center items-center px:20 md:px-50 xl:px-[100px] gap-[100px]'>

                <Step
                    number="1"
                    heading="Join an SHG"
                    description="Either create or join an existing SHG of your choice. Each member of the SHG will vote and decide an accept you."
                    image={ChooseSHG}
                    alt="Join an SHG"
                    right={false}
                />
                <Step
                    number="2"
                    heading="Deposit monthly using your wallet"
                    description="Use wallet of your choice and deposit a small amount monthly. Try to be consistent which will help build you reputation."
                    image={ChooseCryptoWallet}
                    alt="Deposit monthly using your wallet"
                    right={true}
                />
                <Step
                    number="3"
                    heading="Ask for a small loan"
                    description="You can ask for small loan without any collateral. SHG members will vote and decide to lend according to your reputation."
                    image={AnyTokens}
                    alt="Ask for a small loan"
                    right={false}
                />
                <Step
                    number="4"
                    heading="Pay back the loan with small interest"
                    description="Pay back the loan after the tenure gets complete within 5 days. The early you pay decides your reputation among the SHG members."
                    image={Repayment}
                    alt="Pay back the loan with small interest"
                    right={true}
                />

            </div>
        </div>
    )
}

export default Content

const Step = ({ number, heading, description, image, alt, right }) => {
    return (
        <div className='flex flex-col md:flex-row items-center justify-between md:gap-0 gap-10'>
            {
                right
                    ? <>
                        <img
                            data-aos="fade-right"
                            data-aos-anchor-placement="bottom-bottom"
                            data-aos-duration={1000}
                            data-aos-once={true}
                            src={image}
                            alt={alt}
                            className="hidden md:block"
                        />
                        <div className='flex flex-col justify-center items-start px-20 gap-[15px] w-full md:w-1/2 box-border'>
                            <div className='flex items-center gap-[15px] md:gap-[30px] w-full'>
                                <p className='bg-blackToTrans w-[40px] h-[40px] flex justify-center items-center border-primaryWidth border-[#6a6a6a] rounded-full text-[20px] leading-[30px]'>{number}</p>
                                <h1 className='font-semibold text-[22px] leading-[35px] md:text-[35px] md:leading-[52px]'>{heading}</h1>
                            </div>
                            <p
                                data-aos="fade-up"
                                data-aos-anchor-placement="bottom-bottom"
                                data-aos-duration={1000}
                                data-aos-delay={300}
                                data-aos-once={true}
                                className='font-medium text-[17px] leading-[26px] md:text-[20px] md:leading-[30px] text-primaryBlack/60'
                            >
                                {description}
                            </p>
                        </div>
                    </>
                    : <>
                        <div className='flex flex-col justify-center items-start px-20 gap-[15px] w-full md:w-1/2 box-border'>
                            <div className='flex items-center gap-[15px] md:gap-[30px] w-full'>
                                <p className='bg-blackToTrans w-[40px] h-[40px] flex justify-center items-center border-primaryWidth border-[#6a6a6a] rounded-full text-[20px] leading-[30px]'>{number}</p>
                                <h1 className='font-semibold text-[22px] leading-[35px] md:text-[35px] md:leading-[52px]'>{heading}</h1>
                            </div>
                            <p
                                data-aos="fade-up"
                                data-aos-anchor-placement="bottom-bottom"
                                data-aos-duration={1000}
                                data-aos-delay={300}
                                data-aos-once={true}
                                className='font-medium text-[17px] leading-[26px] md:text-[20px] md:leading-[30px] text-primaryBlack/60'
                            >
                                {description}
                            </p>
                        </div>
                        <img
                            data-aos="fade-left"
                            data-aos-anchor-placement="bottom-bottom"
                            data-aos-duration={1000}
                            data-aos-once={true}
                            src={image}
                            alt={alt}
                            className="hidden md:block"
                        />
                    </>
            }
        </div>
    )
}