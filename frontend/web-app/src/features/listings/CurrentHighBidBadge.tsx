'use client'

import {clsx} from "cn";
import {usdFormatter} from "@/lib/utils";
import {useSignalR} from "@/contexts/SignalRContext";
import {useEffect, useState} from "react";
import {Bid} from "@/lib/types";

type Props = {
    amount?: number;
    reservePrice: number;
    auctionId: string;
}

function CurrentHighBidBadge({amount, reservePrice, auctionId}: Props) {
    const connection = useSignalR();
    const [currentAmount,setCurrentAmount] = useState(amount);
    
    
    useEffect(() => {
        if(!connection) return;

        const handleBidPlaced = (bid: Bid) => {
            if (bid.auctionId !== auctionId) return;
            if (!bid.bidStatus.includes('Accepted')) return;
            setCurrentAmount(bid.amount)
        }

        connection.on('BidPlaced', handleBidPlaced)
        return () => {
            connection.off('BidPlaced', handleBidPlaced)
        }
    })
    const text = currentAmount ? `${usdFormatter.format(currentAmount)}` : 'No Bids';

    return (
        <div className={clsx('border-2 border-white text-white py-1 px-2 rounded-lg', {
            'bg-green-600': currentAmount && currentAmount >= reservePrice,
            'bg-amber-600': currentAmount && currentAmount < reservePrice,
            'bg-red-600': !currentAmount
        })}>{text}</div>
    );
}

export default CurrentHighBidBadge;