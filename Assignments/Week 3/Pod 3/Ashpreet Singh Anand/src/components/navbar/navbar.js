import { Button, Dropdown, Link, Navbar, Switch, Text, useTheme } from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../../utils/wallet";



export const Nav = () => {

   
    const [account, setAccount] = useState("");

    useEffect(() => {
        (async () => {
            const activeAccount = await getAccount();
            setAccount(activeAccount);
        })();
    }, []);

    const onConnectWallet = async () => {
        await connectWallet();
        const activeAccount = await getAccount();
        setAccount(activeAccount);
        window.location.reload(false);
    };


    return (
        <Navbar>
                <h1>
                    Anime Vote
                </h1>
                <Button style={{backgroundColor:"orange"}} auto
                onPress={onConnectWallet}
                >
                 {account !== "" ? account : "Connect Wallet"}   
                </Button>
        </Navbar>
    );
};